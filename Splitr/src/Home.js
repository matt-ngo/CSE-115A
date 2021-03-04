import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import {Alert} from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';
import SharedContext from './SharedContext';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import {DEFAULT_FEES, DEFAULT_ITEM} from './DefaultValues';
import useStyles from './styles/HomeStyles';
import heic2any from 'heic2any';

/**
 * Converts dataURL to Blob
 * @param {String} dataurl
 * @return {Blob}
 */
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}

const isValidItem = (itemName) => {
  const str = itemName.toLowerCase().replace(/[т]/g, (c) => 't');
  if (
    str.includes('total') ||
    str.includes('tax') ||
    str.includes('gratuity')
  ) {
    return false;
  }
  return true;
};

const makeAPICall = (setLoading, image, setReceiptItems, setFees, history) => {
  setLoading(true);

  const blob =
    image.blob === undefined ? dataURLtoBlob(image.data_url) : image.blob;
  const formData = new FormData();
  formData.append('imageFile', blob);
  const config = {
    headers: {
      'apiKey': process.env.REACT_APP_API_KEY,
      'content-type': 'multipart/form-data',
    },
  };
  axios
      .post(
          'https://api-na-us1-premium.cloudmersive.com' +
        '/ocr/photo/recognize/receipt',
          formData,
          config,
      )
      .then((response) => {
        console.log('Success!');
        console.log(response);
        const receiptItems = [];
        response.data.ReceiptItems.forEach((item) => {
          if (isValidItem(item.ItemDescription)) {
            receiptItems.push({
              ...DEFAULT_ITEM,
              name: item.ItemDescription,
              price: item.ItemPrice !== null ? item.ItemPrice.toString() : '0',
            });
          }
        });
        setReceiptItems(receiptItems);
        setFees(DEFAULT_FEES);
        history.push('/confirm');
      })
      .catch((error) => {
        console.log('Error!');
        console.log(error);
      });
};

/**
 *
 * @return {object} JSX
 */
function Home() {
  const classes = useStyles();

  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const acceptType = ['gif', 'heic', 'png', 'jpg', 'jpeg'];
  const maxFileSize = 1000000000;

  const [uploading, setUploading] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (imageList, addUpdateIndex) => {
    // Prevents trigger on delete
    if (imageList.length == 1) {
      setUploading(true);
      if (imageList[0].file.type == 'image/heic') {
        heic2any({
          blob: dataURLtoBlob(imageList[0].data_url),
          toType: 'image/jpeg',
        }).then((conversionResult) => {
          imageList[0].data_url = URL.createObjectURL(conversionResult);
          imageList[0].blob = conversionResult;
          setImages(imageList);
          setUploading(false);
          setDeleteVisible(true);
        });
      } else {
        setImages(imageList);
        setUploading(false);
        setDeleteVisible(true);
      }
    } else {
      // Triggers on delete
      setImages(imageList);
    }
  };

  const {setReceiptItems, setFees, setIsEditing} = useContext(SharedContext);
  const history = useHistory();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container className={classes.brandHeader} maxWidth="md">
        <h1>SPLITR</h1>
      </Container>
      <Paper className={classes.paper}>
        <Container maxWidth="md">
          <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={acceptType}
            maxFileSize={maxFileSize}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              dragProps,
              errors,
            }) => (
              <div className="upload__image-wrapper">
                {errors && (
                  <div>
                    {errors.maxNumber && (
                      <Alert severity="error">
                        Number of selected files exceeds the limit of{' '}
                        {maxNumber}
                      </Alert>
                    )}
                    {errors.acceptType && (
                      <Alert severity="error">
                        Selected file type is not supported. Supported:{' '}
                        {acceptType.join(', ')}
                      </Alert>
                    )}
                    {errors.maxFileSize && (
                      <Alert severity="error">
                        Selected file size exceeds the limit of{' '}
                        {maxFileSize / 1000000000} GB
                      </Alert>
                    )}
                  </div>
                )}
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<BorderColorOutlinedIcon />}
                    onClick={() => {
                      setReceiptItems([]);
                      setFees(DEFAULT_FEES);
                      setIsEditing(true);
                      history.push('/confirm');
                    }}
                  >
                    Manual Input
                  </Button>
                  {!deleteVisible && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<CameraAltOutlinedIcon />}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Upload Receipt
                    </Button>
                  )}
                  {deleteVisible && (
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteOutlinedIcon />}
                      onClick={() => {
                        onImageRemoveAll();
                        setDeleteVisible(false);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                  {uploading && <LinearProgress />}
                </div>
                {imageList.map((image, index) => (
                  <div key={index} className="imageitem">
                    <img
                      src={image.data_url}
                      alt="Receipt"
                      style={{
                        maxWidth: '100%',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    />
                    <div className={classes.buttonContainer}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<ArrowForwardOutlinedIcon />}
                        onClick={() => {
                          makeAPICall(
                              setLoading,
                              image,
                              setReceiptItems,
                              setFees,
                              history,
                          );
                        }}
                        disabled={loading}
                      >
                        Process
                      </Button>
                      {loading && <LinearProgress />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </Container>
      </Paper>
    </div>
  );
}

export default Home;
