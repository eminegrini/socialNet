import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import styles from './snackbar.module.css'

const SnackBar = (props) => {
  
  return(
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={props.open}
      autoHideDuration={4000}
      onClose={props.handleClose}
    >
      <SnackbarContent
        className={styles.snackContent}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={props.message === 'Shared Post' ? styles.message : styles.error}>
            {props.message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={props.handleClose}>
            <CloseIcon className={styles.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}

export default SnackBar
