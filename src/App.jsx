import { Form } from './components/Form'
import { Chat } from './components/Chat'
import styles from './App.module.scss'
import { useSelector } from 'react-redux'

const App = () => {
  const chat = useSelector(state => state.chat)
  
  return (
    <main className={styles.main}>
      {/* <Chat /> */}
      {chat.isLoggedIn ? <Chat /> : <Form />}
    </main>
  )
}

export default App