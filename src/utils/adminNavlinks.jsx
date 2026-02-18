import { AiFillProduct } from "react-icons/ai";
import { ImBlog } from "react-icons/im";
import { MdDashboardCustomize, MdCelebration } from "react-icons/md";

export const adminNavLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    urlword: "dashboard",
    icon: <MdDashboardCustomize />,
  },
  {
    id: 2,
    name: "Products",
    path: "/products",
    urlword: "products",
    icon: <AiFillProduct />,
  },

  {
    id: 6,
    name: "Blogs",
    path: "/blogs",
    urlword: "blogs",
    icon: <ImBlog />,
  },
  {
    id: 10,
    name: "Events",
    path: "/events",
    urlword: "events",
    icon: <MdCelebration />,
  },
];
