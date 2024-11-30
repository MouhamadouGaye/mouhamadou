// import React from "react";
// import "./LeftSide.css";
// import { leftSide } from "../../data";

// const LeftSide = () => {
//   return (
//     <div className="left">
//       <ul className="left-menu">
//         {leftSide.map((item, index) => (
//           <li key={index} className="left-menu-item">
//             <a href={`#${item.name.toLowerCase()}`} className="left-menu-link">
//               <span>{item.icons} </span>
//               <span> {item.name}</span>
//             </a>
//           </li>
//         ))}
//       </ul>
//       <button>Create a Post</button>
//     </div>
//   );
// };

// export default LeftSide;
import "./LeftSide.css";
import React, { useState } from "react";
import { leftSide } from "../../data";
import PostModal from "../modals/PostModal";

const LeftSide = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="left">
      <ul className="left-menu">
        {leftSide.map((item, index) => (
          <li key={index} className="left-menu-item">
            <a href={`#${item.name.toLowerCase()}`} className="left-menu-link">
              <span className="menu-icon">{item.icons} </span>
              <span className="item-name"> {item.name}</span>
            </a>
          </li>
        ))}
      </ul>
      <div onClick={openModal}>
        <button className="create-post-button">Create a Post</button>
        <button className="post-button">Post</button>
      </div>

      {/* Render the PostModal if isModalOpen is true */}
      {isModalOpen && <PostModal closeModal={closeModal} user={user} />}
    </div>
  );
};

export default LeftSide;
