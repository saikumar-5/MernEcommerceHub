import { SiReact, SiNodedotjs, SiMongodb, SiJavascript, SiPython } from "react-icons/si";
import { Cloud } from "lucide-react";

export const SKILLS = [
  {
    name: "React.js",
    icon: <SiReact />,
    color: "text-blue-500",
  },
  {
    name: "Node.js", 
    icon: <SiNodedotjs />,
    color: "text-green-500",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb />,
    color: "text-green-600",
  },
  {
    name: "JavaScript",
    icon: <SiJavascript />,
    color: "text-yellow-500",
  },
  {
    name: "Python",
    icon: <SiPython />,
    color: "text-blue-400",
  },
  {
    name: "AWS",
    icon: <Cloud />,
    color: "text-orange-500",
  },
];
