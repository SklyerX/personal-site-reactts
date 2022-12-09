import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { config } from "../utils/config";
import { getAccountInfo, getBlog } from "../utils/services/HttpRequests";
import { formatDistanceToNowStrict } from "date-fns";
import { BlogType, GithubAccountType } from "../utils/types";

const Blog = () => {
  const [profile, setProfile] = useState<GithubAccountType>({
    avatar_url: "",
    login: "",
  });
  const [blog, setBlog] = useState<BlogType>({
    Title: "",
    Tags: [],
    Unixtimestamp: "",
    HTML: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const { id } = useParams();

  useEffect(() => {
    function setupBlog() {
      getBlog(`${id}`)
        .then((res) => {
          let response: BlogType = res.data.data.blog;
          let updatedResponse = {
            Title: response.Title,
            Tags: response.Tags,
            Unixtimestamp: response.Unixtimestamp,
            HTML: response.HTML,
          };

          setBlog((blog) => ({
            ...blog,
            ...updatedResponse,
          }));

          setTime(parseInt(updatedResponse.Unixtimestamp));

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

          document
            .querySelector(".div")
            ?.insertAdjacentHTML("afterbegin", response.HTML);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
    setupBlog();
    setLoading(false);
  }, []);

  return (
    <>
      {error ? (
        <div className="container navbar-container pt-[3rem]">
          <h1 className="flex flex-row items-center text-white text-[1.5rem]">
            Blog:~$
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
          <p className="mt-2 text-[#bbb]">
            Failed to load blog due to an error. If you think this is a mistake
            or you know what the issue is please contact the owner of the site
            by <a href={`mailto:${config.urls.contactMail}`}>clicking here</a>
          </p>
        </div>
      ) : (
        <div className="container navbar-container pt-[3rem]">
          {loading ? (
            <>
              <h1 className="flex flex-row items-center text-white text-[1.5rem]">
                Blog:~$
                <TypeAnimation
                  className="text-white"
                  cursor={false}
                  sequence={[
                    "# Loading.",
                    500,
                    "# Loading..",
                    500,
                    "# Loading...",
                    500,
                    "# Loading..",
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
            </>
          ) : (
            <>
              <motion.h1
                initial={{ translateX: -1000 }}
                animate={{ translateX: 0 }}
                transition={{ duration: 1 }}
                className="text-white text-[2rem] font-['Inter'] font-bold mb-2 xl:mx-6"
              >
                {blog.Title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-row items-center mt-8 xl:mx-6"
              >
                <img
                  src={profile.avatar_url}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex flex-col">
                  <a
                    href={config.urls.github}
                    className="ml-3 font-['Inter'] font-bold"
                  >
                    {profile.login}
                  </a>
                  <div className="flex flex-row gap-4">
                    <span className="text-[#ccc] flex flex-row items-center ml-3">
                      Published{" "}
                      {formatDistanceToNowStrict(new Date(time), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex-wrap flex m-0 p-0 box-border gap-2 mt-8 xl:mx-6"
              >
                {blog.Tags.map((item) => (
                  <span
                    className="text-white border border-[#18181c] w-fit py-1 px-2 rounded-sm text-sm"
                    key={item.Name}
                  >
                    {item.Name}
                  </span>
                ))}
              </motion.div>
              <motion.div
                initial={{ translateY: 1000 }}
                animate={{ translateY: 0 }}
                transition={{ duration: 1 }}
                className="div mt-16 pb-12 prose prose-indigo xl:mx-6 prose-headings:text-white prose-p:text-[#bbb] prose-a:[#40cf83] prose-code:text-[#4138eb] prose-li:text-[#bbb]"
              ></motion.div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Blog;
