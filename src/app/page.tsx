"use client"

import styles from './page.module.css'
import Components from './components'

export default () => {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Components.Player
          url='https://cdn.jwplayer.com/manifests/8Hw3FD28.m3u8'
          autoplay={false}
          title={'Tears of Steel'}
        />
      </div>
    </main>
  )
}
