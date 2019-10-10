import React, { useEffect, useState } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import styles from './profile.module.css'
import map from 'lodash/map'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import inclundes from 'lodash/includes'

const Profile = (props) => {

  const [post, setPost] = useState({})
  const [user, setUser] = useState({})
  const [isLikeable, setIsLikeable] = useState(null)
  const [keyPost, setKeyPost] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        firebase.database().ref('users/' + user.uid + '/posts/').on('value', (snapshot) => {
          setPost(snapshot.val())
          map(snapshot.val(), post => {
            if(post.userLike) {
              map(post.userLike, userLike =>{
                if(userLike.userLike !== user.displayName){
                  setIsLikeable(true)
                }
              })
            }
          })
        })
      }
    })
  }, [])

  const likePost = (e) => {
    map(post, post => {
      if (post.id === e.currentTarget.id ) {
        setIsLikeable(false)
        let like = post.likes
          like=post.likes + 1
        firebase.database().ref('users/' + user.uid+'/posts/'+post.id).update({
          likes: like,
        })
        var newPostKey = firebase.database().ref('users/'+user.uid+'/posts/'+post.id+'/userLike').push().key
        setKeyPost(newPostKey)
        firebase.database().ref('users/' + user.uid+'/posts/'+post.id+'/userLike/'+newPostKey).set({
          userLike: user.displayName,
        })
      }
    })
  }

  const dislikePost = (e) => {
    map(post, post => {
      if (post.id === e.currentTarget.id ) {
        setIsLikeable(true)
        let dislike = post.likes
          dislike= post.likes - 1
        firebase.database().ref('users/' + user.uid+'/posts/'+post.id).update({
          likes: dislike,
        })
        firebase.database().ref('users/' + user.uid+'/posts/'+post.id+'/userLike/'+keyPost).set({
          userLike: null,
        })
      }
    })
  }


  return (
    <div className={styles.cardContainer}>
      {
        map(post, post => (
          <Card className={styles.card} key={post.id} >
            <CardHeader
              key={post.id}
              avatar={
                <Avatar 
                  aria-label="recipe" 
                  className={styles.avatar}
                  alt="User Profile" 
                  src={user.photoURL} 
                />
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={user.name}
              subheader={post.date}
            />
            <CardMedia
              className={styles.media}
              image={post.picture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_UE5gown5KNIg10tZWIX0Y_Y1gsWtvu95mxFWpOwLigekC5j8'}
              title={post.picture}
            />
            <CardContent className={styles.desc}>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
             {
               isLikeable === true || isLikeable === null ?
               <IconButton aria-label="add to favorites" onClick={likePost} id={post.id} >
                <Badge className={styles.badge} badgeContent={post.likes} color="secondary">
                  <FavoriteIcon  />
                </Badge>
              </IconButton> 
              :
              <IconButton aria-label="add to favorites" onClick={dislikePost} id={post.id} >
                <Badge className={styles.badge} badgeContent={post.likes} color="secondary">
                  <FavoriteIcon  color="secondary" />
                </Badge>
              </IconButton> 
             }
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
          )
        ).reverse()
      }
    </div>
  )
}

export  default Profile