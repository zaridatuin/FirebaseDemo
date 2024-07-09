import { useState,useContext } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, confirmPasswordReset, updateProfile } from 'firebase/auth'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom'

// styles
import styles from './Signup.module.css'

export default function Signup() {
  const {user, setUser} = useContext(UserContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) =>  {
    e.preventDefault()  
    setIsPending(true)
    try{
      const authentication = getAuth();      
      const res = await createUserWithEmailAndPassword(authentication, email, password);
      setUser(displayName)
      console.log(res.user.displayName)
      if(res.user){
          navigate('/')
      }
      setIsPending(false)
      console.log(res.user.email);
      await updateProfile(authentication.currentUser, { displayName })
      console.log(displayName)
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
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </label>
      <label>
        <span>display name:</span>
        <input 
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      { !isPending && <button className="btn">sign up</button> }
      { isPending && <button className="btn" disabled>loading</button> }
      { error && <p>{error}</p> }
    </form>
  )
}
