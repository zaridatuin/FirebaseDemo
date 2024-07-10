import {useState, useContext, useRef} from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom'

// styles
import styles from './Signup.module.css'

export default function Signup() {
  //const {setUser} = useContext(UserContext);

  const emailRef = useRef()
  const passwordRef = useRef()
  const displayNameRef = useRef()
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) =>  {
    e.preventDefault()  
    setIsPending(true)
    try{
      const authentication = getAuth();
      const res = await createUserWithEmailAndPassword(authentication, emailRef.current.value, passwordRef.current.value);
      if(res.user){
          navigate('/')
      }
      await updateProfile(authentication.currentUser, { displayName: displayNameRef.current.value })
      setIsPending(false)
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
          ref={emailRef}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password"
          ref={passwordRef}
        />
      </label>
      <label>
        <span>display name:</span>
        <input 
          type="text"
          ref={displayNameRef}
        />
      </label>
      { !isPending && <button className="btn">sign up</button> }
      { isPending && <button className="btn" disabled>loading</button> }
      { error && <p>{error}</p> }
    </form>
  )
}
