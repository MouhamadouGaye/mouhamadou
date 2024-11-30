// import React, { useState } from "react";
// import "./PostModal.css";
// import { AiOutlineFileImage } from "react-icons/ai";

// const PostModal = ({ closeModal }) => {
//   const [postContent, setPostContent] = useState("");
//   const [postMedia, setPostMedia] = useState([]);

//   const handleInputChange = (event) => {
//     setPostContent(event.target.value);
//   };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     setPostMedia((prevMedia) => [...prevMedia, ...files]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("content", postContent);
//     postMedia.forEach((file, index) => {
//       formData.append("media", file); // Keep this as "media" to match the server-side multer array name
//     });

//     try {
//       const response = await fetch("http://localhost:3006/posts", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("Post submitted successfully");
//         closeModal();
//       } else {
//         console.error("Failed to submit post");
//       }
//     } catch (error) {
//       console.error("Error submitting post:", error);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button onClick={closeModal} className="close-modal-button">
//           X
//         </button>
//         <h2>Create a New Post</h2>
//         <form onSubmit={handleSubmit}>
//           <textarea
//             name="content"
//             value={postContent}
//             onChange={handleInputChange}
//             placeholder="What's on your mind?"
//             className="post-input"
//             required
//           />
//           <div className="form-post">
//             <AiOutlineFileImage size={35} style={{ cursor: "pointer" }} />
//             <input
//               type="file"
//               accept="image/*,video/*"
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//               className="file-input"
//               multiple
//             />

//             <button type="submit" className="submit-post-button">
//               Post
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostModal;

// LE CODE D'EN HAUT MARCHE PARFAITEMENT MAIS JE VEUX CHANGER
// LE FORMAT DE L'URL POUR POUVOIR LE MANIPULER

// BELOW IS THE UPDATE OF MY MODAL

// import React, { useState, useRef, useEffect } from "react";
// import "./PostModal.css";
// import axios from "axios";
// import { AiOutlineFileImage } from "react-icons/ai";
// import { BsEmojiSmile } from "react-icons/bs"; // Emoji Icon
// import EmojiPicker from "emoji-picker-react"; // Import emoji picker

// const PostModal = ({ closeModal, user }) => {
//   // const [postContent, setPostContent] = useState("");
//   // const [postMedia, setPostMedia] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [content, setContent] = useState("");
//   const [media, setMedia] = useState([]);
//   const [mediaPreview, setMediaPreview] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker
//   const emojiPickerRef = useRef(null); // Reference to emoji picker

//   const handleInputChange = (event) => {
//     setContent(event.target.value);
//   };

//   // const handleFileChange = (event) => {
//   //   const files = Array.from(event.target.files);
//   //   setMedia((prev) => [...prev, ...files]);
//   // };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     setMedia((prev) => [...prev, ...files]);

//     // Optional: Generate previews
//     const previews = files.map((file) => URL.createObjectURL(file));
//     setMediaPreview((prev) => [...prev, ...previews]);
//   };

//   const handleEmojiClick = (event, emojiObject) => {
//     // Append the selected emoji to the content
//     if (emojiObject && emojiObject.emoji) {
//       content((prevContent) => prevContent + emojiObject.emoji);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure user is authenticated
//     if (!user) {
//       alert("You must be logged in to create a post.");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must be logged in to create a post.");
//       return;
//     }

//     // Prepare the form data
//     const formData = new FormData();
//     formData.append("content", content);
//     formData.append("user_id", user.user_id); // Add user ID for the post
//     if (media && media.length > 0) {
//       // formData.append("media", media); // Add media if available
//       media.forEach((file) => formData.append("media", file)); // Append all files
//     }

//     setLoading(true); // Start loading

//     try {
//       // Make the POST request
//       const response = await axios.post(
//         "http://localhost:3006/posts", // Endpoint for creating posts
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Required for file uploads
//             Authorization: `Bearer ${token}`, // Bearer token for authorization
//           },
//         }
//       );

//       // Handle successful post creation
//       alert("Post created successfully!");
//       setContent(""); // Clear content input
//       setMedia([]); // Clear media
//       setMediaPreview([]); // Clear media preview
//     } catch (error) {
//       console.error("Error creating post:", error);

//       // Handle error response from the backend
//       if (error.response) {
//         console.error("Error response status:", error.response.status);
//         console.error("Response Error Data:", error.response.data);

//         if (error.response.status === 403) {
//           if (
//             error.response.data.message ===
//             "Forbidden (Invalid or expired token)"
//           ) {
//             alert("Your session has expired. Please log in again.");
//             // Optionally, redirect to the login page
//             window.location.href = "/signin"; // Or use a routing library like react-router
//           } else {
//             alert(
//               "An error occurred: " + error.response?.data?.error ||
//                 "Please try again."
//             );
//           }
//         } else {
//           alert(
//             "An error occurred: " + error.response?.data?.error ||
//               "Please try again."
//           );
//         }
//       } else {
//         // Network error or other issues
//         alert("Network error: Unable to create post.");
//       }
//     }
//   };

