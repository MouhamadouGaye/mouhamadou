// import "./PostHead.css";
// import React, { useState } from "react";
// import { AiOutlineFileImage } from "react-icons/ai"; // Media Icon
// import { BsEmojiSmile } from "react-icons/bs"; // Emoji Icon
// import EmojiPicker from "emoji-picker-react";
// import axios from "axios";

// const CreatePost = () => {
//   const [content, setContent] = useState("");
//   const [media, setMedia] = useState(null); // Changed to null for files
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [selectedEmoji, setSelectedEmoji] = useState("");

//   // Handle Emoji selection
//   const onEmojiClick = (event, emojiObject) => {
//     setSelectedEmoji(emojiObject.emoji);
//     setContent(content + emojiObject.emoji); // Append emoji to content
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create FormData to handle both text and file uploads
//     const formData = new FormData();
//     formData.append("user_id", 1); // Use a valid user_id here
//     formData.append("content", content);

//     // Only append the media if a file has been selected
//     if (media) {
//       formData.append("media", media);
//     }

//     try {
//       await axios.post("http://localhost:3006/posts", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Post created successfully");
//       setContent(""); // Clear the input fields
//       setMedia(null);
//       setSelectedEmoji("");
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <div className="create-post">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <textarea
//             placeholder="What's on your mind?"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={4}
//             style={{ width: "100%", padding: "10px" }}
//           />
//         </div>
//         <div className="media-emoji-container" style={{ marginTop: "10px" }}>
//           {/* Media Icon */}
//           <label>
//             <AiOutlineFileImage size={25} style={{ cursor: "pointer" }} />
//             <input
//               type="file"
//               style={{ display: "none" }}
//               onChange={(e) => setMedia(e.target.files[0])} // Update media state with the selected file
//             />
//           </label>
//           {/* Emoji Picker */}
//           <BsEmojiSmile
//             size={25}
//             style={{ marginLeft: "10px", cursor: "pointer" }}
//             onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//           />
//           {showEmojiPicker && (
//             <EmojiPicker
//               pickerStyle={{ position: "absolute", zIndex: 1000 }}
//               onEmojiClick={onEmojiClick}
//             />
//           )}
//         </div>
//         <button className="btn-head-post" type="submit">
//           Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

// this code above works almost fine, it's only the
// emoji that doesn't respond as the way it should be

// import "./PostHead.css";
// import React, { useState } from "react";
// import { AiOutlineFileImage } from "react-icons/ai"; // Media Icon
// import { BsEmojiSmile } from "react-icons/bs"; // Emoji Icon
// import EmojiPicker from "emoji-picker-react";
// import axios from "axios";

// const CreatePost = () => {
//   const [content, setContent] = useState("");
//   const [media, setMedia] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [selectedEmoji, setSelectedEmoji] = useState("");

//   // Handle Emoji selection
//   const onEmojiClick = (emojiObject) => {
//     setSelectedEmoji(emojiObject.emoji);
//     setContent(content + emojiObject.emoji); // Append emoji to content
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create FormData to handle both text and file uploads
//     const formData = new FormData();
//     formData.append("user_id", 1); // Use a valid user_id here
//     formData.append("content", content);

//     // Only append the media if a file has been selected
//     if (media) {
//       formData.append("media", media);
//     }

//     try {
//       await axios.post("http://localhost:3006/posts", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Post created successfully");
//       setContent(""); // Clear the input fields
//       setMedia(null);
//       setSelectedEmoji("");
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <div className="create-post">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <textarea
//             placeholder="What's on your mind?"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={4}
//             style={{ width: "100%", padding: "10px" }}
//           />
//         </div>
//         <div className="media-emoji-container" style={{ marginTop: "10px" }}>
//           {/* Media Icon */}
//           <label>
//             <AiOutlineFileImage size={25} style={{ cursor: "pointer" }} />
//             <input
//               type="file"
//               style={{ display: "none" }}
//               onChange={(e) => setMedia(e.target.files[0])} // Update media state with the selected file
//             />
//           </label>
//           {/* Emoji Picker */}
//           <BsEmojiSmile
//             size={25}
//             style={{ marginLeft: "10px", cursor: "pointer" }}
//             onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//           />
//           {showEmojiPicker && (
//             <div className="emoji-picker">
//               {" "}
//               {/* Add this wrapper for positioning */}
//               <EmojiPicker
//                 onEmojiClick={(event, emojiObject) => onEmojiClick(emojiObject)}
//               />
//             </div>
//           )}
//         </div>
//         <button className="btn-head-post" type="submit">
//           Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

