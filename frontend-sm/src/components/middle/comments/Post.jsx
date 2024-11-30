// import React, { useState } from "react";
// import { BsSend } from "react-icons/bs";
// import { PostIcons } from "../../../data";
// import "./Post.css";

// function Post({ content, media, postId, user }) {
//   const [comments, setComments] = useState([
//     { text: "This is a comment.", author: "User1" },
//     { text: "Another comment here.", author: "User2" },
//   ]);
//   const [shown, setShown] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [likeCount, setLikeCount] = useState(0);
//   const [dislikeCount, setDislikeCount] = useState(0);
//   const [shareCount, setShareCount] = useState(0);
//   const [thumbUp, setThumbUp] = useState(0);

//   const handleCommentChange = (event) => {
//     setNewComment(event.target.value);
//   };

//   const handleCommentSubmit = () => {
//     if (newComment.trim()) {
//       setComments([...comments, { text: newComment, author: "You" }]);
//       setNewComment("");
//     }
//   };

//   // const handleIconClick = (iconName) => {
//   //   if (iconName === "comments") {
//   //     setShown(!shown); // Toggle comment section visibility
//   //   } else if (iconName === "like") {
//   //     setLikeCount(likeCount + 1); // Increment like count
//   //   } else if (iconName === "dislike") {
//   //     setDislikeCount(dislikeCount + 1); // Increment dislike count
//   //   } else if (iconName === "share") {
//   //     setShareCount(shareCount + 1); // Increment dislike count
//   //   } else if (iconName === "thumbUp") {
//   //     setThumbUp(thumbUp + 1); // Increment dislike count
//   //   }
//   // };

//   // const handleIconClick = async (iconName) => {
//   //   let updateField = "";
//   //   let currentValue = 0;

//   //   if (iconName === "comments") {
//   //     // Toggle the display of comments
//   //     setShown(!shown);
//   //   } else {
//   //     // Determine which field to update
//   //     switch (iconName) {
//   //       case "like":
//   //         updateField = "likeCount";
//   //         currentValue = likeCount + 1;
//   //         setLikeCount(currentValue);
//   //         break;
//   //       case "dislike":
//   //         updateField = "dislikeCount";
//   //         currentValue = dislikeCount + 1;
//   //         setDislikeCount(currentValue);
//   //         break;
//   //       case "share":
//   //         updateField = "shareCount";
//   //         currentValue = shareCount + 1;
//   //         setShareCount(currentValue);
//   //         break;
//   //       case "thumbUp":
//   //         updateField = "thumbUp";
//   //         currentValue = thumbUp + 1;
//   //         setThumbUp(currentValue);
//   //         break;
//   //       default:
//   //         return;
//   //     }

//   //     // Send a PUT request to update the post in the database
//   //     try {
//   //       const response = await fetch(
//   //         `http://localhost:3006/posts/${postId}/${iconName}`,
//   //         {
//   //           method: "PUT",
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //           },
//   //           body: JSON.stringify({
//   //             [updateField]: currentValue,
//   //           }),
//   //         }
//   //       );

//   //       if (!response.ok) {
//   //         console.error("Error updating post:", response.statusText);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error updating post:", error);
//   //     }
//   //   }
//   // };
//   // const handleIconClick = async (iconName) => {
//   //   let updateField = "";
//   //   let currentValue = 0;

//   //   if (iconName === "comments") {
//   //     // Toggle the display of comments
//   //     setShown(!shown);
//   //   } else {
//   //     // Determine which field to update
//   //     switch (iconName) {
//   //       case "like":
//   //         updateField = "likeCount";
//   //         currentValue = likeCount + 1;
//   //         setLikeCount(currentValue);
//   //         break;
//   //       case "dislike":
//   //         updateField = "dislikeCount";
//   //         currentValue = dislikeCount + 1;
//   //         setDislikeCount(currentValue);
//   //         break;
//   //       case "share":
//   //         updateField = "shareCount";
//   //         currentValue = shareCount + 1;
//   //         setShareCount(currentValue);
//   //         break;
//   //       case "thumbUp":
//   //         updateField = "thumbUp";
//   //         currentValue = thumbUp + 1;
//   //         setThumbUp(currentValue);
//   //         break;
//   //       default:
//   //         return;
//   //     }

