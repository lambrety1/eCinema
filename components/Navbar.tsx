import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import type { NextPage } from "next";
import { useEffect } from "react";

const Navbar: NextPage = () => {
  return (
    <div className={`fixed top-0 left-0 right-0 w-screen py-5 px-7 h-20 z-50 flex justify-between items-center transition duration-500 bg-dark navbar`}>
      <Link href="/">
        <img className="h-full w-auto cursor-pointer" src="https://ik.imagekit.io/nap/eCinema/eCinema_Logo_X2vcmwMm4.png" alt="" />
      </Link>
      <FaSearch className="mr-4 cursor-pointer" size={30} />
    </div>
  );
};

export default Navbar;