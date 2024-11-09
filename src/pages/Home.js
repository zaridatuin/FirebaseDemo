import { Link } from 'react-router-dom'
import { getDocs, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config'
import { useEffect, useState } from 'react';
import DeleteIcon from '../assets/delete.svg'

// styles
import './Home.css'

export default function Home() {
  const [articles, setArticles] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedAuthor, setUpdatedAuthor] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    const ref = collection(db, 'articles');
    onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setArticles(results);
    })
  }, [])

  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id)
    await deleteDoc(ref);
  }

  const handleUpdate = async (id) => {
    const ref = doc(db, 'articles', id)
    await updateDoc(ref, {
      title: updatedTitle,
      author: updatedAuthor,
      description: updatedDescription
    });
    setEditingArticle(null);
  }

  return (
    <div className="home">
      <h2>Articles</h2>
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <p>{article.description}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
          <img
            className="icon"
            onClick={() => handleDelete(article.id)}
            src={DeleteIcon} alt="delete icon"
          />
          <button className="update-button" onClick={() => {
            setEditingArticle(article.id);
            setUpdatedTitle(article.title);
            setUpdatedAuthor(article.author);
            setUpdatedDescription(article.description);
          }}>Update</button>
          {editingArticle === article.id && (
            <form className="update-form" onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(article.id);
            }}>
              <input
                type="text"
                placeholder="Title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Author"
                value={updatedAuthor}
                onChange={(e) => setUpdatedAuthor(e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          )}
        </div>
      ))}
    </div>
  )
}