//   //   // Update the field and send PUT request
//   //   try {
//   //     const response = await fetch(
//   //       `http://localhost:3006/posts/${postId}/${iconName}`,
//   //       {
//   //         method: "PUT",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );

//   //     if (!response.ok) {
//   //       console.error("Error updating post:", response.statusText);
//   //     } else {
//   //       const updatedPost = await response.json();
//   //       if (response.ok) {
//   //         const updatedPost = await response.json();
//   //         setLikeCount(updatedPost.likes);
//   //         // Update other counts similarly
//   //       } else {
//   //         console.error("Failed to update the post");
//   //       }
//   //       // Update state with the new values from the database
//   //       setLikeCount(updatedPost.likes);
//   //       setDislikeCount(updatedPost.dislikes);
//   //       setShareCount(updatedPost.shares);
//   //       setThumbUp(updatedPost.thumb_ups);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error updating post:", error);
//   //   }
//   // };
//   const handleIconClick = async (iconName) => {
//     let updateField = "";
//     let currentValue = 0;

//     // Determine the field to update
//     switch (iconName) {
//       case "like":
//         updateField = "likeCount";
//         currentValue = likeCount + 1;
//         break;
//       case "dislike":
//         updateField = "dislikeCount";
//         currentValue = dislikeCount + 1;
//         break;
//       case "share":
//         updateField = "shareCount";
//         currentValue = shareCount + 1;
//         break;
//       case "thumbUp":
//         updateField = "thumbUp";
//         currentValue = thumbUp + 1;
//         break;
//       case "comments":
//         setShown(!shown); // Toggle comment visibility
//         return; // No backend update needed for comments
//       default:
//         console.error("Invalid icon name:", iconName);
//         return;
//     }

//     // Optimistic UI update
//     if (updateField === "likeCount") setLikeCount(currentValue);
//     else if (updateField === "dislikeCount") setDislikeCount(currentValue);
//     else if (updateField === "shareCount") setShareCount(currentValue);
//     else if (updateField === "thumbUp") setThumbUp(currentValue);

//     // Backend update
//     try {
//       const response = await fetch(
//         `http://localhost:3006/posts/${postId}/${iconName}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ [updateField]: currentValue }), // Send updated count
//         }
//       );

//       if (response.ok) {
//         const updatedPost = await response.json();

//         // Synchronize frontend with backend values
//         setLikeCount(updatedPost.likes);
//         setDislikeCount(updatedPost.dislikes);
//         setShareCount(updatedPost.shares);
//         setThumbUp(updatedPost.thumb_ups);
//       } else {
//         console.error("Failed to update the post:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating post:", error);
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

//         {/* Post Icons */}
//       </div>
//       <div className="post-icons">
//         <h5 className="likes">
//           <p>
//             {totalCount}
//             {likeCount || thumbUp
//               ? PostIcons.map((icon, index) => (
//                   <span
//                     key={index}
//                     style={{
//                       fontSize: "16px",
//                       color: "pink",
//                       fontSize: "12px",
//                     }}
//                   >
//                     {likeCount && icon.name === "like" ? icon.element : ""}
//                     {thumbUp && icon.name === "thumbUp" ? icon.element : ""}
//                   </span>
//                 ))
//               : ""}{" "}
//           </p>
//         </h5>
//         <br />
//         {PostIcons.map((icon, index) => (
//           <div
//             key={index}
//             className="icon"
//             onClick={() => handleIconClick(icon.name)}
//           >
//             {icon.element}
//             {/* Display the count if it's like, dislike, or comments */}
//             {icon.name === "like" && likeCount > 0 && (
//               <span className="icon-count"> {likeCount}</span>
//             )}{" "}
//             {icon.name === "dislike" && dislikeCount > 0 && (
//               <span className="icon-count"> {dislikeCount}</span>
//             )}
//             {icon.name === "comments" && shown && comments.length > 0 && (
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

//       {/* Comment Section */}
//       {shown && (
//         <div className="comments-section">
//           <div className="comments-list">
//             {comments.map((comment, index) => (
//               <div className="comment" key={index}>
//                 <p className="comment-text">{comment.text} </p>
//                 <p className="comment-author">-- {comment.author}</p>
//               </div>
//             ))}
//           </div>

