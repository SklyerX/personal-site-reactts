import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { getProjects } from "../utils/services/HttpRequests";
import { ProjectsType, LinksObject } from "../utils/types";

const Projects = () => {
  const [projects, setProjects] = useState<ProjectsType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [showTags, setShowTags] = useState<boolean>(false);

  useEffect(() => {
    getProjects()
      .then(async (res) => {
        setProjects(res.data.data.projects);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <div className="container navbar-container pt-12">
      {error ? (
        <h1 className="flex flex-row items-center text-white text-[1.5rem]">
          System:~$
          <TypeAnimation
            className="text-white"
            cursor={false}
            sequence={[
              "# Error.",
              500,
              "# Error..",
              500,
              "# Error...",
              500,
              "# Error..",
              500,
            ]}
            repeat={Infinity}
            speed={5}
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginLeft: "1.4rem",
            }}
            wrapper="p"
          />
        </h1>
      ) : (
        <>
          {projects.length !== 0 ? (
            <>
              {projects.map((item: ProjectsType) => (
                <motion.div
                  initial={{ translateX: item.Id % 2 === 0 ? -1000 : 1000 }}
                  animate={{ translateX: 0 }}
                  transition={{ duration: 1.5 }}
                  key={item.Id}
                  className={`flex lg:flex-col-reverse ${
                    item.Id % 2 === 0 ? "flex-row-reverse" : "flex-row"
                  } items-center justify-around mt-12 lg:mx-12 xsm:mx-3`}
                >
                  <div
                    className={`${item.Id % 2 === 0 ? "ml-12 lg:ml-0" : ""}`}
                  >
                    <div className="ml-2">
                      <h1 className="text-white text-3xl font-['Inter'] font-bold sm:text-xl">
                        {item.Title}
                      </h1>

                      <p className="text-white w-[85%] mt-2 mb-2 sm:text-[.9rem]">
                        {item.Description}
                      </p>
                    </div>
                    {item.Links.map((value: LinksObject) => (
                      <a href={value.Url} key={value.Name} className="ml-2">
                        {" "}
                        {value.Name}
                      </a>
                    ))}
                    <div
                      className="hidden lg:block mt-3"
                      onClick={() => {
                        setTags(item.Tags);
                        setShowTags(true);
                      }}
                    >
                      <span className="text-white border border-[#18181c] px-2 py-1 w-fit rounded-sm ml-2 lg:ml-2 text-sm ">
                        View Tags
                      </span>
                    </div>
                    <div className="mt-4 flex flex-row gap-4 lg:hidden flex-wrap">
                      {item.Tags.map((value) => (
                        <span
                          key={value}
                          className="text-white border border-[#18181c] px-2 py-1 w-fit rounded-sm ml-2 lg:ml-2 text-sm"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mx-2 lg:mb-6">
                    <img
                      src={item.Image}
                      className="rounded-lg w-fit h-fit object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </>
          ) : (
            <h1 className="flex flex-row items-center text-white text-[1.5rem] mx-6 mt-6 md:text-[1rem]">
              System:~$
              <TypeAnimation
                className="text-white"
                cursor={false}
                sequence={[
                  "# No Projects Found.",
                  500,
                  "# No Projects Found..",
                  500,
                  "# No Projects Found...",
                  500,
                  "# No Projects Found..",
                  500,
                ]}
                repeat={Infinity}
                speed={5}
                style={{
                  fontWeight: "bold",
                  marginLeft: "1.4rem",
                }}
                wrapper="p"
              />
            </h1>
          )}
        </>
      )}
      {showTags ? (
        <>
          <div
            className="w-full h-[100vh] bg-[#18181c83] fixed top-[4rem] hidden av:block"
            onClick={() => setShowTags(false)}
          ></div>
          <div className="hidden fixed bottom-0 left-0 w-full h-fit py-6 px-4 av:flex flex-wrap bg-[#18181c] gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
              onClick={() => setShowTags(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            {tags.map((item) => (
              <span className="text-white border border-[#27272d] w-fit py-1 px-2 rounded-sm text-sm">
                {item}
              </span>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Projects;
