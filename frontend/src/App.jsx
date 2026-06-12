import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import InputBox from "./components/InputBox";
import PromptCard from "./components/PromptCard";
import HistoryPanel from "./components/HistoryPanel";

const MODES = ["eli5", "professional", "teacher", "mentor", "quiz"];

const TEMPLATES = [
  "Explain like I'm 5",
  "Summarize this",
  "Make it professional",
  "Turn into quiz questions",
  "Create study plan",
];

const LLMS = ["gemini", "openai", "claude"];

function App() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("eli5");
  const [llm, setLlm] = useState("gemini");

  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const [previewPrompt, setPreviewPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveHistory = (item) => {
    const updated = [item, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  const buildPrompt = (text, mode) => {
    return `${mode.toUpperCase()}: ${text}`;
  };

  const callAPI = async (text, mode, llm) => {
    let modifiedText = text;

    if (llm === "claude") {
      modifiedText = `[Claude deep reasoning]\n${text}`;
    }
    if (llm === "gemini") {
      modifiedText = `[Gemini fast response]\n${text}`;
    }
    if (llm === "openai") {
      modifiedText = `[OpenAI balanced]\n${text}`;
    }

    const res = await axios.post("https://your-backend.onrender.com/generate", {
      text: modifiedText,
      mode,
      llm,
    });

    return res.data.response;
  };

  const generateSingle = async () => {
    if (!input.trim()) return alert("Enter input first");

    setLoading(true);

    const finalPrompt = buildPrompt(input, mode);
    setPreviewPrompt(finalPrompt);

    try {
      const res = await callAPI(finalPrompt, mode, llm);

      setResponses({ [mode]: res });

      saveHistory({
        input,
        mode,
        llm,
        response: res,
      });
    } catch (err) {
      alert("Error generating response");
    }

    setLoading(false);
  };

  const compareAll = async () => {
    if (!input.trim()) return alert("Enter input first");

    setLoading(true);

    try {
      const results = await Promise.all(
        MODES.map((m) =>
          callAPI(buildPrompt(input, m), m, llm)
        )
      );

      const output = {};
      MODES.forEach((m, i) => {
        output[m] = results[i];
      });

      setResponses(output);
    } catch (err) {
      alert("Error comparing modes");
    }

    setLoading(false);
  };

  const useTemplate = (t) => {
    setInput((prev) => `${t}: ${prev}`);
  };

  // ✅ THEME FIX (IMPORTANT)
  const pageTheme = darkMode
    ? "min-h-screen bg-slate-950 text-white"
    : "min-h-screen bg-gray-100 text-gray-900";

  return (
    <div className={pageTheme}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-4 gap-6">

        {/* LEFT */}
        <div className="md:col-span-3">

          {/* Templates */}
          <div className="flex flex-wrap gap-2 mb-3">
            {TEMPLATES.map((t) => (
              <button
                key={t}
                onClick={() => useTemplate(t)}
                className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
              >
                {t}
              </button>
            ))}
          </div>

          {/* Input */}
          <InputBox
            value={input}
            setValue={setInput}
            darkMode={darkMode}
          />

          {/* Controls */}
          <div className="flex flex-wrap gap-3 mt-3">

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className={
                darkMode
                  ? "p-2 rounded bg-slate-800 text-white"
                  : "p-2 rounded bg-white text-black border"
              }
            >
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={llm}
              onChange={(e) => setLlm(e.target.value)}
              className={
                darkMode
                  ? "p-2 rounded bg-slate-800 text-white"
                  : "p-2 rounded bg-white text-black border"
              }
            >
              {LLMS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            <button
              onClick={generateSingle}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Generate
            </button>

            <button
              onClick={compareAll}
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Compare All
            </button>
          </div>

          {/* PREVIEW */}
          {previewPrompt && (
            <div className={
              darkMode
                ? "mt-4 p-3 bg-slate-800 rounded text-white"
                : "mt-4 p-3 bg-white border rounded text-black"
            }>
              <h3 className="text-sm opacity-70">
                Final Prompt Sent:
              </h3>
              <p>{previewPrompt}</p>
            </div>
          )}

          {/* OUTPUT */}
          {loading ? (
            <div className="mt-10 text-center text-2xl animate-pulse">
              🤖 Thinking...
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {Object.entries(responses).map(([k, v]) => (
                <PromptCard
                  key={k}
                  title={k}
                  content={v}
                  darkMode={darkMode}
                />
              ))}
            </div>
          )}

        </div>

        {/* RIGHT */}
        <HistoryPanel
          history={history}
          setInput={setInput}
          darkMode={darkMode}
        />

      </div>
    </div>
  );
}

export default App;
