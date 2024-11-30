// const handleSubmit = async (event) => {
//   event.preventDefault();

//   const formData = new FormData();
//   formData.append("content", postContent);
//   postMedia.forEach((file, index) => {
//     formData.append("media", file); // Keep this as "media" to match the server-side multer array name
//   });

//   try {
//     const response = await fetch("http://localhost:3006/posts", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       console.log("Post submitted successfully");
//       closeModal();
//     } else {
//       console.error("Failed to submit post");
//     }
//   } catch (error) {
//     console.error("Error submitting post:", error);
//   }
// };

// //// THE CODE IS THE OLD CODE OF MY MODALPOST

////// START Post Page handleIconClicl FOR DEBUGGING
// import React, { useState, useEffect } from "react";
// import { BsSend } from "react-icons/bs";
// import { PostIcons } from "../../../data";
// import "./Post.css";
// import axios from "axios";
// import { toast } from "react-toastify";

// function Post({ content, media, post_id, user }) {
//   const [comments, setComments] = useState([]);
//   const [shown, setShown] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [likeCount, setLikeCount] = useState(0);
//   const [dislikeCount, setDislikeCount] = useState(0);
//   const [shareCount, setShareCount] = useState(0);
//   const [thumbUp, setThumbUp] = useState(0);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [userActions, setUserActions] = useState({
//     like: false,
//     dislike: false,
//   });

//   // Fetch initial post interaction counts
//   useEffect(() => {
//     const fetchPostInteractions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3006/posts/${post_id}`
//         );
//         const post = response.data;

//         // Assuming the response contains the interaction counts
//         setLikeCount(post.likes || 0);
//         setDislikeCount(post.dislikes || 0);
//         setShareCount(post.shares || 0);
//         setThumbUp(post.thumb_ups || 0);
//       } catch (error) {
//         console.error("Error fetching post interactions:", error);
//       }
//     };

//     fetchPostInteractions();
//   }, [post_id]);

//   // Fetch comments when shown is toggled to true
//   useEffect(() => {
//     if (shown) {
//       const fetchComments = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:3006/posts/${post_id}/comments`
//           );
//           setComments(response.data);
//         } catch (error) {
//           console.error("Error fetching comments:", error);
//         }
//       };

//       fetchComments();
//     }
//   }, [shown, post_id]);

//   const handleCommentChange = (event) => {
//     setNewComment(event.target.value);
//   };

//   const handleCommentSubmit = async () => {
//     if (newComment.trim()) {
//       try {
//         const response = await axios.post(
//           `http://localhost:3006/posts/${post_id}/comments`,
//           { text: newComment, user_id: user.user_id }
//         );

//         const newCommentData = response.data;
//         setComments([...comments, newCommentData]);
//         setNewComment("");
//         toast.success("Comment added successfully!");
//       } catch (error) {
//         console.error("Error submitting comment:", error);
//         toast.error("Failed to submit comment. Please try again.");
//       }
//     } else {
//       toast.warn("Comment cannot be empty!");
//     }
//   };

//   const handleIconClick = async (iconName) => {
//     if (isProcessing) return; // Prevent duplicate clicks

//     setIsProcessing(true); // Disable interactions temporarily
//     try {
//       const response = await axios.put(
//         `http://localhost:3006/posts/${post_id}/${iconName}`,
//         { user_id: user.user_id }
//       );

//       const updatedPost = response.data;

//       // Update state based on response
//       switch (iconName) {
//         case "like":
//           setLikeCount(updatedPost.likes);
//           break;
//         case "dislike":
//           setDislikeCount(updatedPost.dislikes);
//           break;
//         case "thumbUp":
//           setThumbUp(updatedPost.thumb_ups);
//           break;
//         case "share":
//           setShareCount(updatedPost.shares);
//           break;
//         case "comments":
//           setShown(!shown); // Toggle comments section visibility
//           break;
//         default:
//           console.error("Unknown iconName:", iconName);
//       }
//       toast.success(
//         `${
//           iconName.charAt(0).toUpperCase() + iconName.slice(1)
//         } updated successfully!`
//       );
//     } catch (error) {
//       setUserActions((prev) => ({ ...prev, [iconName]: false })); // Revert on failure
//       toast.error(
//         `An error occurred: ${error.response?.data?.error || "Unknown error"}`
//       );
//     } finally {
//       setIsProcessing(false); // Re-enable interactions
//     }
//   };

//   const totalCount = likeCount + thumbUp;

