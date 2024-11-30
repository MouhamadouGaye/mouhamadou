// import React from "react";
// import "./MediaPost.css";
// // import { bachir, hawa } from "../../../data";
// import Post from "../comments/Post";

// const MediaPost = ({ content, media, author, date, post_id, user }) => {
//   return (
//     <div className="post-template">
//       <div className="top-profile-details">
//         <img className="profile-photo" src={user.profile_hoto} alt="Profile" />
//         <h3 className="profile-name">{user.name}</h3>
//         <h4 className="profile-pseudo">@{user.pseudo}</h4>
//         <p className="post-date">{date}</p>
//       </div>
//       <Post content={content} media={media} post_id={post_id} user={user} />
//     </div>
//   );
// };
// export default MediaPost;

// import React from "react";
// import "./MediaPost.css";
// import Post from "../comments/Post";
// import { toast } from "react-toastify";
// import axios from "axios";

// const MediaPost = ({ content, media, author, date, post_id, user }) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     alert("You must be logged in to create a post.");
//     return;
//   }

//   const deletePost = async (postId, authenticated) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:3006/posts/${postId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass the token for authentication
//           },
//         }
//       );

//       if (response.status === 200) {
//         toast.success(response.data.message); // Show success message
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         toast.error(error.response.data.error); // Handle not found or not authorized
//       } else {
//         toast.error("An error occurred while deleting the post.");
//       }
//       console.error("Error deleting post:", error);
//     }
//   };

//   // console.log("Voici l'ID " + post_id, author);
//   return (
//     <div className="post-template">
//       <div className="top-profile-details">
//         {/* Display author's profile details */}
//         <img
//           className="profile-photo"
//           src={
//             author.profile_photo ||
//             "http://localhost:3006/uploads/1732403161387_api.png"
//           } // Use author's profile photo or fallback
//           alt={`${author.name}'s profile`}
//         />
//         {/* <h3 className="profile-name">{author.name || "Anonymous"}</h3> */}
//         <h4 className="profile-pseudo">@{author.pseudo || "Unknown"}</h4>

//         <div className="post-date">
//           {" "}
//           <span
//             onClick={() => {
//               const confirmation = window.confirm(
//                 "Are you sure you want to delete this comment?"
//               );
//               if (confirmation) deletePost(post_id);
//             }}
//           >
//             ●●●
//           </span>{" "}
//           {date || "Unknown Date"}
//         </div>
//       </div>
//       {/* Render post content and media */}
//       <Post
//         content={content}
//         media={media}
//         post_id={post_id}
//         user={user}
//         author={author}
//       />
//     </div>
//   );
// };

// export default MediaPost;

import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./MediaPost.css";
import Post from "../comments/Post";

const MediaPost = ({
  content,
  media,
  author,
  date,
  post_id,
  user,
  onDelete,
}) => {
  // Ensure media is an array
  const token = localStorage.getItem("token");

  const deletePost = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3006/posts/${post_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message); // Show success message
        onDelete(post_id); // Notify parent to update the posts list
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.error("You are not authorized to delete this post.");
        } else if (error.response.status === 404) {
          toast.error("Post not found.");
        } else {
          toast.error("An error occurred while deleting the post.");
        }
      } else {
        console.error("Error deleting post:", error);
        toast.error("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="post-template">
      <div className="top-profile-details">
        <img
          className="profile-photo"
          src={
            author.profile_photo ||
            "http://localhost:3006/uploads/default_profile.png"
          }
          alt={`${author.name}'s profile`}
        />
        <h4 className="profile-pseudo">@{author.pseudo || "Unknown"}</h4>

        <div className="post-date">
          <span
            onClick={() => {
              const confirmation = window.confirm(
                "Are you sure you want to delete this post?"
              );
              if (confirmation) deletePost();
            }}
          >
            ●●●
          </span>

          {date || "Unknown Date"}
        </div>
      </div>

      <Post
        content={content}
        media={media}
        post_id={post_id}
        user={user}
        author={author}
      />
    </div>
  );
};

export default MediaPost;
