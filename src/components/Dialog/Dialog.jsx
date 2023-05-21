import { useRef, useEffect } from 'react'
import styles from './Dialog.module.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Message } from '../Message'
import { sendMessageThunk, getMessageThunk } from '../../store/thunks'
import { getActiveDialog } from '../../utils/getActiveDialog'

export const Dialog = () => {
  const chat = useSelector(state => state.chat)
  const dispatch = useDispatch()
  const messageValue = useRef(null)

  // checks if there are any incoming messages
  useEffect(() => {
    let getMessages
    if (chat.isLoggedIn) {
      getMessages = setInterval(() => {
        dispatch(getMessageThunk(chat.authData))
      }, 5000)
    }
    return () => clearInterval(getMessages)
  }, [])

  const sendOnKeyDown = (e) => {
    if (e.key === 'Enter') sendOnClick()
  }

  const sendOnClick = () => {
      if (messageValue.current.value === '') return
      dispatch(sendMessageThunk({
        idInstance: chat.authData.idInstance,
        apiTokenInstance: chat.authData.apiTokenInstance,
        chatId: chat.isActiveDialog,
        message: messageValue.current.value
      }))
      messageValue.current.value = ''
  }

  return (
    <div className={styles.dialog}>
      {
        // if there are no chats it shows nothing
        chat.isActiveDialog !== '' &&
        <>
          <div className={styles.chat}>
            {
              chat.isActiveDialog !== '' && chat.messages.length !== 0 &&
              [...getActiveDialog(chat.messages, chat.isActiveDialog).chatHistory].reverse().map((e, i) => (
                <Message key={i} text={e.text} sender={e.sender} />
              ))
            }
          </div>

          <div className={styles.messageField}>
            <button 
              className={styles.sendBtn}
              onClick={() => sendOnClick()}
            >Send</button>
            <input
              className={styles.message} 
              type="text" 
              ref={messageValue}
              onKeyDown={(e) => sendOnKeyDown(e)}
            />
          </div>
        </>
      }
    </div>
  )
}
