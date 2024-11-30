// // eventEmitter.js
// import { EventEmitter } from "events";

// const eventEmitter = new EventEmitter();

// export default eventEmitter;

// //  useEffect(() => {
//     fetchData();

//     // Listen for the postCreated event
//     const handleNewPost = (newPost) => {
//       setPosts((prevPosts) => [newPost, ...prevPosts]);
//     };

//     eventEmitter.on("postCreated", handleNewPost);

//     // Clean up the event listener
//     return () => {
//       eventEmitter.off("postCreated", handleNewPost);
//     };
//   }, []);
