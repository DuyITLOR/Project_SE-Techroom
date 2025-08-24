import React, { useState } from "react";

const FeedBackForm = ({
  ClassName,
  StudentName,
  openFeedback,
  setOpenFeedback,
  handleFeedback,
  FeedbackContent,
  setFeedbackContent,
  FeedbackTag,
  setFeedbackTag,
}) => {
  if (!openFeedback) return null;
  console.log(
    "Rendering FeedBackForm for:",
    StudentName,
    "in class:",
    ClassName
  );
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm">
      <div className="w-1/2 h-min-content rounded-[20px] bg-white border-2">
        <div className="flex flex-col gap-3 font-family text-[20px] px-6 py-6">
          <p>Giving feedback to {StudentName}</p>
          <p>Class: {ClassName}</p>
          <textarea
            type="text"
            value={FeedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded min-h-[150px] resize-none"
            placeholder="Write your feedback here..."
          />
          <div className="flex gap-5">
            <button
              className={`px-4 py-2 rounded-full ${
                FeedbackTag === 1 ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFeedbackTag(1)}>
              Exam
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                FeedbackTag === 2 ? "bg-yellow-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFeedbackTag(2)}>
              Assignment
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                FeedbackTag === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFeedbackTag(3)}>
              Project
            </button>
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded mr-2"
              onClick={() => setOpenFeedback(false)}>
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => {
                handleFeedback(FeedbackContent, FeedbackTag),
                  setOpenFeedback(false);
              }}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBackForm;
