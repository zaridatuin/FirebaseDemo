import {useState, useContext, useRef} from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, confirmPasswordReset, updateProfile } from 'firebase/auth'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom'

// styles
import styles from './Signup.module.css'

export default function Signup() {
  const {user, setUser} = useContext(UserContext);

  const email = useRef()
  const password = useRef()
  const displayName = useRef()
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) =>  {
    e.preventDefault()  
    setIsPending(true)
    try{
      const authentication = getAuth();
      const res = await createUserWithEmailAndPassword(authentication, email.current.value, password.current.value);
      setUser(displayName.current.value)
      console.log(res.user.displayName)
      if(res.user){
          navigate('/')
      }
      setIsPending(false)
      console.log(res.user.email);
      await updateProfile(authentication.currentUser, { displayName: displayName.current.value })
      console.log(displayName.current.value)
    }catch(err){
      setIsPending(false)
      setError(err.message)
    }    
  }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input 
          type="email"
          ref={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password"
          ref={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input 
          type="text"
          ref={displayName}
        />
      </label>
      { !isPending && <button className="btn">sign up</button> }
      { isPending && <button className="btn" disabled>loading</button> }
      { error && <p>{error}</p> }
    </form>
  )
}
