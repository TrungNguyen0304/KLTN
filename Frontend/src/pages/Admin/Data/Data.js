// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilMapMarker,
  UilCamera,
  UilClock,
  UilHistory,
  UilSuitcase
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";

// Recent Card Imports
import img1 from "../../../assets/admin/imgs/img1.png";
import img2 from "../../../assets/admin/imgs/img2.png";
import img3 from "../../../assets/admin/imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Trang chủ",
    Link: "/admin"
  },
  {
    icon: UilMapMarker,
    heading: "Điểm đến",
    Link: "/destination",
  },
  {
    icon: UilUsersAlt,
    heading: "Người dùng",
    Link: "/user",
  },
  {
    icon: UilMapMarker,
    heading: "Địa chỉ",
    Link: "/location",
  },
  {
    icon: UilSuitcase,
    heading: "Tour",
    Link: "/tour",
  },
  {
    icon: UilClock,
    heading: "Thời gian",
    Link: "/duration"
  },
  {
    icon: UilCamera,
    heading: "Thư viện ảnh",
    Link: "/gallerys"
  },
  {
    icon: UilHistory,
    heading: "Lịch sử",
    Link: "/booking"
  },
];

export const SidebarGuideData = [
  {
    icon: UilEstate,
    heading: "Trang chủ",
    Link: "/Indextourguide"
  },
  {
    icon: UilClipboardAlt,
    heading: "Lịch hướng dẫn viên",
    Link: "/IndexShowall",
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
