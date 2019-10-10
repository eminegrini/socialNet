import React from 'react'
import styles from './login.module.css'
import Button from '@material-ui/core/Button'
import PersonPinIcon from '@material-ui/icons/PersonPin';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


const Login = () => {

  const handleAuth= () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        firebase.database().ref('users/'+ result.user.uid).child('profile').set({
          id: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          picture: result.user.photoURL
        })
      })
      .catch(error =>console.log(`${error.message} inicio sesion!`) )
  }

  return (
    <div className={styles.loginContainer}>
      <Button 
        variant="contained" 
        color="secondary" 
        className={styles.button}
        onClick={handleAuth}
      >
        <PersonPinIcon /> Log in with Google
      </Button>
    </div>
  )
}

export default Login