import React from 'react'
import styles from './home.module.css'
import Wall from '../../components/wall'
import * as firebase from 'firebase/app'
import 'firebase/auth'


const Home = () => {


  return (
    <div className={styles.loginContainer}>
      <Wall/>
    </div>
  )
}

export default Home