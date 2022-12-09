import { TestimonialType } from "../utils/types";
import React from "react";
import { motion } from "framer-motion";

const Cards = ({ testimonials }: any) => {
  return (
    <>
      {testimonials.map((item: TestimonialType) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          key={item.Name}
          className="bg-[#18181C] ml-4 w-96 h-46 h-46 max-h-46 min-h-46 p-2 rounded-lg"
        >
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="text-white text-sm font-bold font-['Inter']">
                User:~$ # {item.Name}
              </h2>
            </div>
            <div>
              <p className="text-[#bbb]">
                {item.Message.length > 105
                  ? item.Message.substring(0, 105) + "..."
                  : item.Message}
              </p>
            </div>
            <div className="text-white flex flex-row">
              <a
                className="hover:cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(item.Message);
                }}
              >
                copy
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default Cards;
