// import React, { useState } from "react";
// import "./TopHeader.css";
// import { FaRegBell } from "react-icons/fa6";
// import { FaRegEnvelope } from "react-icons/fa6";
// import { BsChatRightDots } from "react-icons/bs";
// import { BsPlusSquareDotted } from "react-icons/bs";
// import { PiSignOutBold } from "react-icons/pi";

// import hawa from "../../data";
// import SignOut from "../auth/SignOut";

// const TopHeader = ({ user }) => {
//   const [isShown, setIsShown] = useState();
//   return (
//     <div className="top">
//       <div className="top-header">
//         {/* Left Side - Logo */}
//         <div className="left-side">
//           <h1 className="logo">MG'</h1>
//         </div>

//         {/* Middle - Search Bar */}
//         <div className="middle-side">
//           <input type="text" className="search-bar" placeholder=" Recherche" />
//         </div>

//         {/* Right Side - Profile, Notifications, Messages, Menu */}
//         <div className="right-side">
//           <div className="icon">
//             <FaRegBell />
//           </div>
//           <div className="icon">
//             <FaRegEnvelope />
//           </div>
//           <div className="icon">
//             <BsChatRightDots />
//           </div>
//           <div className="profile">
//             <img src={hawa} alt="Profile" className="profile-pic" />
//             <p>{user}</p>
//             <span className="profile-name"></span>
//           </div>
//           <div className="icon">
//             <BsPlusSquareDotted onClick={() => setIsShown(!isShown)} />

//             {isShown ? (
//               <a href="/signin">
//                 {" "}
//                 <PiSignOutBold path="/signin" element={<SignOut />} />{" "}
//               </a>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopHeader;

// import React, { useState } from "react";
// import "./TopHeader.css";
// import { BsSearch } from "react-icons/bs";
// import { FaRegBell } from "react-icons/fa6";
// import { FaRegEnvelope } from "react-icons/fa6";
// import { BsChatRightDots } from "react-icons/bs";
// import { BsPlusSquareDotted } from "react-icons/bs";
// import { PiSignOutBold } from "react-icons/pi";
// import SignOut from "../auth/SignOut";

// const TopHeader = ({ user }) => {
//   const [isShown, setIsShown] = useState(false);

//   return (
//     <div className="top">
//       <div className="top-header">
//         {/* Left Side - Logo */}
//         <div className="left-side">
//           <h1 className="logo">MG'</h1>
//         </div>

//         {/* Middle - Search Bar */}
//         <div className="middle-side">
//           <input type="text" className="search-bar" placeholder="Recherche" />
//         </div>

//         {/* Right Side - Profile, Notifications, Messages, Menu */}
//         <div className="right-side">
//           <div className="icon">
//             <FaRegEnvelope />
//           </div>
//           <div className="icon">
//             <BsChatRightDots />
//           </div>
//           <div className="profile">
//             <img
//               src={
//                 `http://localhost:3006/${user?.profilePhoto}` ||
//                 "/default-profile.png"
//               }
//               alt="Profile"
//               className="profile-pic"
//             />
//             <p>{user?.name || "Guest"}</p>
//             <span className="profile-name"></span>
//           </div>
//           <div className="icon">
//             <BsPlusSquareDotted onClick={() => setIsShown(!isShown)} />

//             {isShown && (
//               <a href="/signin">
//                 <PiSignOutBold path="/signin" element={<SignOut />} />
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopHeader;

// import React, { useState } from "react";
// import "./TopHeader.css";
// import { BsSearch } from "react-icons/bs";
// import { FaRegBell } from "react-icons/fa6";
// import { FaRegEnvelope } from "react-icons/fa6";
// import { BsChatRightDots } from "react-icons/bs";
// import { BsPlusSquareDotted } from "react-icons/bs";
// import { PiSignOutBold } from "react-icons/pi";
// import SignOut from "../auth/SignOut";

// const TopHeader = ({ user }) => {
//   const [isShown, setIsShown] = useState(false);

//   return (
//     <div className="top">
//       <div className="top-header">
//         {/* Left Side - Logo */}
//         <div className="left-side">
//           <h1 className="logo">MG'</h1>
//         </div>

//         {/* Middle - Search Bar */}
//         <div className="middle-side">
//           <input type="text" className="search-bar" placeholder="Recherche" />
//         </div>

//         {/* Right Side - Profile, Notifications, Messages, Menu */}
//         <div className="right-side">
//           <div className="icon">
//             <FaRegBell />
//           </div>
//           <div className="icon">
//             <FaRegEnvelope />
//           </div>
//           <div className="icon">
//             <BsChatRightDots />
//           </div>
//           <div className="profile">
//             {/* Display profile photo and name */}
//             <img
//               src={user?.profile_photo || "/default-profile.png"} // Fallback to default
//               alt="Profile"
//               className="profile-pic"
//             />
//             <p>{user?.name || "Guest"}</p>
//           </div>
//           <div className="icon">
//             <BsPlusSquareDotted onClick={() => setIsShown(!isShown)} />

//             {isShown && (
//               <a href="/signin">
//                 <PiSignOutBold path="/signin" element={<SignOut />} />
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopHeader;

import React, { useState } from "react";
import "./TopHeader.css";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { BsChatRightDots } from "react-icons/bs";
import { BsPlusSquareDotted } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import SignOut from "../auth/SignOut";

const TopHeader = ({ user, onSignOut }) => {
  // Added onSignOut to handle user logout
  const [isShown, setIsShown] = useState(false);
  // console.log(user?.profile_photo);

  return (
    <div className="top">
      <div className="top-header">
        {/* Left Side - Logo */}
        <div className="left-side">
          <h1 className="logo">MG'</h1>
        </div>

        {/* Middle - Search Bar */}
        <div className="middle-side">
          <input type="text" className="search-bar" placeholder="Recherche" />
          <BsSearch className="search-icon" />
        </div>

        {/* Right Side - Profile, Notifications, Messages, Menu */}
        <div className="right-side">
          <div className="icon">
            <FaRegBell />
          </div>
          <div className="icon">
            <FaRegEnvelope />
          </div>
          <div className="icon">
            <BsChatRightDots />
          </div>
          <div className="profile">
            {/* Display profile photo and name */}
            <img
              src={
                `http://localhost:3006${user?.profile_photo}` ||
                "/default-profile.png"
              } // Fallback to default profile photo
              alt="Profile"
              className="profile-pic"
            />
            <p>{user?.name || "Guest"}</p> {/* Fallback to 'Guest' */}
          </div>
          <div className="icon">
            <BsPlusSquareDotted onClick={() => setIsShown(!isShown)} />

            {isShown && (
              <div className="sign-out">
                <button onClick={onSignOut} className="sign-out-button">
                  <PiSignOutBold /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
