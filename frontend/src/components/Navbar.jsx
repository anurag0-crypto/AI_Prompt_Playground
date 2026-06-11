import { FaRobot, FaMoon, FaSun } from "react-icons/fa";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav
      className={
        darkMode
          ? "sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800"
          : "sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200"
      }
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <FaRobot className="text-blue-500 text-2xl" />

          <h1
            className={
              darkMode
                ? "text-white font-bold text-2xl"
                : "text-gray-900 font-bold text-2xl"
            }
          >
            Prompt Playground Pro
          </h1>
        </div>

        {/* THEME TOGGLE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={
            darkMode
              ? "p-3 rounded-full bg-slate-800 text-white hover:scale-110 transition"
              : "p-3 rounded-full bg-gray-200 text-black hover:scale-110 transition"
          }
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;