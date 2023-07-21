import styles from './page.module.css'
import Player from './component/molecule/player/index'

export default () => {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Player
          url='https://cdn.jwplayer.com/manifests/8Hw3FD28.m3u8'
          autoplay={false}
          title={'Tears of Steel'}
        />
      </div>
    </main>
  )
}
