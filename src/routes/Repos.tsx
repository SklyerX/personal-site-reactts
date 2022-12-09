import { useEffect, useMemo, useState } from "react";
import { getAccountInfo, getRepos } from "../utils/services/HttpRequests";
import { GithubAccountType, RepositoriesType } from "../utils/types";
import { HiLink, HiSearch } from "react-icons/hi";
import { formatDistanceToNowStrict } from "date-fns";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { config } from "../utils/config";

const Repos = () => {
  const [repos, setRepos] = useState<RepositoriesType[]>([]);
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [profile, setProfile] = useState<GithubAccountType>({
    avatar_url: "",
    login: "",
  });

  useEffect(() => {
    getRepos()
      .then((res) => {
        setRepos(res.data);
      })
      .catch((err) => {
        console.log(err);
        setRepos([]);
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
        setError(true);
      });
  }, []);

  const filteredRepos = useMemo(() => {
    return repos.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [repos, query]);

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
          <div className="mt-8 xl:mx-4">
            {filteredRepos.length !== 0 ? (
              <>
                {filteredRepos.map((item) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="border-b border-[#18181c] pb-8 mt-4"
                  >
                    <div
                      onClick={() =>
                        window.location.replace(
                          `https://github.com/${config.names.githubUsername}/${item.name}`
                        )
                      }
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
                              {item.name}
                            </h2>
                            <div className="flex flex-row ml-2 items-center av:mt-1">
                              <div className="flex flex-row xsm:flex-col items-center">
                                <div className="flex flex-row items-center">
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

                                  <span className="text-[#919192] ml-3">
                                    {formatDistanceToNowStrict(
                                      new Date(item.created_at),
                                      {
                                        addSuffix: true,
                                      }
                                    )}
                                  </span>
                                </div>
                                <div className="flex flex-row items-center ml-3 mt-2 xsm:ml-0 xsm:mb-3  ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="green"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                  </svg>

                                  <span className="text-[#919192] ml-3">
                                    {formatDistanceToNowStrict(
                                      new Date(item.updated_at),
                                      {
                                        addSuffix: true,
                                      }
                                    )}
                                  </span>
                                </div>
                              </div>
                              {/* ADD UPDATED AT STAMP */}
                            </div>
                          </div>
                        </div>
                        <a
                          href={`${
                            item.mirror_url
                              ? item.mirror_url
                              : `https://github.com/${config.names.githubUsername}/${item.name}`
                          }`}
                          className="flex flex-row items-center border border-[#334E46] text-[#86DFBA] rounded p-1 text-sm mb-8"
                        >
                          <HiLink color="#86DFBA" className="mr-2" /> Homepage
                        </a>
                      </div>
                      <p className="text-[#919192] ml-[4.5rem] av:ml-2 av:mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div
                      className="hidden av:block mt-4 ml-2 cursor-pointer"
                      onClick={() => {
                        setTags(item.topics);
                        setShowTags(true);
                      }}
                    >
                      <span className="text-white border border-[#18181c] w-fit py-1 px-2 rounded-sm text-sm">
                        View Tags
                      </span>
                    </div>
                    <div className="w-fit flex flex-wrap gap-2 mt-5 ml-[4.5rem] av:hidden">
                      {item.topics.map((value) => (
                        <span className="text-white border border-[#18181c] w-fit py-1 px-2 rounded-sm text-sm">
                          {value}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <h1 className="flex flex-row items-center text-white text-[1.5rem]">
                System:~$
                <TypeAnimation
                  className="text-white"
                  cursor={false}
                  sequence={[
                    "# No Repos Found.",
                    500,
                    "# No Repos Found..",
                    500,
                    "# No Repos Found...",
                    500,
                    "# No Repos Found..",
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
            )}
          </div>
        </>
      )}
      {showTags ? (
        <>
          <div
            className="av:block hidden w-full h-[100vh] bg-[#18181c83] fixed top-[4rem]"
            onClick={() => setShowTags(false)}
          ></div>
          <div className="av:flex hidden fixed bottom-0 left-0 w-full h-fit py-6 px-4 flex-wrap bg-[#18181c] gap-4">
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

export default Repos;
