## Description

---

This site is hosted by [Netlify](https://netlify.com). Created with [Tailwindcss](https://tailwindcss.com), [ReactJs](https://reactjs.org), [TypeScript](https://typescriptlang.org), and [Framer Motion](https://framer.com/motion)

---

## Installation

```
$ yarn install
```

---

## Steps

---

- download the backend from the repo [https://github.com/SklyerX/personal-site-api](https://github.com/SklyerX/personal-site-api)

- rename `exmample.env` to `.env` and fill in the values

- visit `/src/utils/config.ts` and fill in the values

```ts
export const config = {
  urls: {
    api: "LINK TO API LOCAL OR HOSTED",
    github: "YOUR GITHUB PROFILE",
    contactMail: "CONTACT MAIL",
  },
  names: {
    githubUsername: "GITHUB USERNAME",
    developerName: "YOUR NAME",
  },
};
```

```
# Run locally
$ yarn dev

# Run build
$ yarn build
```

---

## Support

If you wish to support the project `star` the repo and or `fork` it and make some changes to this site
