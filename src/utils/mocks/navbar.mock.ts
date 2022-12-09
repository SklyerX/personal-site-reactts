import { config } from "../config";

export const MockNav = [
  {
    id: 1,
    href: "/",
    name: "main",
  },
  {
    id: 2,
    href: "/blogs",
    name: "blogs",
  },
  {
    id: 3,
    href: "/projects",
    name: "projects",
  },
  {
    id: 4,
    href: "/repos",
    name: "repos",
  },
  {
    id: 5,
    href: `mailto:${config.urls.contactMail}`,
    name: "contact",
  },
];
