import React from "react";


const Footer = () => {
  return (
    <footer className="bg-green-700 text-white mt-32">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Area</h2>
          <p className="text-sm opacity-90">
            Smart inventory management system designed for efficiency and
            simplicity.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Links</h3>
          <ul className="space-y-1 text-sm">
            <li>Benefits</li>
            <li>How it works</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm">support@area.com</p>
          <p className="text-sm">Sri Lanka</p>
        </div>
      </div>

      <div className="text-center text-sm py-4 bg-green-800">
        © {new Date().getFullYear()} Area. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