//           {/* Input Section */}
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

// // LE CODE AU DESSUS MARCHE SUPER BIEN PUISQU'IL ME PERMET D'ENTRER DES DONNEES
// // DANS LA BASE, LE SEUL HIC EST QU'IL NE ME PERMET PAS DE LES AFFICHER

// import React, { useState, useEffect } from "react";
// import { BsSend } from "react-icons/bs";
// import { PostIcons } from "../../../data";
// import "./Post.css";

// function Post({ content, media, postId }) {
//   const [comments, setComments] = useState([]);
//   const [shown, setShown] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [likeCount, setLikeCount] = useState(0);
//   const [dislikeCount, setDislikeCount] = useState(0);
//   const [shareCount, setShareCount] = useState(0);
//   const [thumbUp, setThumbUp] = useState(0);

//   useEffect(() => {
//     // Fetch initial data (likes, dislikes, shares, and comments)
//     async function fetchPostData() {
//       try {
//         const response = await fetch(`http://localhost:3005/posts/${postId}`);
//         const data = await response.json();
//         setLikeCount(data.likeCount);
//         setDislikeCount(data.dislikeCount);
//         setShareCount(data.shareCount);
//         setThumbUp(data.thumbUp);
//         setComments(data.comments);
//       } catch (error) {
//         console.error("Error fetching post data:", error);
//       }
//     }

//     fetchPostData();
//   }, [postId]);

//   const handleCommentChange = (event) => {
//     setNewComment(event.target.value);
//   };

//   const handleCommentSubmit = async () => {
//     if (newComment.trim()) {
//       try {
//         const response = await fetch(
//           `http://localhost:3005/posts/${postId}/comments`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ text: newComment }),
//           }
//         );

//         if (response.ok) {
//           const newCommentFromDb = await response.json();
//           setComments([...comments, newCommentFromDb]);
//           setNewComment("");
//         }
//       } catch (error) {
//         console.error("Error submitting comment:", error);
//       }
//     }
//   };

//   const handleIconClick = async (iconName) => {
//     let updateField = "";
//     let currentValue = 0;

//     if (iconName === "comments") {
//       setShown(!shown);
//     } else {
//       switch (iconName) {
//         case "like":
//           updateField = "likeCount";
//           currentValue = likeCount + 1;
//           setLikeCount(currentValue);
//           break;
//         case "dislike":
//           updateField = "dislikeCount";
//           currentValue = dislikeCount + 1;
//           setDislikeCount(currentValue);
//           break;
//         case "share":
//           updateField = "shareCount";
//           currentValue = shareCount + 1;
//           setShareCount(currentValue);
//           break;
//         case "thumbUp":
//           updateField = "thumbUp";
//           currentValue = thumbUp + 1;
//           setThumbUp(currentValue);
//           break;
//         default:
//           break;
//       }

//       try {
//         await fetch(`http://localhost:3005/posts/${postId}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ [updateField]: currentValue }),
//         });
//       } catch (error) {
//         console.error("Error updating post:", error);
//       }
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
//           <p>{totalCount}</p>
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
//             {icon.name === "comments" && shown && comments.length > 0 && (
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
//                 <p className="comment-text">{comment.text} </p>
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

// import React, { useState } from "react";
// import { BsSend } from "react-icons/bs";
// import { PostIcons } from "../../../data";
// import "./Post.css";

// function Post({ content, media, postId, user }) {
//   const [comments, setComments] = useState([
//     { text: "This is a comment.", author: "User1" },
//     { text: "Another comment here.", author: "User2" },
//   ]);
//   const [shown, setShown] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [likeCount, setLikeCount] = useState(0);
//   const [dislikeCount, setDislikeCount] = useState(0);
//   const [shareCount, setShareCount] = useState(0);
//   const [thumbUp, setThumbUp] = useState(0);

//   const handleCommentChange = (event) => {
//     setNewComment(event.target.value);
//   };

//   const handleCommentSubmit = () => {
//     if (newComment.trim()) {
//       setComments([...comments, { text: newComment, author: "You" }]);
//       setNewComment("");
//     }
//   };

//   const handleIconClick = async (iconName) => {
//     let updateField = "";
//     let currentValue = 0;

