import ReactMarkdown from "react-markdown";

function PromptCard({ title, content, darkMode }) {
  return (
    <div
      className={
        darkMode
          ? "p-4 rounded bg-slate-900 text-white"
          : "p-4 rounded bg-white text-black border"
      }
    >
      <h2 className="text-blue-500 font-bold mb-2">
        {title}
      </h2>

      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default PromptCard;