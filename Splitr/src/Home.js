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
import LinearProgress from '@material-ui/core/LinearProgress';
import SharedContext from './SharedContext';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import {DEFAULT_FEES, DEFAULT_ITEM} from './DefaultValues';
import useStyles from './styles/HomeStyles';

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

/**
 *
 * @return {object} JSX
 */
function Home() {
  const classes = useStyles();

  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const acceptType = ['jpg', 'gif', 'png'];
  const maxFileSize = 3 * 1000000;

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const [loading, setLoading] = useState(false);
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
              onImageUpdate,
              onImageRemove,
              isDragging,
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
                        {maxFileSize / 1000000} MB
                      </Alert>
                    )}
                  </div>
                )}
                <div className={classes.buttonContainer}>
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
                        onClick={() => {
                          setLoading(true);

                          const blob = dataURLtoBlob(image.data_url);
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
                                  'https://api.cloudmersive.com' +
                                '/ocr/photo/recognize/receipt',
                                  formData,
                                  config,
                              )
                              .then((response) => {
                                console.log('Success!');
                                console.log(response);
                                const receiptItems = [];
                                response.data.ReceiptItems.forEach((item) => {
                                  receiptItems.push({
                                    ...DEFAULT_ITEM,
                                    name: item.ItemDescription,
                                    price:
                                    item.ItemPrice !== null ?
                                      item.ItemPrice.toString() :
                                      '0',
                                  });
                                });
                                setReceiptItems(receiptItems);
                                setFees(DEFAULT_FEES);
                                history.push('/confirm');
                              })
                              .catch((error) => {
                                console.log('Error!');
                                console.log(error);
                              });
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