//     // Determine the field to update
//     switch (iconName) {
//       case "like":
//         updateField = "likeCount";
//         currentValue = likeCount + 1;
//         break;
//       case "dislike":
//         updateField = "dislikeCount";
//         currentValue = dislikeCount + 1;
//         break;
//       case "share":
//         updateField = "shareCount";
//         currentValue = shareCount + 1;
//         break;
//       case "thumbUp":
//         updateField = "thumbUp";
//         currentValue = thumbUp + 1;
//         break;
//       case "comments":
//         setShown(!shown); // Toggle comment visibility
//         return; // No backend update needed for comments
//       default:
//         console.error("Invalid icon name:", iconName);
//         return;
//     }

//     // Optimistic UI update
//     if (updateField === "likeCount") setLikeCount(currentValue);
//     else if (updateField === "dislikeCount") setDislikeCount(currentValue);
//     else if (updateField === "shareCount") setShareCount(currentValue);
//     else if (updateField === "thumbUp") setThumbUp(currentValue);

//     // Backend update
//     try {
//       const response = await fetch(
//         `http://localhost:3006/posts/${postId}/${iconName}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ [updateField]: currentValue }), // Send updated count
//         }
//       );

//       if (response.ok) {
//         const updatedPost = await response.json();

//         // Synchronize frontend with backend values
//         setLikeCount(updatedPost.likes);
//         setDislikeCount(updatedPost.dislikes);
//         setShareCount(updatedPost.shares);
//         setThumbUp(updatedPost.thumb_ups);
//       } else {
//         console.error("Failed to update the post:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating post:", error);
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

//         {/* Post Icons */}
//       </div>
//       <div className="post-icons">
//         <h5 className="likes">
//           <p>
//             {totalCount}
//             {likeCount || thumbUp
//               ? PostIcons.map((icon, index) => (
//                   <span
//                     key={index}
//                     style={{
//                       fontSize: "16px",
//                       color: "pink",
//                       fontSize: "12px",
//                     }}
//                   >
//                     {likeCount && icon.name === "like" ? icon.element : ""}
//                     {thumbUp && icon.name === "thumbUp" ? icon.element : ""}
//                   </span>
//                 ))
//               : ""}{" "}
//           </p>
//         </h5>
//         <br />
//         {PostIcons.map((icon, index) => (
//           <div
//             key={index}
//             className="icon"
//             onClick={() => handleIconClick(icon.name)}
//           >
//             {icon.element}
//             {/* Display the count if it's like, dislike, or comments */}
//             {icon.name === "like" && likeCount > 0 && (
//               <span className="icon-count"> {likeCount}</span>
//             )}{" "}
//             {icon.name === "dislike" && dislikeCount > 0 && (
//               <span className="icon-count"> {dislikeCount}</span>
//             )}
//             {icon.name === "comments" && shown && comments.length > 0 && (
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

//       {/* Comment Section */}
//       {shown && (
//         <div className="comments-section">
//           <div className="comments-list">
//             {comments.map((comment, index) => (
//               <div className="comment" key={index}>
//                 <p className="comment-text">{comment.text} </p>
//                 <p className="comment-author">-- {comment.author}</p>
//               </div>
//             ))}
//           </div>

//           {/* Input Section */}
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
//   if (!user || !user.user_id) {
//     console.error("User is not defined or user_id is missing");
//     return;
//   }

//   const userId = user.user_id;
//   console.log("user_id:", userId); // Debugging output
//   const apiUrl = `http://localhost:3006/posts/${postId}/${iconName}`;

//   let updateField = "";
//   switch (iconName) {
//     case "like":
//       updateField = "likeCount";
//       break;
//     case "dislike":
//       updateField = "dislikeCount";
//       break;
//     case "share":
//       updateField = "shareCount";
//       break;
//     case "thumbUp":
//       updateField = "thumbUp";
//       break;
//     case "comments":
//       setShown(!shown); // Toggle comment visibility
//       return;
//     default:
//       console.error("Invalid icon name:", iconName);
//       return;
//   }

//   try {
//     // Backend request to update count
//     const response = await axios.post(apiUrl, {
//       user_id: user.user_id, // Pass user ID for tracking
//     });