// import "./PostHead.css";
// import React, { useState, useEffect, useRef } from "react";
// import { AiOutlineFileImage } from "react-icons/ai"; // Media Icon
// import { BsEmojiSmile } from "react-icons/bs"; // Emoji Icon
// import EmojiPicker from "emoji-picker-react";
// import axios from "axios";

// const CreatePost = () => {
//   const [content, setContent] = useState("");
//   const [media, setMedia] = useState(null); // State for selected media
//   const [mediaPreview, setMediaPreview] = useState(""); // For file preview
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const emojiPickerRef = useRef(null);

//   // Handle Emoji selection
//   const onEmojiClick = (event, emojiObject) => {
//     setContent((prevContent) => prevContent + emojiObject.emoji); // Append emoji to content
//     setShowEmojiPicker(false); // Close the emoji picker after selecting
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create FormData to handle both text and file uploads
//     const formData = new FormData();
//     formData.append("user_id", 1); // Use a valid user_id here
//     formData.append("content", content);

//     // Only append the media if a file has been selected
//     if (media) {
//       formData.append("media", media);
//     }

//     try {
//       await axios.post("http://localhost:3006/posts", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Post created successfully");
//       setContent(""); // Clear the input fields
//       setMedia(null);
//       setMediaPreview(""); // Clear preview after submission
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setMedia(file); // Store the selected file in the state

//     // Create a file preview if the file is an image
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMediaPreview(reader.result); // Set preview URL for the image
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setMediaPreview(""); // Clear preview if not an image
//     }
//   };

//   // Handle click outside of emoji picker
//   const handleClickOutside = (event) => {
//     if (
//       emojiPickerRef.current &&
//       !emojiPickerRef.current.contains(event.target)
//     ) {
//       setShowEmojiPicker(false);
//     }
//   };

//   // Attach and detach event listener
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="create-post">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <textarea
//             placeholder="What's on your mind?"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={4}
//             style={{ width: "100%", padding: "10px" }}
//           />
//         </div>
//         <div
//           className="media-emoji-container"
//           style={{ marginTop: "10px", position: "relative" }}
//         >
//           {/* Media Icon */}
//           <label>
//             <AiOutlineFileImage size={25} style={{ cursor: "pointer" }} />
//             <input
//               type="file"
//               style={{ display: "none" }}
//               onChange={handleFileChange} // Handle file selection
//             />
//           </label>

//           {/* Show selected file or preview */}
//           {media && (
//             <div style={{ marginTop: "10px" }}>
//               {mediaPreview ? (
//                 <img
//                   src={mediaPreview}
//                   alt="Selected media"
//                   style={{ maxWidth: "200px", maxHeight: "200px" }}
//                 />
//               ) : (
//                 <p>Selected file: {media.name}</p>
//               )}
//             </div>
//           )}

//           {/* Emoji Picker */}
//           <BsEmojiSmile
//             size={25}
//             style={{ marginLeft: "10px", cursor: "pointer" }}
//             onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//           />
//           {showEmojiPicker && (
//             <div className="emoji-picker" ref={emojiPickerRef}>
//               {" "}
//               {/* Add this wrapper for positioning */}
//               <EmojiPicker onEmojiClick={onEmojiClick} />
//             </div>
//           )}
//         </div>
//         <button className="btn-head-post" type="submit">
//           Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

// import "./PostHead.css";
// import React, { useState, useEffect, useRef } from "react";
// import { AiOutlineFileImage } from "react-icons/ai"; // Media Icon
// import { BsEmojiSmile } from "react-icons/bs"; // Emoji Icon
// import EmojiPicker from "emoji-picker-react";
// import axios from "axios";

