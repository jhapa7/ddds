import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 flex flex-col gap-4 justify-center items-center text-white px-[2rem] py-[1rem]">
      <div className="flex gap-[1rem]">
        <a href="https://github.com/sandipshiwakoti">
          <FaGithub className="text-3xl" />
        </a>
        <a href="https://linkedin.com/sandipshiwakoti">
          <FaLinkedin className="text-3xl" />
        </a>
      </div>
      <h1 className="text-yellow-500 text-md md:text-lg font-semibold text-center">
        Made with ❤ by Sandip Shiwakoti
      </h1>
    </footer>
  );
};

export default Footer;
