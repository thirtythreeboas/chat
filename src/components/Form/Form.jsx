import { useRef } from 'react'
import styles from './Form.module.scss'
import { useDispatch } from 'react-redux'
import { getAuthInput } from '../../store/chat'
import { authUserThunk } from '../../store/thunks'

export const Form = () => {
  const dispatch = useDispatch()
  const instance = useRef(null)
  const token = useRef(null)

  const getUserAuthInput = (e) => {
    e.preventDefault()
    const data = {
      idInstance: instance.current.value,
      apiTokenInstance: token.current.value
    }
    dispatch(getAuthInput(data))
    dispatch(authUserThunk(data))
  }

  return (
    <form className={styles.form}>
      <h2 className={styles.header}>
        Enter your<br /> <span className={styles.userData}>idInstance</span> and <span className={styles.userData}>apiTokenInstance</span><br /> to sign in
      </h2>
      <div className={styles.inputField}>
        <label htmlFor='instance'>Your idInstance</label>
        <input 
          className={styles.input}
          type='text'
          id='instance'
          ref={instance}
        />
      </div>
      <div className={styles.inputField}>
        <label htmlFor='token'>Your apiTokenInstance</label>
        <input 
          className={styles.input} 
          type='text' 
          id='token'
          ref={token}
        />
      </div>
      <button 
        className={styles.signIn} 
        onClick={e => getUserAuthInput(e)}
      >
        Sign In
      </button>
    </form>
  )
}
