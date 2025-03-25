import React, { useState } from "react";

const colors = ["red", "green", "yellow", "blue", "pink", "cyan", "gray"];

const bgColors = {
  Black: "bg-black",
  Red: "bg-red-500",
  Green: "bg-green-500",
  Yellow: "bg-yellow-500",
  Blue: "bg-blue-500",
  Magenta: "bg-pink-500",
  Cyan: "bg-cyan-500",
  White: "bg-white text-black",
};

const App = () => {
  const [text, setText] = useState("");
  const [selectedRange, setSelectedRange] = useState(null);

  const [copied, setCopied] = useState(false);

const handleCopy = () => {
  navigator.clipboard.writeText(text);
  setCopied(true);
  
  // Reset "Copied!" text after 2 seconds
  setTimeout(() => setCopied(false), 2000);
};

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    setSelectedRange(range);
  };

  const applyStyle = (styleType) => {
    if (!selectedRange) return;

    const selectedText = selectedRange.toString();
    if (!selectedText.trim()) return;

    const span = document.createElement("span");

    if (styleType === "bold") {
      span.className = "font-bold";
    } else if (styleType === "underline") {
      span.className = "underline";
    }

    span.textContent = selectedText;
    selectedRange.deleteContents();
    selectedRange.insertNode(span);

    setSelectedRange(null);
  };

  const applyColor = (colorClass, isForeground) => {
    if (!selectedRange) return;

    const selectedText = selectedRange.toString();
    if (!selectedText.trim()) return;

    const span = document.createElement("span");

    if (isForeground) {
      const textColorClass =
        colorClass === "gray" ? "text-gray-500" : `text-${colorClass}-500`;
      span.className = textColorClass;
    } else {
      span.className = `${bgColors[colorClass]} inline-block px-1`;
    }

    span.textContent = selectedText;
    selectedRange.deleteContents();
    selectedRange.insertNode(span);
    setSelectedRange(null);
  };

  const resetText = () => {
    document.getElementById("editableDiv").innerHTML = "";
    setText("");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Rebane's Discord <span className=" text-blue-500">Colored</span>  Text Generator</h1>
      <div className=" text-xl font-semibold">About</div>
      <div className="lg:w-[36%] text-center font-[500]">This is a simple app that creates colored Discord messages using the ANSI color codes available on the latest Discord desktop versions.</div>
      <div className="lg:w-[36%] text-center font-[500] mt-4">
      To use this, write your text, select parts of it and assign colors to them, then copy it using the button below, and send in a Discord message.
      </div>
      <div className=" text-xl font-semibold mt-5">Source Code</div>
      <div className="lg:w-[36%] text-center font-[500] mt-4">
      This app runs entirely in your browser and the source code is freely available on GitHub. Shout out to kkrypt0nn for this guide.
      </div>
      {/* Foreground Colors */}
      <div className="mb-6 mt-5">
        <p className="mb-2">Text Color</p>
        <div className="flex gap-2">
          {colors.map((color) => (
            <div key={color} className="relative group">
            {/* Button */}
            <button
              className={`w-10 h-10 rounded bg-${color}-500 border`}
              onClick={() => applyColor(color, true)}
            ></button>
            
            {/* Tooltip */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
              {color}
            </div>
          </div>
          ))}
        </div>
      </div>

      {/* Background Colors */}
      <div className="mb-6">
        <p className="mb-2">Background Color</p>
        <div className="flex gap-2">
          {Object.keys(bgColors).map((color) => (
            <div key={color} className="relative group">
            {/* Button */}
            <button
              className={`w-10 h-10 rounded ${bgColors[color]} border hover:opacity-75`}
              onClick={() => applyColor(color, false)}
            ></button>
            
            {/* Tooltip */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
              {color}
            </div>
          </div>
          ))}
        </div>
      </div>

      {/* Text Formatting Buttons */}
      <div className="mb-6 flex gap-4">
        <button
          className="bg-gray-700 px-4 py-2 rounded border"
          onClick={() => applyStyle("bold")}
        >
          Bold
        </button>
        <button
          className="bg-gray-700 px-4 py-2 rounded border"
          onClick={() => applyStyle("underline")}
        >
          Underline
        </button>
        <button
          className="bg-red-600 px-4 py-2 rounded border"
          onClick={resetText}
        >
          Reset
        </button>
      </div>

      {/* Editable Div */}
      <div
        id="editableDiv"
        contentEditable
        onInput={(e) => setText(e.target.innerHTML)}
        onMouseUp={handleTextSelection}
        className="w-96 min-h-40 p-4 rounded-lg bg-gray-800 text-white border border-gray-600"
      ></div>

      {/* Copy Button */}
      <button
  className="mt-4 bg-green-500 px-4 py-2 rounded relative"
  onClick={handleCopy}
>
  {copied ? "Copied!" : "Copy Text"}
</button>
    </div>
  );
};

export default App;
