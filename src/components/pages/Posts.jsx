import React, { useState, useEffect } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentingPostId, setCommentingPostId] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios
      .get("https://nt-devconnector.onrender.com/api/posts", {
        headers: { "x-auth-token": token },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Xatolik yuz berdi:", err));
  }, []);

  const likePost = (postId) => {
    let token = localStorage.getItem("token");

    axios
      .put(`https://nt-devconnector.onrender.com/api/posts/like/${postId}`, {}, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        setPosts(posts.map(post => post._id === postId ? { ...post, likes: res.data } : post));
      });
  };

  const unlikePost = (postId) => {
    let token = localStorage.getItem("token");

    axios
      .put(`https://nt-devconnector.onrender.com/api/posts/unlike/${postId}`, {}, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        setPosts(posts.map(post => post._id === postId ? { ...post, likes: res.data } : post));
      });
  };

  const deletePost = (postId) => {
    let token = localStorage.getItem("token");

    axios
      .delete(`https://nt-devconnector.onrender.com/api/posts/${postId}`, {
        headers: { "x-auth-token": token },
      })
      .then(() => {
        setPosts(posts.filter(post => post._id !== postId));
      });
  };

  const addComment = (postId) => {
    let token = localStorage.getItem("token");

    axios
      .post(
        `https://nt-devconnector.onrender.com/api/posts/comment/${postId}`,
        { text: commentText },
        { headers: { "x-auth-token": token } }
      )
      .then((res) => {
        setPosts(posts.map(post => post._id === postId ? { ...post, comments: res.data } : post));
        setCommentText("");
        setCommentingPostId(null);
      });
  };

  return (
    <div>
      <h1 className="text-[45px] font-[700] text-[#17a2b8] ml-[460px]">Posts</h1>
      <p className="font-[400] leading-[38px] text-[24px] ml-[460px]"><i className="fa-solid fa-circle-user mr-[10px]"></i>Welcome to the community</p>

      {posts.map((post) => (
        <div key={post._id} className="flex justify-center mt-[10px]">
          <div className="p-6 border rounded-[5px] mt-[10px] bg-[#fff] m-2 ml-[30px] w-[1000px]">
            <div className="flex items-center gap-[30px]">
              <img className="rounded-full w-[50px] h-[50px]" src={post.avatar} alt="" />
              <div>
                <h2 className="font-[700] text-[25px]">{post.name}</h2>
                <p className="font-[400] text-[14px]">{post.text}</p>
                <p className="font-[600]">{new Date(post.date).toLocaleDateString()}</p>

                <button className="bg-white-500 px-3 py-1 text-white rounded-[4px] mr-2" onClick={() => likePost(post._id)}>
                  👍 <span className="text-gray-500">{post.likes.length}</span>
                </button>
                <button className="bg-white-500 px-3 py-1 text-white rounded-[4px]" onClick={() => unlikePost(post._id)}>
                  👎 <span className="text-gray-500">{post.unlikes ? post.unlikes.length : 0}</span>
                </button>

                {localStorage.getItem("userId") === post.user && (
                  <button className="bg-gray-500 px-3 py-1 text-white rounded-[4px] ml-4" onClick={() => deletePost(post._id)}>
                    🗑 Delete
                  </button>
                )}

                <button
                  className="bg-blue-500 px-3 py-1 text-white rounded-[4px] ml-4"
                  onClick={() => setCommentingPostId(post._id)}
                >
                  💬 Discussion
                </button>

                {commentingPostId === post._id && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Komment yozing..."
                      className="border p-2 w-full rounded-[4px]"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button className="bg-blue-500 px-3 py-1 text-white rounded-[4px] mt-2" onClick={() => addComment(post._id)}>
                      Yuborish
                    </button>
                  </div>
                )}

                {post.comments && post.comments.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-[600] text-[18px]">Kommentlar:</h4>
                    {post.comments.map((comment) => (
                      <p key={comment._id} className="border-l-4 border-blue-500 pl-2 mt-2">
                        <strong>{comment.name}:</strong> {comment.text}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
