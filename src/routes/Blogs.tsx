import React, { useEffect, useMemo, useState } from "react";
import { getAccountInfo, getBlogs } from "../utils/services/HttpRequests";
import { BlogsType, GithubAccountType, TagObject } from "../utils/types";
import { HiSearch } from "react-icons/hi";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { formatDistanceToNowStrict } from "date-fns";

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogsType[]>([]);
  const [query, setQuery] = useState<string>("");
  const [profile, setProfile] = useState<GithubAccountType>({
    avatar_url: "",
    login: "",
  });
  const [tags, setTags] = useState<TagObject[]>([]);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getBlogs()
      .then((res) => {
        setBlogs(res.data.data.blogs.reverse());
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });

    getAccountInfo()
      .then((res) => {
        setProfile({
          avatar_url: res.data.avatar_url,
          login: res.data.login,
        });
      })
      .catch((err) => {
        console.log(err);
        setProfile({
          avatar_url: "https://via.placeholder.com/200",
          login: "User Not Found",
        });
      });
  }, []);

  useEffect(() => {
    if (showTags) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }
  }, [showTags]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((item) => {
      return item.Title.toLowerCase().includes(query.toLowerCase());
    });
  }, [blogs, query]);

  return (
    <div className="container navbar-container pt-[3rem] av:ml-0">
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
          <div className="relative xl:mx-4">
            <HiSearch
              color="#3b3b3c"
              className="absolute top-0 left-2 h-full w-6"
            />
            <input
              placeholder="Search for a blog title"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="bg-[#18181c] w-full rounded-sm  text-white font-['Inter'] border border-[#999] hover:border-[#ccc] focus:border-[#40cf8e] outline-none transition px-10 py-1"
            />
          </div>
          {filteredBlogs.length !== 0 ? (
            <>
              <div className="mt-8 xl:mx-4">
                {filteredBlogs.map((item) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="border-b border-[#18181c] pb-8 mt-4"
                  >
                    <div
                      onClick={() => window.location.replace(`/p/${item.Code}`)}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center">
                          <img
                            src={profile.avatar_url}
                            alt="Authors Profile Picture"
                            className="w-16 h-16 object-cover rounded-full av:hidden"
                          />
                          <div className="flex flex-col items-start">
                            <h2 className="text-white font-['Inter'] font-bold ml-2">
                              {item.Title}
                            </h2>
                            <div className="flex flex-row ml-2 items-center av:mt-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="purple"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                                />
                              </svg>

                              <span className="text-[#919192] ml-2">
                                {formatDistanceToNowStrict(
                                  new Date(parseInt(item.Unixtimestamp)),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#919192] ml-[4.5rem] av:ml-2 av:mt-1">
                        {item.Description}
                      </p>
                    </div>
                    <div
                      className="hidden av:block mt-4 ml-2 cursor-pointer"
                      onClick={() => {
                        setTags(item.Tags);
                        setShowTags(true);
                      }}
                    >
                      <span className="text-white border border-[#18181c] w-fit py-1 px-2 rounded-sm text-sm">
                        View Tags
                      </span>
                    </div>
                    <div className="w-fit flex flex-wrap gap-2 mt-5 ml-[4.5rem] av:hidden">
                      {item.Tags.map((value) => (
                        <span className="text-white border border-[#18181c] w-fit py-1 px-2 rounded-sm text-sm">
                          {value.Name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="flex flex-row items-center text-white text-[1.5rem] md:mx-6 mt-6 md:text-[1rem]">
                System:~$
                <TypeAnimation
                  className="text-white md:text-[1rem]"
                  cursor={false}
                  sequence={[
                    "# No Blogs Found.",
                    500,
                    "# No Blogs Found..",
                    500,
                    "# No Blogs Found...",
                    500,
                    "# No Blogs Found..",
                    500,
                  ]}
                  repeat={Infinity}
                  speed={5}
                  style={{
                    fontWeight: "bold",
                  }}
                  wrapper="p"
                />
              </h1>
            </>
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
                {item.Name}
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

export default Blogs;
