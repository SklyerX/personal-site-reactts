import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { SkillsType, TestimonialType } from "../utils/types";
import { motion } from "framer-motion";
import { SkillData } from "../interface/skill.interface";
import { getSkills, getTestimonials } from "../utils/services/HttpRequests";
import Marquee from "react-fast-marquee";
import Cards from "../components/Cards";

const Home = () => {
  const [skills, setSkills] = useState<SkillsType[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);

  useEffect(() => {
    getSkills()
      .then((res) => {
        setSkills(res.data.data.skills);
      })
      .catch((err) => {
        console.error(err);
        setSkills([]);
      });

    getTestimonials()
      .then((res) => {
        setTestimonials(res.data.data.testimonials);
      })
      .catch((err) => {
        console.log(err);
        setTestimonials([]);
      });
  }, []);

  return (
    <div className="container navbar-container pt-8 px-4 pb-6">
      <motion.div
        initial={{ translateY: -1000 }}
        animate={{ translateY: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="flex flex-row items-center text-white text-[1.5rem] xsm:text-[1.3rem] 2xs:text-[1.1rem]">
          SkylerX:~$
          <TypeAnimation
            className="text-white text-[1.5rem] xsm:text-[1.3rem] 2xs:text-[1.1rem]"
            cursor={false}
            sequence={[
              "#",
              300,
              "# H",
              300,
              "# He",
              300,
              "# Hel",
              300,
              "# Hell",
              300,
              "# Hello",
              300,
              "# Hello!",
            ]}
            speed={5}
            style={{
              fontWeight: "bold",
              marginLeft: "1rem",
            }}
            wrapper="p"
          />
        </h1>
        <p className="mt-2 text-[#bbb]">
          I am a 15 y/o, self-taught software engineer from Iran. I'm currently
          learning as much as I can and building amazing projects!
        </p>
      </motion.div>
      <motion.div
        initial={{ translateX: -1000 }}
        animate={{ translateX: 0 }}
        transition={{ duration: 1.5 }}
        className="mt-6"
      >
        <h1 className="flex flex-row items-center text-white text-[1.5rem] xsm:text-[1.3rem] 2xs:text-[1.1rem]">
          Activities:~$
          <TypeAnimation
            className="text-white text-[1.5rem] xsm:text-[1.3rem] 2xs:text-[1.1rem]"
            cursor={false}
            sequence={["# Techstack"]}
            speed={5}
            style={{
              fontWeight: "bold",
              marginLeft: "1rem",
            }}
            wrapper="p"
          />
        </h1>
        <p className="mt-2 text-[#bbb]">
          To speed up my development process and improve the quality of both my
          code and my projects, I employ a number of tools. The technologies and
          languages I currently use and/or have experience with are listed here.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
        className={`grid grid-cols-6 gap-4 mt-8 xsm:grid-cols-4`}
      >
        {skills?.map((item: SkillData) => (
          <motion.img
            key={item.Name}
            whileHover={{ scale: 1.5 }}
            src={item.Image}
            className="w-[3rem] rounded-sm max-h-[3rem]"
          />
        ))}
      </motion.div>
      <motion.div
        className="mt-[4rem]"
        initial={{ translateY: 300 }}
        animate={{ translateY: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="flex flex-row items-center text-white text-[1.5rem] xsm:text-[1.3rem] 2xs:text-[1.1rem]">
          Root:~$
          <TypeAnimation
            className="text-white text-[1.5rem] xsm:text-[1.3rem] 2xs:text-[1.1rem]"
            cursor={false}
            sequence={[
              "#",
              300,
              "# T",
              300,
              "# Te",
              300,
              "# Tea",
              300,
              "# Team",
            ]}
            speed={5}
            style={{
              fontWeight: "bold",
              marginLeft: "1rem",
            }}
            wrapper="p"
          />
        </h1>
        <p className="mt-2 text-[#bbb]">
          I really enjoy to work in teams and groups. The current team that I am
          with is known as The{" "}
          <a href="https://observersteam.ir" target="_blank">
            Observers™
          </a>
          . We are behind some of the biggest persian bots on discord.
        </p>
      </motion.div>
      <motion.div
        className="mt-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <h1 className="flex flex-row items-center text-white text-[1.5rem] xsm:text-[1.3rem] 2xs:text-[1.1rem]">
          Users:~$
          <TypeAnimation
            className="text-white text-[1.5rem] xsm:text-[1.3rem] 2xs:text-[1.1rem]"
            cursor={false}
            sequence={[
              "#",
              200,
              "# T",
              200,
              "# Te",
              200,
              "# Tes",
              200,
              "# Test",
              200,
              "# Testi",
              200,
              "# Testim",
              200,
              "# Testimo",
              200,
              "# Testimon",
              200,
              "# Testimoni",
              200,
              "# Testimonia",
              200,
              "# Testimonial",
              200,
              "# Testimonials",
            ]}
            speed={5}
            style={{
              fontWeight: "bold",
              marginLeft: "1rem",
            }}
            wrapper="p"
          />
        </h1>
        <p className="mt-2 text-[#bbb]">
          Here is what clients an co-workers say about me!
        </p>
      </motion.div>
      <Marquee className="mt-6" direction="left" pauseOnHover>
        <Cards
          testimonials={testimonials.slice(
            0,
            Math.round(testimonials.length / 2)
          )}
        />
      </Marquee>
      <Marquee className="mt-6" direction="right" pauseOnHover>
        <Cards
          testimonials={testimonials.slice(
            Math.round(testimonials.length / 2),
            testimonials.length
          )}
        />
      </Marquee>
    </div>
  );
};

export default Home;
