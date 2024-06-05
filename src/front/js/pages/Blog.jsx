import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Blog.css";

export const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
  
    const handlePostChange = (e) => {
      setNewPost(e.target.value);
    };
  
    const handleCommentChange = (e) => {
      setNewComment(e.target.value);
    };
  
    const addPost = () => {
      if (newPost.trim() !== '') {
        setPosts([...posts, { id: posts.length, text: newPost }]);
        setNewPost('');
      }
    };
  
    const addComment = (postId) => {
      if (newComment.trim() !== '') {
        setComments({
          ...comments,
          [postId]: [...(comments[postId] || []), newComment]
        });
        setNewComment('');
      }
    };
  
    return (
      <div>
        <h2>Blog</h2>
        <div>
          <textarea
            value={newPost}
            onChange={handlePostChange}
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
          <button onClick={addPost}>Publicar</button>
        </div>
        {posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <p>{post.text}</p>
            <div>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Escribe un comentario..."
              ></textarea>
              <button onClick={() => addComment(post.id)}>Comentar</button>
            </div>
            {comments[post.id] && comments[post.id].map((comment, index) => (
              <p key={index} style={{ marginLeft: '20px' }}>{comment}</p>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
