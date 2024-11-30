// import React, { useEffect, useState } from "react";
// import MediaPost from "./media/MediaPost";
// import PostHead from "./posthead/PostHead.jsx";
// import hawa from "../../data";

// const MiddleSide = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // Add error state

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     try {
//       const response = await fetch("http://localhost:3006/posts");
//       const contentType = response.headers.get("content-type");

//       if (contentType && contentType.includes("application/json")) {
//         const data = await response.json();

//         // Check if data is an array, if not, handle it
//         // if (!Array.isArray(data)) {
//         //   throw new Error("Data is not an array");
//         // }

//         // Parse the media field for each post
//         const updatedPosts = data.map((post) => ({
//           ...post,
//           media: post.media
//             ? JSON.parse(post.media).map((media, index) => {
//                 // Get file extension to determine if it's an image or video
//                 const extension = media.split(".").pop().toLowerCase();

//                 let type;
//                 if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
//                   type = "image";
//                 } else if (["mp4", "avi", "mov", "mkv"].includes(extension)) {
//                   type = "video";
//                 } else {
//                   type = "unknown"; // Handle any unsupported media types
//                 }

//                 return {
//                   url: `http://localhost:3006${media}`,
//                   type: type,
//                   id: `${post.post_id}-${index}`, // Ensure a unique ID per media item
//                 };
//               })
//             : [], // Default to an empty array if media is null or invalid
//         }));

//         console.log(updatedPosts.map((post) => console.log(post)));
//         setPosts(updatedPosts);
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.message); // Set error message in case of failure
//     } finally {
//       setLoading(false); // Set loading to false when request completes
//     }
//   }

//   // Render UI based on loading and error states
//   if (loading) {
//     return <p>Loading posts...</p>;
//   }

//   if (error) {
//     return <p>Error loading posts: {error}</p>;
//   }

//   return (
//     <div className="middle">
//       <PostHead />
//       {posts && posts.length > 0 ? (
//         posts.map((post) => (
//           <MediaPost
//             key={post.post_id}
//             post_id={post?.post_id} // Use post_id as a unique key for each post
//             content={post?.content}
//             media={post?.media || []} // Ensure media is always an array
//             author={{
//               name: "Hawa Massina",
//               pseudo: "hawamassina",
//               profilePhoto: hawa,
//             }}
//             date={new Date(post?.created_at).toLocaleDateString()}
//           />
//         ))
//       ) : (
//         <p>No posts available</p> // Handle the case where no posts are returned
//       )}
//     </div>
//   );
// };

// export default MiddleSide;

// THE ABOVE CODE WORK PERFECTLY FINE

// import React, { useEffect, useState } from "react";
// import MediaPost from "./media/MediaPost";
// import PostHead from "./posthead/PostHead.jsx";

// const MiddleSide = ({ user }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     try {
//       const response = await fetch("http://localhost:3006/posts");
//       const contentType = response.headers.get("content-type");

//       if (contentType && contentType.includes("application/json")) {
//         const data = await response.json();

//         // Parse the media field for each post
//         const updatedPosts = data.map((post) => ({
//           ...post,
//           media: post.media
//             ? JSON.parse(post.media).map((media, index) => {
//                 const extension = media.split(".").pop().toLowerCase();
//                 let type;

//                 if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
//                   type = "image";
//                 } else if (["mp4", "avi", "mov", "mkv"].includes(extension)) {
//                   type = "video";
//                 } else {
//                   type = "unknown"; // Handle unsupported media types
//                 }

//                 return {
//                   url: `http://localhost:3006${media}`,
//                   type: type,
//                   id: `${post.post_id}-${index}`, // Ensure unique ID per media item
//                 };
//               })
//             : [], // Default to empty array if no media
//         }));

