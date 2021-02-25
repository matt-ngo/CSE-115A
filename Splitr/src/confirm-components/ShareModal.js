import React, {useContext, useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {Button, Dialog} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import SharedContext from '../SharedContext';
import useStyles from '../styles/ConfirmStyles';
import axios from 'axios';

const getTinyURL = async (url, setShareLink) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_TINY_URL_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  // Only useful for development purposes
  // (bit.ly rejects requests otherwise)
  url = url.replace('localhost', '127.0.0.1');

  const request = `https://api-ssl.bitly.com/v4/shorten`;
  const data = await axios
      .post(request, {long_url: url}, config)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          return;
        }
        console.log('Succesfully retrieved bit.ly link');
        return response.data;
      })
      .catch((err) => {
        return console.log(err);
      });

  if (data) {
    setShareLink(data.link);
  }
};

const getShareLink = () => {
  const baseURL = /^.*confirm/.exec(window.location.href);
  let newLink = baseURL + '/?';
  const {receiptItems, fees} = useContext(SharedContext);

  // Add all items to the link
  for (let i = 0; i < receiptItems.length; i++) {
    const newItem = `${i > 0 ? '&' : ''}item${i}=${encodeURIComponent(
        receiptItems[i].name,
    )}`;
    const newPrice = `&price${i}=${encodeURIComponent(receiptItems[i].price)}`;
    const newShared = `&shared${i}=${encodeURIComponent(
        receiptItems[i].shared,
    )}`;

    newLink += newItem + newPrice + newShared;
  }

  // Add fees to the link
  newLink += `&tax=${encodeURIComponent(fees.tax)}&tip=${encodeURIComponent(
      fees.tip,
  )}&tip_type=${encodeURIComponent(
      fees.tipType,
  )}&misc_fees=${encodeURIComponent(fees.misc)}`;

  return newLink;
};

// Copies the link to the clipboard
const copyLink = () => {
  const link = document.getElementById('linkText');
  link.select();
  link.setSelectionRange(0, 99999);
  document.execCommand('copy');
};

const ShareModal = ({setIsShareModalOpen}) => {
  const classes = useStyles();
  const [shareLink, setShareLink] = useState(getShareLink());

  useEffect(() => {
    getTinyURL(shareLink, setShareLink);
  }, []);

  const Body = () => {
    const classes = useStyles();

    return (
      <div className={classes.modalBody}>
        <div>
          <input
            className={classes.shareLink}
            type="text"
            id="linkText"
            value={shareLink}
            readOnly
          />
        </div>
        <div>
          <Button
            className={classes.copyShareLinkButton}
            variant="contained"
            color="primary"
            onClick={copyLink}
          >{`Copy link`}</Button>
        </div>
      </div>
    );
  };

  return (
    <Paper className={classes.paper}>
      <Dialog open={true} onClose={() => setIsShareModalOpen(false)}>
        {<Body />}
      </Dialog>
    </Paper>
  );
};
ShareModal.propTypes = {setIsShareModalOpen: propTypes.func};

export default ShareModal;