//   return (
//     <div className="post-infos">
//       <p className="user-paragraph">{content}</p>
//       <div className="post-media">
//         {media.map((file, index) =>
//           file.type.startsWith("image") || file.type.startsWith("video") ? (
//             <img
//               key={index}
//               className="posted-images"
//               src={file.url}
//               alt="Post"
//             />
//           ) : (
//             <video
//               key={index}
//               className="posted-videos"
//               src={file.url}
//               controls
//             />
//           )
//         )}
//       </div>
//       <div className="post-icons">
//         <h5 className="likes">
//           {totalCount > 0 && (
//             <span>
//               {totalCount}
//               {PostIcons.map((icon, index) => (
//                 <span
//                   key={index}
//                   style={{
//                     fontSize: "16px",
//                     color: "pink",
//                   }}
//                 >
//                   {likeCount && icon.name === "like" ? icon.element : ""}
//                   {thumbUp && icon.name === "thumbUp" ? icon.element : ""}
//                 </span>
//               ))}
//             </span>
//           )}
//         </h5>
//         <br />
//         {PostIcons.map((icon, index) => (
//           <div
//             key={index}
//             className="icon"
//             onClick={() => handleIconClick(icon.name)}
//           >
//             {icon.element}
//             {icon.name === "like" && likeCount > 0 && (
//               <span className="icon-count"> {likeCount}</span>
//             )}
//             {icon.name === "dislike" && dislikeCount > 0 && (
//               <span className="icon-count"> {dislikeCount}</span>
//             )}
//             {icon.name === "comments" && comments.length > 0 && shown && (
//               <span className="icon-count"> {comments.length}</span>
//             )}
//             {icon.name === "share" && shareCount > 0 && (
//               <span className="icon-count"> {shareCount}</span>
//             )}
//             {icon.name === "thumbUp" && thumbUp > 0 && (
//               <span className="icon-count"> {thumbUp}</span>
//             )}
//           </div>
//         ))}
//       </div>

//       {shown && (
//         <div className="comments-section">
//           <div className="comments-list">
//             {comments.map((comment, index) => (
//               <div className="comment" key={index}>
//                 <p className="comment-text">{comment.text}</p>
//                 <p className="comment-author">-- {comment.author}</p>
//               </div>
//             ))}
//           </div>
//           <div className="comment-input">
//             <input
//               type="text"
//               placeholder="Write a comment..."
//               className="input-field"
//               value={newComment}
//               onChange={handleCommentChange}
//             />
//             <button className="submit-button" onClick={handleCommentSubmit}>
//               <BsSend style={{ backgroundColor: "transparent" }} /> Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Post;

// const handleIconClick = async (iconName) => {
//   try {
//     if (!user) {
//       alert("You must be logged in to interact with the post.");
//       return;
//     }

//     const response = await axios.put(
//       `http://localhost:3006/posts/${post_id}/${iconName}`,
//       { user_id: user.user_id }
//     );

//     const updatedPost = response.data;

//     // Update state based on the API response
//     switch (iconName) {
//       case "like":
//         setLikeCount(updatedPost.likes);
//         break;
//       case "dislike":
//         setDislikeCount(updatedPost.dislikes);
//         break;
//       case "thumbUp":
//         setThumbUp(updatedPost.thumb_ups);
//         break;
//       case "share":
//         setShareCount(updatedPost.shares);
//         break;
//       case "comments":
//         setShown(!shown);
//         break;
//       default:
//         console.error("Unknown iconName:", iconName);
//     }
//   } catch (error) {
//     console.error(`Error updating ${iconName}:`, error);
//   }
// };

// const handleIconClick = async (iconName) => {
//   try {
//     if (!user) {
//       alert("You must be logged in to interact with the post.");
//       return;
//     }

//     // Perform the PUT request
//     const response = await axios.put(
//       `http://localhost:3006/posts/${post_id}/${iconName}`,
//       { user_id: user.user_id }
//     );

//     const updatedPost = response.data;

//     // Update state based on the API response
//     switch (iconName) {
//       case "like":
//         setLikeCount(updatedPost.likes);
//         break;
//       case "dislike":
//         setDislikeCount(updatedPost.dislikes);
//         break;
//       case "thumbUp":
//         setThumbUp(updatedPost.thumb_ups);
//         break;
//       case "share":
//         setShareCount(updatedPost.shares);
//         break;
//       case "comments":
//         setShown(!shown);
//         break;
//       default:
//         console.error("Unknown iconName:", iconName);
//     }

//     // Notify the user of success
//     alert(
//       `${
//         iconName.charAt(0).toUpperCase() + iconName.slice(1)
//       } updated successfully!`
//     );
//   } catch (error) {
//     // Handle specific error cases
//     if (error.response) {
//       const { status, data } = error.response;
//       if (
//         status === 400 &&
//         data.error === "You have already performed this action"
//       ) {
//         alert(`You have already ${iconName}d this post.`);
//       } else if (status === 404) {
//         alert("The post you are trying to interact with does not exist.");
//       } else {
//         alert(
//           `An error occurred while updating ${iconName}: ${
//             data.error || "Unknown error"
//           }`
//         );
//       }
//     } else {
//       console.error(`Error updating ${iconName}:`, error);
//       alert(
//         `An unexpected error occurred while updating ${iconName}. Please try again.`
//       );
//     }
//   }
// };

// IF THE COMMENT SECTION IS NOT OPENED

// TO CHECK IF THE BACKEND AND THE FRON WORK WELL, THE CODE ABOVE

////// END Post page

//::: COMMENT SECTION SNIPPETS
// <div className="comment" key={index}>
//   <div className="comment-header">
//     <div className="comment-author-avatar">
//       <img
//         src={comment.authorAvatar || "default-avatar.png"}
//         alt={comment.author}
//       />
//     </div>
//     <div className="comment-author-details">
//       <p className="author-name">{comment.author}</p>
//       <p className="comment-timestamp">{comment.timestamp}</p>
//     </div>
//   </div>
//   <div className="comment-body">
//     <p>{comment.content}</p>
//   </div>
// </div>
// ::: END COMMENT SECTION SNIPPETS
