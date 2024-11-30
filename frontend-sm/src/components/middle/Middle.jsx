// for continuing with a real database I will use this
// party which will allow me to go with my server
import React, { useEffect, useState } from "react";
import MediaPost from "./media/MediaPost";

const MiddleSide = ({ user }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:5000/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <div className="middle">
      {/* Add more post-templates as needed */}
      {posts.map((post, index) => (
        <MediaPost
          key={index}
          content={post.content}
          media={post.media}
          author={{
            name: "John Doe",
            pseudo: "johndoe",
            profilePhoto: "/path/to/photo.jpg",
          }}
          date={new Date(post.created_at).toLocaleDateString()}
          user={user}
        />
      ))}
    </div>
  );
};

export default MiddleSide;

// import React, { useState, useEffect } from "react";
// import Post from "./comments/Post";

// const MiddleSide = ({ content, media, author, date }) => {
//   const [posts, setPosts] = useState();
//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await fetch("http://localhost:5000/posts");
//       const data = await response.json();
//       setPosts(data);
//     };

//     fetchPosts();
//   }, []);
//   return (
//     <div className="post-template">
//       <div className="top-profile-details">
//         <img
//           className="profile-photo"
//           src={author.profilePhoto}
//           alt="Profile"
//         />
//         <h3 className="profile-name">{author.name}</h3>
//         <h4 className="profile-pseudo">@{author.pseudo}</h4>
//         <p className="post-date">{date}</p>

//         <div className="post-infos">
//           <p className="user-paragraph">{content}</p>
//           {media.map((file, index) =>
//             file.type.startsWith("image") ? (
//               <img
//                 key={index}
//                 className="posted-images"
//                 src={file.url}
//                 alt="Post"
//               />
//             ) : (
//               <video
//                 key={index}
//                 className="posted-videos"
//                 src={file.url}
//                 controls
//               />
//             )
//           )}
//         </div>
//       </div>
//       <Post />
//     </div>
//   );
// };

// export default MiddleSide;
