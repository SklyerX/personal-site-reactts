import React from "react";
import { config } from "../utils/config";

export const Footer = () => {
  return (
    <div className="w-full mt-20 flex flex-col items-center justify-center font-['Inter'] text-white pb-4 xsm:text-[1rem] text-center">
      <span>
        Made With ❤️ And ☕️ By{" "}
        <a href={`https://github.com/${config.names.githubUsername}`}>
          {config.names.developerName}
        </a>
      </span>
      <span>
        Released under the MIT license. Hosted by{" "}
        <a href="https://netlify.app">Netlify</a>
      </span>
      <span>
        Create with <a href="https://tailwindcss.com">Tailwindcss</a>,{" "}
        <a href="https://reactjs.org" target="_blank">
          React
        </a>
        ,{" "}
        <a href="https://www.typescriptlang.org" target="_blank">
          TypeScript
        </a>
        , and{" "}
        <a href="https://framer.com/motion" target="_blank">
          Framer Motion
        </a>
      </span>
    </div>
  );
};
