import styles from './AddContact.module.scss'
import { useDispatch } from 'react-redux'
import { createNewChat } from '../../store/chat'
import { useRef } from 'react'

export const AddContact = () => {
  const dispatch = useDispatch()
  const number = useRef(null)

  const addNumber = () => {
    dispatch(createNewChat(number.current.value))
    number.current.value = ''
  }
  
  return (
    <div className={styles.container}>
      <input 
        className={styles.number} 
        type='text' 
        ref={number} 
        placeholder="New Chat"
      />
      <button 
        className={styles.addContact} 
        onClick={() => addNumber()}
      >
        &#10004;
      </button>
    </div>
  )
}
