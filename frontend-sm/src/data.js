import { HiHome } from "react-icons/hi2";
import { IoMdSearch } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { CgMoreR } from "react-icons/cg";
import hawa from "./assets/images/hawa.png";

//Icons for the Posts like, comments, forshare
import { GiSelfLove } from "react-icons/gi";
import { PiShareFatLight } from "react-icons/pi";
import { SlDislike } from "react-icons/sl";
import { SlLike } from "react-icons/sl";
import { BiMessageRounded } from "react-icons/bi";
//search Icon // searchIcon
import { TfiSearch } from "react-icons/tfi";

const homeIcone = <HiHome />;
const searchIcon = <IoMdSearch />;
const notifs = <MdNotificationsActive />;
const communityIcon = <BsFillPeopleFill />;
const message = <TiMessages />;
const profileIcon = <CgProfile />;
const more = <CgMoreR />;

export default hawa;
export const leftSide = [
  { name: "Home", icons: homeIcone },
  { name: "Search", icons: searchIcon },
  { name: "Notifications", icons: notifs },
  { name: "Communities", icons: communityIcon },
  { name: "Messages", icons: message },
  { name: "Profile", icons: profileIcon },
  { name: "More", icons: more },
];

const like = <GiSelfLove />;
const comments = <BiMessageRounded />;
const share = <PiShareFatLight />;
const dislike = <SlDislike />;
const thumb = <SlLike />;

export const searchIconTop = <TfiSearch />;

export const Icons = [like, comments, thumb, dislike, share];

export const PostIcons = [
  { name: "like", element: <GiSelfLove /> },
  { name: "thumbUp", element: <SlLike /> },
  {
    name: "comments",
    element: <BiMessageRounded />,
  },
  { name: "dislike", element: <SlDislike /> },
  { name: "share", element: <PiShareFatLight /> },
];