// const CreatePost = () => {
//   const [content, setContent] = useState("");
//   const [media, setMedia] = useState(null); // State for selected media
//   const [mediaPreview, setMediaPreview] = useState(""); // For file preview
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const emojiPickerRef = useRef(null);

//   // Handle Emoji selection
//   const onEmojiClick = (event, emojiObject) => {
//     console.log("Emoji Object:", emojiObject);

//     // Ensure emojiObject is not null
//     if (emojiObject && emojiObject.emoji) {
//       setContent((prevContent) => prevContent + emojiObject.emoji); // Append emoji to content
//       setShowEmojiPicker(false); // Close the emoji picker after selecting
//     } else {
//       console.warn("Emoji object is undefined or does not contain an emoji.");
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create FormData to handle both text and file uploads
//     const formData = new FormData();
//     formData.append("user_id", 1); // Use a valid user_id here
//     formData.append("content", content);

//     // Only append the media if a file has been selected
//     if (media) {
//       formData.append("media", media);
//     }

//     try {
//       await axios.post("http://localhost:3006/posts", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Post created successfully");
//       setContent(""); // Clear the input fields
//       setMedia(null);
//       setMediaPreview(""); // Clear preview after submission
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setMedia(file); // Store the selected file in the state

//     // Create a file preview if the file is an image
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMediaPreview(reader.result); // Set preview URL for the image
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setMediaPreview(""); // Clear preview if not an image
//     }
//   };

//   // Handle click outside of emoji picker
//   const handleClickOutside = (event) => {
//     if (
//       emojiPickerRef.current &&
//       !emojiPickerRef.current.contains(event.target)
//     ) {
//       setShowEmojiPicker(false);
//     }
//   };

//   // Attach and detach event listener
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="create-post">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <textarea
//             placeholder="What's on your mind?"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={4}
//             style={{ width: "100%", padding: "10px" }}
//           />
//         </div>
//         <div
//           className="media-emoji-container"
//           style={{ marginTop: "10px", position: "relative" }}
//         >
//           {/* Media Icon */}
//           <label>
//             <AiOutlineFileImage size={25} style={{ cursor: "pointer" }} />
//             <input
//               type="file"
//               style={{ display: "none" }}
//               onChange={handleFileChange} // Handle file selection
//             />
//           </label>

//           {/* Show selected file or preview */}
//           {media && (
//             <div style={{ marginTop: "10px" }}>
//               {mediaPreview ? (
//                 <img
//                   src={mediaPreview}
//                   alt="Selected media"
//                   style={{ maxWidth: "200px", maxHeight: "200px" }}
//                 />
//               ) : (
//                 <p>Selected file: {media.name}</p>
//               )}
//             </div>
//           )}

//           {/* Emoji Picker */}
//           <BsEmojiSmile
//             size={25}
//             style={{ marginLeft: "10px", cursor: "pointer" }}
//             onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//           />
//           {showEmojiPicker && (
//             <div className="emoji-picker" ref={emojiPickerRef}>
//               {" "}
//               {/* Add this wrapper for positioning */}
//               <EmojiPicker onEmojiClick={onEmojiClick} />
//             </div>
//           )}
//         </div>
//         <button className="btn-head-post" type="submit">
//           Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

// import React, { useState, useRef, useEffect } from "react";
// import EmojiPicker from "emoji-picker-react";
// import { AiOutlineFileImage } from "react-icons/ai";
// import { BsEmojiSmile } from "react-icons/bs";
// import axios from "axios";
// import "./PostHead.css";

// const CreatePost = () => {
//   const [content, setContent] = useState("");
//   const [media, setMedia] = useState(null);
//   const [mediaPreview, setMediaPreview] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const emojiPickerRef = useRef(null);

//   // Handle Emoji selection
//   const onEmojiClick = (event, emojiObject) => {
//     console.log("Emoji Object:", emojiObject); // Debugging line