//     // Update UI based on server response
//     const updatedCount = response.data.count || 0;
//     if (updateField === "likeCount") setLikeCount(updatedCount);
//     else if (updateField === "dislikeCount") setDislikeCount(updatedCount);
//     else if (updateField === "shareCount") setShareCount(updatedCount);
//     else if (updateField === "thumbUp") setThumbUp(updatedCount);
//   } catch (error) {
//     console.error(`Error updating ${iconName}:`, error);
//   }
// };

// import React, { useState } from "react";
// import { BsSend } from "react-icons/bs";
// import { PostIcons } from "../../../data";
// import "./Post.css";
// import axios from "axios";

// function Post({ content, media, postId, user }) {
//   const [comments, setComments] = useState([]);
//   const [shown, setShown] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [likeCount, setLikeCount] = useState(0);
//   const [dislikeCount, setDislikeCount] = useState(0);
//   const [shareCount, setShareCount] = useState(0);
//   const [thumbUp, setThumbUp] = useState(0);

//   const handleCommentChange = (event) => {
//     setNewComment(event.target.value);
//   };

//   const handleCommentSubmit = () => {
//     if (newComment.trim()) {
//       setComments([...comments, { text: newComment, author: "You" }]);
//       setNewComment("");
//     }
//   };

//   const handleIconClick = async (iconName) => {
//     try {
//       if (!user) {
//         console.log("user is missing");
//       }
//       if (!iconName) {
//         throw new Error("iconeName is missong");
//       }
//       if (!postId) {
//         throw new Error("postId is missong");
//       }

//       console.log("Event triggered for:", iconName);
//       console.log("User ID:", user.user_id);

//       const response = await fetch(
//         `http://localhost:3006/posts/${postId}/${iconName}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ user_id: user.user_id }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`API Error: ${response.statusText}`);
//       }

//       const updatedPost = await response.json();
//       console.log("Updated post data:", updatedPost);

