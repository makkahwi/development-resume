import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTelegram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

export const socialLinksList = [
  {
    name: "LinkedIn",
    icon: faLinkedinIn,
    link: "https://linkedin.com/in/makkahwi/",
    label: "Connect and Empower",
    color: "#0A66C2",
  },
  {
    name: "Github",
    icon: faGithub,
    link: "https://github.com/makkahwi",
    label: "Git It, Connect",
    color: "#181717",
  },
  {
    name: "WhatsApp",
    icon: faWhatsapp,
    link: "https://wasap.my/962788424973",
    label: "Text Me Anytime",
    color: "#25D366",
  },
  {
    name: "Telegram",
    icon: faTelegram,
    link: "https://t.me/makkahwi",
    label: "Let's Tele-chat",
    color: "#0088CC",
  },
  {
    name: "Phone",
    icon: faPhone,
    link: "tel:+962788424973",
    label: "Call IF NECESSARY",
    color: "#001F3F",
  },
  {
    name: "Email",
    icon: faEnvelope,
    link: "mailto:SuhaibAhmadAi@hotmail.com",
    label: "Inbox Awaits You",
    color: "#006400",
  },
  {
    name: "Facebook",
    icon: faFacebook,
    link: "https://facebook.com/makkahwi",
    label: "Let's Chat Forever",
    color: "#1877F2",
  },
  {
    name: "Instagram",
    icon: faInstagram,
    link: "https://instagram.com/makkahwi",
    label: "Capture Life Together",
    color: "#E4405F",
  },
];

export const appTitle = "Suhaib Ahmad";
export const appDesc = "Personal Website";

export const revalidationTimer = 60 * 60 * 24 * 5; // seconds * mins * hours * days
