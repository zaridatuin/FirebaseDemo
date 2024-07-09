import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {collection, addDoc, doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../firebase/config'
// styles
import './create.css'

export default function Create() {  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  
  const navigate = useNavigate()
  
  const { urlId } = useParams();

  useEffect(() => {
    if(urlId){
      const ref = doc(db, 'articles', urlId);    
      
      getDoc(ref).then((snapshot)=>{
        const article = snapshot.data();
        if(article){
          setTitle(article.title);
          setDescription(article.description);
          setAuthor(article.author);
        }else{
          navigate('/')
        }
        
      })     
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault()  
    const article = {title,author,description};

    if(urlId){ 
       const ref = doc(db, 'articles', urlId);     
       await updateDoc(ref, article)  
    }else{      
      const ref = collection(db, 'articles')
      await addDoc(ref,article)
    } 
    

    // setTitle("");
    // setAuthor("");
    // setDescription("");

    navigate('/')
  } 


  return (
    <div className="create">
      <h2 className="page-title">  Add a New Article </h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        
        <label>
          <span>Author:</span>
          <input 
            type="text" 
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  )
}