//       // Update state
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
//         default:
//           console.error("Unknown iconName:", iconName);
//       }
//     } catch (error) {
//       console.error(`Error updating ${iconName}:`, error);
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
//             {icon.name === "comments" && shown && comments.length > 0 && (
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
//   // THIS PART IS FOR HANDLING THE USER INTERACTIONS (LIKES, DISLIKES...)
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [userActions, setUserActions] = useState({
//     like: false,
//     dislike: false,
//   });

//   console.log("Voici le numero d'identifiant: " + post_id);

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
//       } catch (error) {
//         console.error("Error submitting comment:", error);
//       }
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
//           setShown(!shown);
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
//             disabled={isProcessing}
//           >
//             {icon.element}
//             {icon.name === "like" && likeCount > 0 && (
//               <span className="icon-count"> {likeCount}</span>
//             )}
//             {icon.name === "dislike" && dislikeCount > 0 && (
//               <span className="icon-count"> {dislikeCount}</span>
//             )}
//             {icon.name === "comments" && shown && comments.length > 0 && (
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

import React, { useState, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import { PostIcons } from "../../../data";
import "./Post.css";
import axios from "axios";
import { toast } from "react-toastify";

function Post({ content, media, post_id, user, author }) {
  const [comments, setComments] = useState([]);
  const [shown, setShown] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [thumbUp, setThumbUp] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaPosts = Array.isArray(media) ? media : [];

  // Fetch initial post interaction counts
  useEffect(() => {
    const fetchPostInteractions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3006/posts/${post_id}`
        );
        const post = response.data;
        // console.log(post);
        // Assuming the response contains the interaction counts
        setLikeCount(post.likes || 0);
        setDislikeCount(post.dislikes || 0);
        setShareCount(post.shares || 0);
        setThumbUp(post.thumb_ups || 0);
      } catch (error) {
        console.error("Error fetching post interactions:", error);
      }
    };

    fetchPostInteractions();
  }, [post_id]);

  // Fetch comments when the comments section is shown
  useEffect(() => {
    const fetchComments = async () => {
      if (shown) {
        try {
          const response = await axios.get(
            `http://localhost:3006/posts/${post_id}/comments`
          );
          setComments(response.data); // Assuming response contains an array of comments
          console.log(comments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };

    fetchComments();
  }, [shown, post_id]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `http://localhost:3006/posts/${post_id}/comments`,
          { content: newComment, user_id: user.user_id }
        );

        const newCommentData = response.data;
        setComments([...comments, newCommentData]); // Add new comment to the list
        setNewComment(""); // Clear input field
        toast.success("Comment added successfully!");
      } catch (error) {
        console.error("Error submitting comment:", error);
        toast.error("Failed to add comment.");
      }
    } else {
      toast.warn("Comment cannot be empty.");
    }
  };

  const handleIconClick = async (iconName) => {
    if (isProcessing) return; // Prevent duplicate clicks

    setIsProcessing(true); // Disable interactions temporarily
    try {
      const response = await axios.put(
        `http://localhost:3006/posts/${post_id}/${iconName}`,
        { user_id: user.user_id }
      );

      const updatedPost = response.data;

      // Update state based on response
      switch (iconName) {
        case "like":
          setLikeCount(updatedPost.likes);
          break;
        case "dislike":
          setDislikeCount(updatedPost.dislikes);
          break;
        case "thumbUp":
          setThumbUp(updatedPost.thumb_ups);
          break;
        case "share":
          setShareCount(updatedPost.shares);
          break;
        case "comments":
          setComments((prevShown) => !prevShown); // Toggle comments visibility
          break;
        default:
          console.error("Unknown iconName:", iconName);
      }
      toast.success(
        `${
          iconName.charAt(0).toUpperCase() + iconName.slice(1) // Exemple : like.charAt(0).toUpperCase()
        } updated successfully!` // Output : Like  -> or (const _ = require("lodash") )
      ); //                       _capitalize("like")
    } catch (error) {
      toast.error(
        `${error.response?.data?.error || "Unknown error"}`
        // `An error occurred: ${error.response?.data?.error || "Unknown error"}`
      );
    } finally {
      setIsProcessing(false); // Re-enable interactions
    }
  };
  let totalCount;
  if (likeCount == 1) {
    totalCount = likeCount;
  } else {
    totalCount = likeCount + thumbUp;
  }

  // const totalCount = likeCount + thumbUp;

  // const handleDelete = ({ post_id, token }) => {
  //   if (window.confirm("Are you sure you want to delete this post?")) {
  //     deletePost(post_id, token);
  //   }
  // };

  // const DeletePost = async () => {
  //   const confirmation = window.confirm(
  //     "Are you sure you want to delete this post?"
  //   );

  //   if (confirmation) {
  //     try {
  //       await deletePost(post_id, token); // Call your delete function
  //       toast.success("Post deleted successfully.");
  //     } catch (error) {
  //       console.error("Error deleting post:", error);
  //     }
  //   } else {
  //     toast.info("Post deletion cancelled.");
  //   }

  // };

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to create a post.");
    return;
  }

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem("token"); // Example of token retrieval

    try {
      const response = await axios.delete(
        `http://localhost:3006/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the user's token for authentication
          },
        }
      );

      toast.success(response.data.message || "Comment deleted successfully!");
      // Remove the deleted comment from the UI
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (error) {
      toast.error(error.response?.data?.error || "Error deleting comment");
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="post-infos">
      <p className="user-paragraph">{content}</p>
      <div className="post-media">
        {mediaPosts.map((file, index) =>
          file.type.startsWith("image") || file.type.startsWith("video") ? (
            <img
              key={index}
              className="posted-images"
              src={file.url}
              alt="Post"
            />
          ) : (
            <video
              key={index}
              className="posted-videos"
              src={file.url}
              controls
            />
          )
        )}
      </div>
      <div className="post-icons">
        <h5 className="likes">
          {totalCount > 0 && (
            <span>
              {totalCount}
              {PostIcons.map((icon, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "pink",
                  }}
                >
                  {likeCount && icon.name === "like" ? icon.element : ""}
                  {thumbUp && icon.name === "thumbUp" ? icon.element : ""}
                </span>
              ))}
            </span>
          )}
        </h5>
        <br />

        {PostIcons.map((icon, index) => (
          <div
            key={index}
            className="icon"
            onClick={() => handleIconClick(icon.name)}
            disabled={isProcessing}
          >
            {icon.element}
            {icon.name === "like" && (
              <span className="icon-count"> {likeCount}</span>
            )}
            {/* {icon.name === "dislike" && (
              <span className="icon-count"> {dislikeCount}</span>
            )}
            {icon.name === "dislike" && (
              <span className="icon-count"> {dislikeCount}</span>
            )}
            {icon.name === "share" && (
              <span className="icon-count"> {shareCount}</span>
            )}
            {icon.name === "thumbUp" && (
              <span className="icon-count"> {thumbUp}</span>
            )} */}
          </div>
        ))}

        <div
          className="icon"
          onClick={() => setShown((prevShown) => !prevShown)}
          style={{ cursor: "pointer" }}
        >
          <span>
            {PostIcons.find((icon) => icon.name === "comments").element}
          </span>
          <span className="icon-count">
            {comments.length > 0 && comments.length}
          </span>
        </div>
      </div>

      {shown && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map((comment, index) => (
              <div className="comment" key={index}>
                <div className="comment-author">
                  <img
                    className="profile-photo"
                    src={`http://localhost:3006${comment.profile_photo}`}
                    alt={`${comment.author}'s profile`}
                  />
                </div>
                <div className="comment-text">
                  <p className="comment-author-name">{comment.author}</p>
                  <p className="comment-content-name">{comment.content}</p>
                  {/* Just for similate */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "3px",
                    }}
                  >
                    <div style={{ paddingTop: "5px", gap: "10px" }}>
                      {" "}
                      <span
                        style={{
                          padding: "4px",
                          cursor: "pointer",
                          borderRadius: "50%",
                          border: "1px solid #e0e0e016",
                        }}
                      >
                        👍🏻
                      </span>{" "}
                      <span
                        style={{
                          padding: "4px",
                          cursor: "pointer",
                          borderRadius: "50%",
                          border: "1px solid #e0e0e016",
                        }}
                      >
                        👎🏻
                      </span>{" "}
                    </div>

                    {/* for deleting Comment */}
                    {(user.user_id === comment.user_id ||
                      user.user_id === comment.author) && (
                      <button
                        className="delete-comment"
                        onClick={() => {
                          const confirmation = window.confirm(
                            "Are you sure you want to delete this comment?"
                          );
                          if (confirmation) deleteComment(comment.comment_id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                    {/* end for deleting Comment */}
                  </div>

                  {/* end Just for similate */}
                </div>
              </div>
            ))}
          </div>
          {/* la photo et la balise du secteur commentaire */}
          <div className="comment-input">
            <div className="comment-author">
              {user.user_id ? (
                <img
                  className="profile-photo"
                  src={`http://localhost:3006${user.profile_photo}`}
                  alt="author"
                />
              ) : (
                <img
                  className="profile-photo"
                  src={author.profile_photo}
                  alt="author"
                />
              )}
            </div>
            <input
              type="text"
              placeholder="Write a comment..."
              className="input-field"
              value={newComment}
              onChange={handleCommentChange}
            />
            <button className="submit-button" onClick={handleCommentSubmit}>
              <BsSend style={{ backgroundColor: "transparent" }} /> Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;

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

//         // Initialize comments
//         setComments(post.comments || []);
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

//   useEffect(() => {
//     if (shown) {
//       const fetchComments = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:3006/posts/${post_id}/comments`
//           );
//           console.log("Fetched comments:", response.data); // Debugging
//           setComments(response.data);
//         } catch (error) {
//           console.error("Error fetching comments:", error);
//         }
//       };
//       fetchComments();
//     }
//   }, [shown, post_id]);

//   const handleCommentSubmit = async () => {
//     if (newComment.trim()) {
//       try {
//         const response = await axios.post(
//           `http://localhost:3006/posts/${post_id}/comments`,
//           { content: newComment, user_id: user.user_id }
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
//         case "comments":
//           setShown("this is the shown command"); // Toggle comments section visibility
//           break;
//         case "thumbUp":
//           setThumbUp(updatedPost.thumb_ups);
//           break;
//         case "share":
//           setShareCount(updatedPost.shares);
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
//               <span className="icon-count">{comments.length}</span>
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
//                 <p className="comment-text">{comment.content}</p>
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

// 535/732 THE FUNCTIONALITIES WORK WITHOUT THE UPDATINGS