//         setPosts(updatedPosts);
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) {
//     return <p>Loading posts...</p>;
//   }

//   if (error) {
//     return <p>Error loading posts: {error}</p>;
//   }

//   return (
//     <div className="middle">
//       <PostHead />
//       {posts && posts.length > 0 ? (
//         posts.map((post) => (
//           <MediaPost
//             key={post.post_id}
//             post_id={post?.post_id}
//             content={post?.content}
//             media={post?.media || []} // Ensure media is always an array
//             author={{
//               name: post?.name || "Unknown User", // Use name from the post data
//               pseudo: post?.pseudo || "anonymous", // Use pseudo from the post data
//               profilePhoto: post?.profile_photo
//                 ? `http://localhost:3006${post.profile_photo}` // Dynamic profile photo URL
//                 : "/path/to/default/photo.jpg", // Provide a default if no profile photo
//             }}
//             date={new Date(post?.created_at).toLocaleDateString()}
//             user={user}
//           />
//         ))
//       ) : (
//         <p>No posts available</p>
//       )}
//     </div>
//   );
// };

// export default MiddleSide;

// import React, { useEffect, useState } from "react";
// import MediaPost from "./media/MediaPost";
// import PostHead from "./posthead/PostHead.jsx";

// const MiddleSide = ({ user }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     try {
//       const response = await fetch("http://localhost:3006/posts");
//       const contentType = response.headers.get("content-type");

//       if (contentType && contentType.includes("application/json")) {
//         const data = await response.json();

//         const updatedPosts = data.map((post) => ({
//           ...post,
//           media: post.media
//             ? JSON.parse(post.media).map((media, index) => {
//                 const extension = media.split(".").pop().toLowerCase();
//                 let type;

//                 if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
//                   type = "image";
//                 } else if (["mp4", "avi", "mov", "mkv"].includes(extension)) {
//                   type = "video";
//                 } else {
//                   type = "unknown";
//                 }

//                 return {
//                   url: `http://localhost:3006${media}`,
//                   type: type,
//                   id: `${post.post_id}-${index}`,
//                 };
//               })
//             : [],
//         }));

//         setPosts(updatedPosts);
//         console.log(posts);
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) {
//     return <p>Loading posts...</p>;
//   }

//   if (error) {
//     return <p>Error loading posts: {error}</p>;
//   }

//   return (
//     <div className="middle">
//       {/* Optional: Display user-specific actions or info */}
//       {user && (
//         <PostHead
//           user={{
//             name: user.name,
//             pseudo: user.pseudo,
//             profile_photo: user.profile_photo
//               ? `http://localhost:3006/uploads/${user.profile_photo}`
//               : "/path/to/default/photo.jpg",
//           }}
//         />
//       )}

//       {/* Render posts */}
//       {posts && posts.length > 0 ? (
//         posts.map((post) => (
//           <MediaPost
//             key={post.post_id}
//             post_id={post.post_id}
//             content={post.content}
//             media={post.media || []}
//             author={{
//               name: post.name, // Use the name of the author for this post
//               pseudo: post.pseudo,
//               profile_photo: post.profile_photo
//                 ? `http://localhost:3006/uploads/${post.profile_photo}`
//                 : "/uploads/image1.jpg",
//             }}
//             date={new Date(post.created_at).toLocaleDateString()}
//             user={user}
//           />
//         ))
//       ) : (
//         <p>No posts available</p>
//       )}
//     </div>
//   );
// };

// export default MiddleSide;

// import React, { useEffect, useState } from "react";
// import MediaPost from "./media/MediaPost";
// import PostHead from "./posthead/PostHead";

// const MiddleSide = ({ user }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     try {
//       const response = await fetch("http://localhost:3006/posts");
//       const contentType = response.headers.get("content-type");

//       if (contentType && contentType.includes("application/json")) {
//         const data = await response.json();

//         const updatedPosts = data.map((post) => ({
//           ...post,
//           media: post.media
//             ? JSON.parse(post.media).map((media, index) => {
//                 const extension = media.split(".").pop().toLowerCase();
//                 let type;

//                 if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
//                   type = "image";
//                 } else if (["mp4", "avi", "mov", "mkv"].includes(extension)) {
//                   type = "video";
//                 } else {
//                   type = "unknown";
//                 }

//                 return {
//                   url: `http://localhost:3006${media}`,
//                   type: type,
//                   id: `${post.post_id}-${index}`,
//                 };
//               })
//             : [],
//         }));

//         setPosts(updatedPosts);
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) {
//     return <p>Loading posts...</p>;
//   }

//   if (error) {
//     return <p>Error loading posts: {error}</p>;
//   }

//   return (
//     <div className="middle">
//       {/* Display user-specific actions or information */}
//       {user && (
//         <PostHead
//           user={{
//             name: user.name || "Anonymous",
//             pseudo: user.pseudo || "Guest",
//             profile_photo: user.profile_photo
//               ? `http://localhost:3006/uploads/${user.profile_photo}`
//               : "/path/to/default/photo.jpg",
//           }}
//         />
//       )}

//       {/* Render posts */}
//       {posts && posts.length > 0 ? (
//         posts.map((post) => (
//           <MediaPost
//             key={post.post_id}
//             post_id={post.post_id}
//             content={post.content}
//             media={post.media}
//             author={{
//               name: post.name || "Unknown Author",
//               pseudo: post.pseudo || "No Pseudo",
//               profile_photo: post.profile_photo
//                 ? `http://localhost:3006${post.profile_photo}`
//                 : "http://localhost:3006/1732403161387_api.png",
//             }}
//             date={
//               post.created_at
//                 ? new Date(post.created_at).toLocaleDateString()
//                 : "Unknown Date"
//             }
//             user={user} // Pass user for additional context
//           />
//         ))
//       ) : (
//         <p>No posts available</p>
//       )}
//     </div>
//   );
// };

// export default MiddleSide;

// import React, { useEffect, useState } from "react";
// import MediaPost from "./media/MediaPost";
// import PostHead from "./posthead/PostHead";

// const MiddleSide = ({ user }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     try {
//       const response = await fetch("http://localhost:3006/posts");
//       const contentType = response.headers.get("content-type");

//       if (contentType && contentType.includes("application/json")) {
//         const data = await response.json();

//         const updatedPosts = data.map((post) => ({
//           ...post,
//           media: post.media
//             ? JSON.parse(post.media).map((media, index) => {
//                 const extension = media.split(".").pop().toLowerCase();
//                 let type;

//                 if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
//                   type = "image";
//                 } else if (["mp4", "avi", "mov", "mkv"].includes(extension)) {
//                   type = "video";
//                 } else {
//                   type = "unknown";
//                 }

//                 return {
//                   url: `http://localhost:3006${media}`,
//                   type: type,
//                   id: `${post.post_id}-${index}`,
//                 };
//               })
//             : [],
//         }));

//         setPosts(updatedPosts);
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleDeletePost = (postId) => {
//     setPosts((prevPosts) =>
//       prevPosts.filter((post) => post.post_id !== postId)
//     );
//   };

//   if (loading) {
//     return <p>Loading posts...</p>;
//   }

//   if (error) {
//     return <p>Error loading posts: {error}</p>;
//   }

//   return (
//     <div className="middle">
//       {user && (
//         <PostHead
//           user={{
//             name: user.name || "Anonymous",
//             pseudo: user.pseudo || "Guest",
//             profile_photo: user.profile_photo
//               ? `http://localhost:3006/uploads/${user.profile_photo}`
//               : "/path/to/default/photo.jpg",
//           }}
//         />
//       )}

//       {posts && posts.length > 0 ? (
//         posts.map((post) => (
//           <MediaPost
//             key={post.post_id}
//             post_id={post.post_id}
//             content={post.content}
//             media={post.media}
//             author={{
//               name: post.name || "Unknown Author",
//               pseudo: post.pseudo || "No Pseudo",
//               profile_photo: post.profile_photo
//                 ? `http://localhost:3006${post.profile_photo}`
//                 : "http://localhost:3006/1732403161387_api.png",
//             }}
//             date={
//               post.created_at
//                 ? new Date(post.created_at).toLocaleDateString()
//                 : "Unknown Date"
//             }
//             user={user} // Pass user for additional context
//             onDelete={handleDeletePost} // Pass delete handler to MediaPost
//           />
//         ))
//       ) : (
//         <p>No posts available</p>
//       )}
//     </div>
//   );
// };

// export default MiddleSide;

import React, { useEffect, useState } from "react";
import MediaPost from "./media/MediaPost";
import PostHead from "./posthead/PostHead";
import { CgEditFade } from "react-icons/cg";

const MiddleSide = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3006/posts");
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        const updatedPosts = data.map((post) => ({
          ...post,
          media: post.media
            ? JSON.parse(post.media).map((media, index) => {
                const extension = media.split(".").pop().toLowerCase();
                let type;

                if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
                  type = "image";
                } else if (["mp4", "avi", "mov", "mkv"].includes(extension)) {
                  type = "video";
                } else {
                  type = "unknown";
                }

                return {
                  url: `http://localhost:3006${media}`,
                  type: type,
                  id: `${post.post_id}-${index}`,
                };
              })
            : [],
        }));

        setPosts(updatedPosts);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post_id !== postId)
    );
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error loading posts: {error}</p>;
  }

  return (
    <div className="middle">
      {user && (
        <PostHead
          user={{
            name: user.name || "Anonymous",
            pseudo: user.pseudo || "Guest",
            profile_photo: user.profile_photo
              ? `http://localhost:3006/uploads/${user.profile_photo}`
              : "/path/to/default/photo.jpg",
          }}
          onNewPost={handleNewPost} // Pass the handler
        />
      )}

      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <MediaPost
            key={post.post_id}
            post_id={post.post_id}
            content={post.content}
            media={post.media}
            author={{
              name: post.name || "Unknown Author",
              pseudo: post.pseudo || "No Pseudo",
              profile_photo: post.profile_photo
                ? `http://localhost:3006${post.profile_photo}`
                : "http://localhost:3006/1732403161387_api.png",
            }}
            date={
              post.created_at
                ? new Date(post.created_at).toLocaleDateString()
                : "Unknown Date"
            }
            user={user} // Pass user for additional context
            onDelete={handleDeletePost} // Pass delete handler to MediaPost
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default MiddleSide;
