import Image from 'next/image'
import styles from './page.module.css'
import Player from './structures/molecule/player'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Player
          url='https://cdn.jwplayer.com/manifests/8Hw3FD28.m3u8'
          autoplay={false}
        />
      </div>
    </main>
  )
}
