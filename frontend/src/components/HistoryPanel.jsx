function HistoryPanel({ history, setInput, darkMode }) {
  return (
    <div
      className={
        darkMode
          ? "p-3 bg-slate-900 rounded text-white"
          : "p-3 bg-white border rounded text-black"
      }
    >
      <h2 className="font-bold mb-2">History</h2>

      {history.map((h, i) => (
        <div
          key={i}
          onClick={() => setInput(h.input)}
          className={
            darkMode
              ? "p-2 bg-slate-800 mb-2 cursor-pointer"
              : "p-2 bg-gray-100 mb-2 cursor-pointer"
          }
        >
          {h.input.slice(0, 30)}
        </div>
      ))}
    </div>
  );
}

export default HistoryPanel;