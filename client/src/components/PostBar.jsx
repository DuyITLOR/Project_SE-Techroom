import React, { useEffect, useState, useRef } from "react";

import PaperclipIcon from "../assets/search-2.svg?react";
import SendIcon from "../assets/send.svg?react";

const PostBar = ({ inputText, Post, handleInputFile, content, setContent }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("File selected: ", file);
    if (file && handleInputFile) {
      handleInputFile(file);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Post(content);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex items-center justify-center w-full h-[40px] sm:h-[60px] px-2 bg-white rounded-lg shadow-md font-family">
        <div className="flex items-center w-full h-[40px] bg-gray-100 rounded-[10px] shadow-md px-2">
          <button>
            <PaperclipIcon
              className="w-6 h-6 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
              title="Attach a file"
            />
          </button>

          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full px-2 text-xs sm:text-xl text-gray-700 placeholder-gray-400 focus:outline-none "
            placeholder={inputText}
          />

          <button>
            <SendIcon
              className="w-6 h-6 cursor-pointer"
              onClick={() => Post(content)}
              title="Send post"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default PostBar;
