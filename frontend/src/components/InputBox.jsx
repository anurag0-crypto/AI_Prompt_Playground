function InputBox({ value, setValue, darkMode }) {
  return (
    <textarea
      rows="6"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter your prompt..."
      className={
        darkMode
          ? "w-full p-4 rounded bg-slate-800 text-white border border-slate-700"
          : "w-full p-4 rounded bg-white text-black border border-gray-300"
      }
    />
  );
}

export default InputBox;