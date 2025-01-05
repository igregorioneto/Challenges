import { useState } from "react";

const OMITTED_WORDS = ["a", "the", "and", "or", "but"];

const WordOmitter = () => {
  const [inputText, setInputText] = useState("");
  const [omitWords, setOmitWords] = useState(true);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const toggleOmitWords = () => {
    setOmitWords(!omitWords);
  };

  const clearFields = () => {
    setInputText("");
  };

  const getProcessedText = () => {
    let text = inputText;
    if (omitWords) {
      for (let word of OMITTED_WORDS) {
        text = omitterText(text, word);
      }
    }
    return text;
  };

  const omitterText = (text, omitt) => {
    return text.toLocaleLowerCase().replaceAll(omitt, '').trim(); 
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <textarea
        placeholder="Type here..."
        value={inputText}
        onChange={handleInputChange}
        data-testid="input-area"
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex space-x-4">
        <button
          onClick={toggleOmitWords}
          data-testid="action-btn"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {omitWords ? "Show All Words" : "Omit Words"}
        </button>
        <button
          onClick={clearFields}
          data-testid="clear-btn"
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Clear
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Output:</h2>
        <p data-testid="output-text" className="text-gray-700">
          {getProcessedText()}
        </p>
      </div>
    </div>
  );
}

export default WordOmitter;