import { useState,useContext,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, confirmPasswordReset } from 'firebase/auth'
import { UserContext } from '../../context/UserContext';

// styles
import styles from './Login.module.css'

export default function Login() {
  const {setUser} = useContext(UserContext);

  const email = useRef()
  const password = useRef()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) =>  {
    e.preventDefault()  
    setIsPending(true)
    try{
      const authentication = getAuth();
      const res = await signInWithEmailAndPassword(authentication, email.current.value, password.current.value);
      setUser(res.user.displayName)
      console.log("display name: ")
      console.log(res.user)
      if(res.user){
          navigate('/')
      }
      setIsPending(false)
      console.log(res.user.email);
    }catch(err){
      setIsPending(false)
      setError(err.message)
    }    
  }

  return (              
      <form onSubmit={handleSubmit} className={styles['login-form']}>
        <h2>login</h2>
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
        { !isPending && <button className="btn">Login</button> }
        { isPending && <button className="btn" disabled>loading</button> }
        { error && <p>{error}</p> }      
      </form>
  )
}
