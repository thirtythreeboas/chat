import { ChatList } from '../ChatList'
import { Dialog } from '../Dialog'
import styles from './Chat.module.scss'

export const Chat = () => {
  return (
    <div className={styles.chat}>
      <ChatList />
      <Dialog />
    </div>
  )
}
