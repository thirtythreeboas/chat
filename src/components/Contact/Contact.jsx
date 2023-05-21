import styles from './Contact.module.scss'
import profilePhoto from '../../assets/img/photo.svg'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setActiveDialog } from '../../store/chat'
import { fixedNumber } from '../../utils/refactorPhoneNumber'

export const Contact = (props) => {
  const { number } = props
  const chat = useSelector(state => state.chat)
  const dispatch = useDispatch()
  const phoneNumber = fixedNumber(props.number)

  return (
    <div 
      className={`${styles.contact} ${chat.isActiveDialog === number ? styles.active : ''}`} 
      onClick={() => dispatch(setActiveDialog(number))}
    >
      <img className={styles.photo} src={profilePhoto} alt='Photo' />
      <span className={styles.name}>{phoneNumber}</span>
    </div>
  )
}
