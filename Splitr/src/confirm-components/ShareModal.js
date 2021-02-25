import React, {useContext} from 'react';
import propTypes from 'prop-types';
import {Button, Dialog} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import SharedContext from '../SharedContext';
import useStyles from '../styles/ConfirmStyles';

const getShareLink = () => {
  const baseURL = /^.*confirm/.exec(window.location.href);
  let newLink = baseURL + '/?';
  const {receiptItems} = useContext(SharedContext);

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

  return newLink;
};

const copyLink = () => {
  const link = document.getElementById('linkText');
  link.select();
  link.setSelectionRange(0, 99999);
  document.execCommand('copy');
};

const ShareModal = ({setIsShareModalOpen}) => {
  const classes = useStyles();
  const shareLink = getShareLink();

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