//     // Check if emojiObject and emojiObject.emoji are defined
//     if (emojiObject && emojiObject.emoji) {
//       setContent((prevContent) => prevContent + emojiObject.emoji); // Append emoji to content
//       setShowEmojiPicker(false); // Close the emoji picker after selecting
//     } else {
//       console.warn("Emoji object is undefined or does not contain an emoji.");
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("user_id", 1);
//     formData.append("content", content);

//     if (media) {
//       formData.append("media", media);
//     }

//     try {
//       await axios.post("http://localhost:3006/posts", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Post created successfully");
//       setContent("");
//       setMedia(null);
//       setMediaPreview("");
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setMedia(file);

//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMediaPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setMediaPreview("");
//     }
//   };

//   // Handle click outside of emoji picker
//   const handleClickOutside = (event) => {
//     if (
//       emojiPickerRef.current &&
//       !emojiPickerRef.current.contains(event.target)
//     ) {
//       setShowEmojiPicker(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="create-post">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <textarea
//             placeholder="What's on your mind?"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={4}
//             style={{ width: "100%", padding: "10px" }}
//           />
//         </div>
//         <div
//           className="media-emoji-container"
//           style={{ marginTop: "10px", position: "relative" }}
//         >
//           <label>
//             <AiOutlineFileImage size={25} style={{ cursor: "pointer" }} />
//             <input
//               type="file"
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//             />
//           </label>

//           {media && (
//             <div style={{ marginTop: "10px" }}>
//               {mediaPreview ? (
//                 <img
//                   src={mediaPreview}
//                   alt="Selected media"
//                   style={{ maxWidth: "200px", maxHeight: "200px" }}
//                 />
//               ) : (
//                 <p>Selected file: {media.name}</p>
//               )}
//             </div>
//           )}

//           <BsEmojiSmile
//             size={25}
//             style={{ marginLeft: "10px", cursor: "pointer" }}
//             onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//           />
//           {showEmojiPicker && (
//             <div className="emoji-picker" ref={emojiPickerRef}>
//               <EmojiPicker onEmojiClick={onEmojiClick} />
//             </div>
//           )}
//         </div>
//         <button className="btn-head-post" type="submit">
//           Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

// import React, { useState, useRef, useEffect } from "react";
// import EmojiPicker from "emoji-picker-react";
// import { AiOutlineFileImage } from "react-icons/ai";
// import { BsEmojiSmile } from "react-icons/bs";
// import axios from "axios";
// import "./PostHead.css";

// const CreatePost = ({}) => {
//   const [content, setContent] = useState("");
//   const [media, setMedia] = useState(null);
//   const [mediaPreview, setMediaPreview] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const emojiPickerRef = useRef(null);

//   const onEmojiClick = (event, emojiObject) => {
//     console.log("Emoji Object:", emojiObject); // Log emojiObject to debug

//     const selectedEmoji = emojiObject?.emoji;
//     if (selectedEmoji) {
//       setContent((prevContent) => prevContent + selectedEmoji); // Append emoji to content
//       setShowEmojiPicker(false); // Close the emoji picker after selecting
//     } else {
//       console.warn("Emoji object is undefined or does not contain an emoji.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("content", content);
//     if (media) {
//       formData.append("media", media);
//     }

//     try {
//       const token = localStorage.getItem("token"); // Retrieve the token from localStorage

//       const response = await axios.post(
//         "http://localhost:3006/posts",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             // Authorization: `Bearer ${token}`, // Include the token in the request
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert("Post created successfully");
//       setContent("");
//       setMedia(null);
//       setMediaPreview("");
//     } catch (error) {
//       console.error("Error creating post:", error);
//       alert(
//         error.response?.data?.error ||
//           "An error occurred while creating the post."
//       );
//     }
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setMedia(file);

//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMediaPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setMediaPreview("");
//     }
//   };

