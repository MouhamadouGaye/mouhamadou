// import React from "react";
// import "./Page.css";
// import TopHeader from "../components/top/TopHeader";
// import LeftSide from "../components/left/LeftSide";
// import MiddleSide from "../components/middle/MiddleSide";
// import RightSide from "../components/right/RightSide";

// const Page = () => {
//   return (
//     <div className="container">
//       <TopHeader />
//       <LeftSide />
//       <MiddleSide />
//       <RightSide />
//     </div>
//   );
// };

// export default Page;

import React from "react";
import "./Page.css";
import TopHeader from "../components/top/TopHeader";
import LeftSide from "../components/left/LeftSide";
import MiddleSide from "../components/middle/MiddleSide";
import RightSide from "../components/right/RightSide";

const Page = ({ user, posts, interactions, onSignOut }) => {
  return (
    <div className="container">
      {/* Pass user and sign-out functionality to the header */}
      <TopHeader user={user} onSignOut={onSignOut} />

      {/* Left side: Can display user-related info */}
      <LeftSide user={user} />

      {/* Middle side: Main area to display posts */}
      <MiddleSide user={user} posts={posts} interactions={interactions} />

      {/* Right side: Additional content like trending topics or suggestions */}
      <RightSide user={user} />
    </div>
  );
};

export default Page;
