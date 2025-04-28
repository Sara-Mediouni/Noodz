import React from "react";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const links = ["Home", "Services", "Offers", "About us"];

  return (
    <footer className="w-full p-10 md:p-20 text-sm md:text-lg bg-orange-200 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
        {/* Left section */}
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold mb-4">Foodly</h1>
          <p className="mb-6">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit...
          </p>
          <h3 className="text-xl font-bold mb-2">Contact us on</h3>
          <div className="flex gap-4 text-orange-400">
            <FaTwitter size={22} />
            <FaFacebook size={22} />
            <FaLinkedin size={22} />
          </div>
        </div>

        {/* Dynamic sections */}
        {["Menu", "Information", "Contact"].map((sectionTitle, idx) => (
          <div key={idx}>
            <h3 className="text-xl md:text-3xl font-extrabold mb-4">
              {sectionTitle}
            </h3>
            <ul className="text-gray-600 text-lg space-y-2">
              {links.map((link, index) => (
                <li key={index} className="hover:text-black cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
