import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Blog.css";


export const Blog = () => {
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };

  const addPost = () => {
    const newPosts = [...posts, { id: posts.length, text: newPost }];
    setPosts(newPosts);
    setNewPost('');
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = (postId) => {
    const newComments = { ...comments };
    if (!newComments[postId]) {
      newComments[postId] = [];
    }
    newComments[postId].push(newComment);
    setComments(newComments);
    setNewComment('');
  };

  return (
    <div className="container contenedorBlog">
      <div className="contenedorTituloBlog">
        <div className="form-group TituloBlog">BLOG</div>
      </div>
      <div className="contenedorFormularioBlog">
        <textarea
          value={newPost}
          onChange={handlePostChange}
          placeholder="Escribe tu mensaje aquí..."
          className="form-control textareaBlog"
        ></textarea>
        <div className="botonPublicarBlog">
          <button onClick={addPost} className="btn btn-FormBlog">Publicar</button>
        </div>
      </div>
      {posts.map((post) => (
        <div key={post.id} className="postBlog">
          <p>{post.text}</p>
          <div className="contenedorFormularioBlog">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Escribe un comentario..."
              className="form-control textareaBlog"
            ></textarea>
            <div className="botonPublicarBlog">
              <button onClick={() => addComment(post.id)} className="btn btn-FormBlog">Comentar</button>
            </div>
          </div>
          {comments[post.id] && comments[post.id].map((comment, index) => (
            <p key={index} className="comment">{comment}</p>
          ))}
        </div>
      ))}
    </div>
  );
};