//   // Handle click outside of emoji picker
//   const handleClickOutside = (event) => {
//     if (
//       emojiPickerRef.current &&
//       !emojiPickerRef.current.contains(event.target)
//     ) {
//       setShowEmojiPicker(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="create-post">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <textarea
//             className="post-head-textarea"
//             placeholder="What's on your mind?"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={4}
//             style={{ width: "100%", padding: "10px" }}
//           />
//         </div>
//         <div className="media-emoji-container" style={{ position: "relative" }}>
//           <div className="left-btn">
//             <div className="btn file-btn">
//               <label>
//                 <AiOutlineFileImage size={25} style={{ cursor: "pointer" }} />
//                 <input
//                   type="file"
//                   style={{ display: "none" }}
//                   onChange={handleFileChange}
//                 />
//               </label>
//             </div>
//             {/* <div className="media-emoji-button"> */}

//             {media && (
//               <div style={{ marginTop: "10px" }}>
//                 {mediaPreview ? (
//                   <img
//                     src={mediaPreview}
//                     alt="Selected media"
//                     style={{ maxWidth: "200px", maxHeight: "200px" }}
//                   />
//                 ) : (
//                   <p>Selected file: {media.name}</p>
//                 )}
//               </div>
//             )}
//             <div className="emoji btn">
//               <BsEmojiSmile
//                 size={25}
//                 style={{ marginLeft: "10px", cursor: "pointer" }}
//                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//               />

