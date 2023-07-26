import { useEffect, useState } from "react";
import { MockNav } from "../utils/mocks/navbar.mock";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    if (opened) {
      document.body.addEventListener("click", (e: any) => {
        if (
          e.target.className ==
            "h-fit w-44 z-[999] p-2 bg-[#18181C] fixed right-0 top-11 rounded-md flex flex-col gap-2 mobile-div" ||
          e.target.nodeName == "svg"
        )
          return console.log(
            "User clicked on menu...Closing operation stopped."
          );
        setOpened(false);
      });
    }
  }, [opened]);

  return (
    <>
      <nav className="w-[100%] banner-container grid place-items-center top-0 left-0 bg-[#0e1117c8] fixed pb-6 backdrop-blur-md z-[999] md:hidden">
        <ul className="flex justify-center items-center gap-5 mt-5">
          {MockNav.map((item, index) => (
            <li key={index}>
              <a className="block relative group text-white" href={item.href}>
                {"fn " + item.name}(
                <span
                  className={`${
                    location.pathname !== item.href ? "invisible" : ""
                  } group-hover:visible group-focus-visible:visible`}
                >
                  {location.pathname === item.href ? "ctx" : "go"})
                </span>
                {location.pathname === item.href ? (
                  ""
                ) : (
                  <span className="absolute right-4 group-hover:invisible group-focus-visible:invisible">
                    )
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="w-[100%] banner-container top-0 left-0 bg-[#0e1117c8] fixed backdrop-blur-md z-[999] mr-3 md:flex md:justify-end hidden transition-all duration-500 ease-out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-10 h-10"
          onClick={() => setOpened(!opened)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        {opened ? (
          <div className="h-fit w-44 mr-2 z-[999] p-2 bg-[#18181C] fixed right-0 top-12 rounded-md flex flex-col gap-2 mobile-div">
            {MockNav.map((item, index) => (
              <div className="flex flex-row items-center" key={index}>
                <a href={item.href} className="ml-2">
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </nav>
    </>
  );
};

export default Navbar;
