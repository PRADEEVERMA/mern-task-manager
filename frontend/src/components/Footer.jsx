import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-10 py-6 border-t text-center">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} Task Manager • Built by Pradeep Verma
      </p>

      <div className="flex justify-center gap-4 mt-3">
        <a
          href="https://github.com/PRADEEVERMA"
          target="_blank"
          className="text-gray-700 hover:text-black"
        >
          <FaGithub size={22} />
        </a>

        <a
          href="https://www.linkedin.com/in/pradeep-verma-533216318"
          target="_blank"
          className="text-blue-600 hover:text-blue-800"
        >
          <FaLinkedin size={22} />
        </a>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        MERN Stack • React • Node • MongoDB
      </p>
    </footer>
  );
};

export default Footer;
