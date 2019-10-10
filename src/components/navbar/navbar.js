import React, { useState, useEffect } from 'react'
import styles from './navbar.module.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import * as firebase from 'firebase/app'
import 'firebase/auth'

const Navbar = (props) => {
  const [user, setUser] = useState({})
  const [isLog, setIsLog] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        setIsLog(true)
        props.history.push('/home')
      }
    })
  }, [props.history])


  const logOut = () => {
    firebase.auth().signOut().then(() => {
      alert('has cerrado sesion!')
      setIsLog(false)
      props.history.push('/')
      handleMenuClose()
    }).catch((error) => {
      alert(error.message)
    });
  }

  const gotoProfile = () => {
    props.history.push('/profile/'+ user.uid, { params: user.uid })
    handleMenuClose()
  }

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const gotoHome= () => {
    props.history.push('/home')
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={1}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem 
        onClick={gotoProfile}
      >
        <AccountCircleIcon className={styles.iconmenu} />
          Profile
      </MenuItem>
      <MenuItem 
        onClick={logOut}
      >
        <ExitToAppIcon className={styles.iconmenu}  />
        Log Out
      </MenuItem>
    </Menu>
  );
 
  return(
    <div className={styles.root}>
      {
        isLog ? 
        <AppBar position="fixed" color='secondary'>
        <Toolbar>
          <Typography variant="h5" className={styles.title} onClick={gotoHome}>
            Social Net
          </Typography>
          <Typography variant="h6" className={styles.name}>
            {user.displayName}
          </Typography>
          <Avatar 
            alt={user.displayName}
            src={user.photoURL}
            className={styles.avatar} 
          />
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <MenuIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
        :
        <AppBar position="fixed" color='secondary'>
        <Toolbar>
          <Typography variant="h5" className={styles.title}>
            Social Net
          </Typography>
          <Button color="inherit">
            Register
          </Button>
          <Button color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      }  
      {renderMenu}
    </div>
  )
}

export default Navbar