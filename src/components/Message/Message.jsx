import styles from './Message.module.scss'

export const Message = (props) => {
  const { text, sender } = props
  return (
    <div className={`${styles.container} ${sender === 'friend' ? styles.friend : ''}`}>
      <span className={styles.text}>{ text }</span>
    </div>
  )
}