//   // Close emoji picker when clicking outside
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
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button onClick={closeModal} className="close-modal-button">
//           X
//         </button>
//         <h2 className="create-post-title">Create a New Post</h2>
//         <form onSubmit={handleSubmit}>
//           <textarea
//             name="content"
//             value={content}
//             onChange={handleInputChange}
//             placeholder="What's on your mind?"
//             className="post-input"
//             required
//           />

//           <div className="form-post">
//             <div className="post-modal-icon">
//               <label>
//                 <AiOutlineFileImage size={30} style={{ cursor: "pointer" }} />
//                 <input
//                   type="file"
//                   accept="image/*,video/*"
//                   style={{ display: "none" }}
//                   onChange={handleFileChange}
//                   className="file-input"
//                   multiple
//                 />
//               </label>

//               {/* Emoji Icon */}

//               <BsEmojiSmile
//                 size={30}
//                 style={{ cursor: "pointer", marginLeft: "10px" }}
//                 onClick={() => setShowEmojiPicker((prev) => !prev)}
//               />

//               {/* Emoji Picker */}
//               {showEmojiPicker && (
//                 <div
//                   ref={emojiPickerRef}
//                   style={{ position: "absolute", zIndex: 1000 }}
//                 >
//                   <EmojiPicker onEmojiClick={handleEmojiClick} />
//                 </div>
//               )}
//             </div>
//             <div>
//               <button type="submit" className="submit-post-button">
//                 Post
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostModal;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { AiOutlineFileImage } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs"; // Emoji Icon
import EmojiPicker from "emoji-picker-react"; // Import emoji picker
import "./PostModal.css";

const PostModal = ({ closeModal, user }) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [mediaPreview, setMediaPreview] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker
  const emojiPickerRef = useRef(null); // Reference to emoji picker

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setMedia((prev) => [...prev, ...files]);
  };

  const handleEmojiClick = (event, emojiObject) => {
    if (emojiObject && emojiObject.emoji) {
      setContent((prevContent) => prevContent + emojiObject.emoji);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure user is authenticated
    if (!user) {
      alert("You must be logged in to create a post.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a post.");
      return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append("content", content);
    formData.append("user_id", user.user_id); // Add user ID for the post
    if (media && media.length > 0) {
      media.forEach((file) => formData.append("media", file)); // Append all files
    }

    setLoading(true); // Start loading

    try {
      // Make the POST request
      const response = await axios.post(
        "http://localhost:3006/posts", // Endpoint for creating posts
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
            Authorization: `Bearer ${token}`, // Bearer token for authorization
          },
        }
      );
      if (response.data)
        // Handle successful post creation
        alert("Post created successfully!");

      // Reset fields
      setContent(""); // Clear content input
      setMedia([]); // Clear media
      setMediaPreview(""); // Clear media preview
      closeModal(); // Close the modal after successful post
    } catch (error) {
      console.error("Error creating post:", error);

      // Handle error response from the backend
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Response Error Data:", error.response.data);

        if (error.response.status === 403) {
          if (
            error.response.data.message ===
            "Forbidden (Invalid or expired token)"
          ) {
            alert("Your session has expired. Please log in again.");
            window.location.href = "/signin"; // Optionally, redirect to the login page
          } else {
            alert(
              "An error occurred: " +
                (error.response?.data?.error || "Please try again.")
            );
          }
        } else {
          alert(
            "*An error occurred: " +
              (error.response?.data?.error || "Please try again.")
          );
        }
      } else {
        // Network error or other issues
        alert("Network error: Unable to create post.");
      }
    } finally {
      setLoading(false); // Stop loading after the request completes (success or failure)
    }
  };

  // Close emoji picker when clicking outside
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
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={closeModal} className="close-modal-button">
          X
        </button>
        <h2 className="create-post-title">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            value={content}
            onChange={handleInputChange}
            placeholder="What's on your mind?"
            className="post-input"
            required
          />

          <div className="form-post">
            <div className="post-modal-icon">
              <label>
                <AiOutlineFileImage size={30} style={{ cursor: "pointer" }} />
                <input
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  className="file-input"
                  multiple
                />
              </label>

              <BsEmojiSmile
                size={30}
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              />

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  style={{ position: "absolute", zIndex: 1000 }}
                >
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="submit-post-button"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </form>
        {/* Display a loading spinner when posting */}
        {loading && <div className="loader">Posting...</div>}
      </div>
    </div>
  );
};

export default PostModal;
