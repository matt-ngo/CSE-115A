import React, {useState} from 'react';
// import {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {Alert} from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
// import SharedContext from './SharedContext';

import ImageUploading from 'react-images-uploading';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    textAlign: 'center',
  },
  alert: {
    'width': '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h1">SPLITR</Typography>
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
                      Number of selected files exceeds the limit of {maxNumber}
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
                  alert(
                      'Manual Input - This feature is not currently supported.',
                  );
                }}
              >
                Manual Input
              </Button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </Container>
    </div>
  );
}

export default Home;