//               {showEmojiPicker && (
//                 <div className="emoji-picker btn" ref={emojiPickerRef}>
//                   <EmojiPicker
//                     onEmojiClick={onEmojiClick} // Correctly wired up here
//                     height={400}
//                     width={300}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           <button className="btn-head-post btn" type="submit">
//             Post
//           </button>
//         </div>
//         {/* </div> */}
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { AiOutlineFileImage } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import axios from "axios";
import "./PostHead.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = ({ user, onNewPost }) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [posts, setPosts] = useState([]); // Initial state is an array
  const [loading, setLoading] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    const selectedEmoji = emojiObject?.emoji;
    if (selectedEmoji) {
      setContent((prevContent) => prevContent + selectedEmoji);
      setShowEmojiPicker(false);
    } else {
      console.warn("Emoji object is undefined or does not contain an emoji.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Ensure user is authenticated
  //   if (!user) {
  //     alert("You must be logged in to create a post.");
  //     return;
  //   }

  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     alert("You must be logged in to create a post.");
  //     return;
  //   }

  //   // Prepare the form data
  //   const formData = new FormData();
  //   formData.append("content", content);
  //   formData.append("user_id", user.user_id); // Add user ID for the post

  //   if (!media) {
  //     alert("vous n'avez pas rempli le champs de publication");
  //   } else {
  //     formData.append("media", media); // Add media if available
  //   }
  //   try {
  //     // Make the POST request
  //     const response = await axios.post(
  //       "http://localhost:3006/posts", // Endpoint for creating posts
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data", // Required for file uploads
  //           Authorization: `Bearer ${token}`, // Bearer token for authorization
  //         },
  //       }
  //     );

  //     // Handle successful post creation
  //     alert("Post created successfully!");
  //     setContent(""); // Clear content input
  //     setMedia(null); // Clear media
  //     setMediaPreview(""); // Clear media preview
  //   } catch (error) {
  //     console.error("Error creating post:", error);

  //     // Handle error response from the backend
  //     if (error.response) {
  //       console.error("Error response status:", error.response.status);
  //       console.error("Response Error Data:", error.response.data);

  //       if (error.response.status === 403) {
  //         if (
  //           error.response.data.message ===
  //           "Forbidden (Invalid or expired token)"
  //         ) {
  //           alert("Your session has expired. Please log in again.");
  //           // Optionally, redirect to the login page
  //           window.location.href = "/signin"; // Or use a routing library like react-router
  //         } else {
  //           alert(
  //             "An error occurred: " + error.response?.data?.error ||
  //               "Please try again."
  //           );
  //         }
  //       } else {
  //         alert(
  //           "An error occurred: " + error.response?.data?.error ||
  //             "Please try again."
  //         );
  //       }
  //     } else {
  //       // Network error or other issues
  //       alert("Network error: Unable to create post.");
  //     }
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Ensure user is authenticated
  //   if (!user) {
  //     toast.error("You must be logged in to create a post.");
  //     return;
  //   }

  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     toast.error("You must be logged in to create a post.");
  //     return;
  //   }

  //   if (!content && !media) {
  //     toast.warning("Please provide content or media for your post.");
  //     return;
  //   }

  //   // Prepare the form data
  //   const formData = new FormData();
  //   formData.append("content", content);
  //   formData.append("user_id", user.user_id); // Add user ID for the post
  //   if (media) {
  //     formData.append("media", media); // Add media if available
  //   }

  //   try {
  //     setLoading(true); // Show loading spinner
  //     // Make the POST request
  //     const response = await axios.post(
  //       "http://localhost:3006/posts", // Endpoint for creating posts
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data", // Required for file uploads
  //           Authorization: `Bearer ${token}`, // Bearer token for authorization
  //         },
  //       }
  //     );

  //     // Handle successful post creation
  //     toast.success("Post created successfully!");

  //     // Add the new post to the list without refreshing
  //     const newPost = response.data;
  //     // setPosts((prevPosts) => [newPost, ...prevPosts]);
  //     setPosts((prevPosts) =>
  //       Array.isArray(prevPosts) ? [newPost, ...prevPosts] : [newPost]
  //     );

  //     // Reset the form
  //     setContent(""); // Clear content input
  //     setMedia(null); // Clear media
  //     setMediaPreview(""); // Clear media preview
  //   } catch (error) {
  //     console.error("Error creating post:", error);

  //     // Handle error response from the backend
  //     if (error.response) {
  //       if (error.response.status === 403) {
  //         if (
  //           error.response.data.message ===
  //           "Forbidden (Invalid or expired token)"
  //         ) {
  //           toast.error("Your session has expired. Please log in again.");
  //           // Optionally, redirect to the login page
  //           window.location.href = "/signin"; // Or use a routing library like react-router
  //         } else {
  //           toast.error(
  //             error.response?.data?.error ||
  //               "An error occurred. Please try again."
  //           );
  //         }
  //       } else {
  //         toast.error(
  //           error.response?.data?.error ||
  //             "An error occurred. Please try again."
  //         );
  //       }
  //     } else {
  //       // Network error or other issues
  //       toast.error("Network error: Unable to create post.");
  //     }
  //   } finally {
  //     setLoading(false); // Hide loading spinner
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create a post.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create a post.");
      return;
    }

    if (!content && !media) {
      toast.warning("Please provide content or media for your post.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("user_id", user.user_id);
    if (media) {
      formData.append("media", media);
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3006/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newPost = response.data;

      // Call the onNewPost function to update posts in MiddleSide
      if (onNewPost) {
        onNewPost(newPost);
      }

      toast.success("Post created successfully!");
      setContent("");
      setMedia(null);
      setMediaPreview("");
    } catch (error) {
      console.error("Error creating post:", error);

      if (error.response) {
        if (error.response.status === 403) {
          toast.error("Your session has expired. Please log in again.");
          window.location.href = "/signin";
        } else {
          toast.error(
            error.response.data?.error || "An error occurred. Please try again."
          );
        }
      } else {
        toast.error("Network error: Unable to create post.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setMediaPreview("");
    }
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="create-post">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className="post-head-textarea"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div className="media-emoji-container" style={{ position: "relative" }}>
          <div className="left-btn">
            <div className="btn file-btn">
              <label>
                <AiOutlineFileImage size={25} style={{ cursor: "pointer" }} />
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {media && (
              <div style={{ marginTop: "10px" }}>
                {mediaPreview ? (
                  <img
                    src={mediaPreview}
                    alt="Selected media"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                ) : (
                  <p>Selected file: {media.name}</p>
                )}
              </div>
            )}

            <div className="emoji btn">
              <BsEmojiSmile
                size={25}
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />

              {showEmojiPicker && (
                <div className="emoji-picker btn" ref={emojiPickerRef}>
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    height={400}
                    width={300}
                  />
                </div>
              )}
            </div>
          </div>

          <button
            className="btn-head-post btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
