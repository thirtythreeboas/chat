import styles from './ChatList.module.scss'
import { Contact } from '../Contact/Contact'
import { AddContact } from '../AddContact'
import { useSelector } from 'react-redux'

export const ChatList = () => {
  const chat = useSelector(state => state.chat)
  
  return (
    <div className={styles.chatlist}>
      <AddContact />
      {
        chat.chats !== 0 && (
          chat.chats.map(e => (
            <Contact key={e} number={e}/>
          ))
        )
      }
      <div className={styles.hint}>
        Enter a Russian number and then click on it. <br /> <strong>It should contain 11 digits and start with 7:</strong> 71112223344 <br />
        {!chat.isNumberValid && <span className={styles.invalidNumber}>The number you entered is not valid</span>}
      </div>
    </div>
  )
}
