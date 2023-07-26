import { config } from "../config";

export const MockNav = [
  {
    href: "/",
    name: "main",
  },
  {
    href: "/blogs",
    name: "blogs",
  },
  {
    href: "/projects",
    name: "projects",
  },
  {
    href: "/repos",
    name: "repos",
  },
  {
    href: `mailto:${config.urls.contactMail}`,
    name: "contact",
  },
];
