import React, {useState,useEffect} from 'react'
import styles from './wall.module.css'
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import { Progress } from 'antd'
import SnackBar from '../utils/snackbar'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'



const Wall = (props) => {

  const [uploadValue, setUploadValue] = useState(0)
  const [picture, setPicture] = useState('')
  const [user, setUser] = useState({})
  const [description, setDescription] = useState('')
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      }
    })
  }, [])

  const handleChange = (e) => {
    setDescription(e.target.value)
  }


  const onUpload = (e) => {
    const file = e.target.files[0]
    const storageRef= firebase.storage().ref('/fotos/'+file.name)
    const task = storageRef.put(file)
    
    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setUploadValue(percentage)
    }, error => {
      console.log(error)
    }, () => {
      task.snapshot.ref.getDownloadURL().then(downloadURL => {
        setUploadValue(100)
        setPicture(downloadURL)
      })
    })
  }

  const shareState = () => {
    const day = new Date().toLocaleDateString()
    const hs = new Date().toLocaleTimeString()
    if(description !== '' || picture !== ''){
      var newPostKey = firebase.database().ref('users/'+user.uid+'/posts/').push().key
      firebase.database().ref('users/'+user.uid+'/posts/'+newPostKey).set({
        picture: picture || '',
        description: description || '',
        date: day+ ' ' + hs,
        iFeel:'',
        iLike:'',
        id: newPostKey,
        likes: 0,
      })
      setMessage('Shared Post')
      handleClick()
    }
    else {
      setMessage("Can't Shared Post")
      handleClick()
    }
    if(uploadValue === 100 || description !== ''){
      setDescription('')
      setUploadValue(0)
      setPicture('')
    }
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  }


  return (
    <div className={styles.wallContainer}>
    <Avatar
      alt={user.photoURL} 
      src={user.photoURL} 
      className={styles.avatar}
    />
    {
      uploadValue < 1 ?
    <TextField
      variant="outlined"
      type="file"
      rows="4"
      fullWidth
      onChange={onUpload}
      helperText="Upload Image"
    >
    </TextField>
    :
    uploadValue === 100 ?
      <Card
        className={styles.card}
      >
        <img
          src={picture}
          alt="upload"
          width="320"
        />
      </Card>
      :
      <Progress
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        percent={uploadValue}
        status="active"
        successPercent={100}
        showInfo={ false }
      />

    }
    
    <TextField
      id="filled-multiline-flexible"
      label={"Tell Me About Yourself "+ user.displayName}
      rows="6"
      fullWidth
      multiline
      rowsMax="10"
      onChange={handleChange}
      className={styles.textField}
      margin="normal"
      variant="outlined"
      value={description}
    />

      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="secondary"
        onClick={shareState}
      >
        Share
      </Button>
      <SnackBar 
        open={open}
        handleClose={handleClose}
        message={message}
      />
  </div>
  )
}

export default Wall