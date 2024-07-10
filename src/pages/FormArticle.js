import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {collection, addDoc, doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../firebase/config'
// styles
import './create.css'

export default function Create() {
  const titleRef = useRef()
  const authorRef = useRef()
  const descriptionRef = useRef()
  
  const navigate = useNavigate()
  
  const { urlId } = useParams();

  useEffect(() => {
    if(urlId){
      const ref = doc(db, 'articles', urlId);    
      
      getDoc(ref).then((snapshot)=>{
        const article = snapshot.data();
        if(article){
          titleRef.current.value = article.title;
          descriptionRef.current.value = article.description;
          authorRef.current.value = article.author;
        }else{
          navigate('/')
        }
        
      })     
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const article = {title: titleRef.current.value, author: authorRef.current.value, description: descriptionRef.current.value};

    if(urlId){ 
       const ref = doc(db, 'articles', urlId);     
       await updateDoc(ref, article)  
    }else{      
      const ref = collection(db, 'articles')
      await addDoc(ref,article)
    }

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
            ref={titleRef}
            required
          />
        </label>
        
        <label>
          <span>Author:</span>
          <input 
            type="text"
            ref={authorRef}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea
            ref={descriptionRef}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  )
}