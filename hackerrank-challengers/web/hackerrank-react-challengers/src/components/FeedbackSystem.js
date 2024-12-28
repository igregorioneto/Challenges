import React, { useState } from "react";

const FeedbackSystem = () => {
  const initialFeedbacks = [
    { title: "Readability", upvotes: 0, downvotes: 0 },
    { title: "Performance", upvotes: 0, downvotes: 0 },
    { title: "Security", upvotes: 0, downvotes: 0 },
    { title: "Documentation", upvotes: 0, downvotes: 0 },
    { title: "Testing", upvotes: 0, downvotes: 0 },
  ]
  const [feedback, setFeedback] = useState(initialFeedbacks);

  function handleUpvotes(index) {
    const updatedFeedback = feedback.map((feedback, i) => i === index ? {...feedback, upvotes: feedback.upvotes + 1} : feedback);
    setFeedback(updatedFeedback);
  }

  function handleDownupvotes(index) {
    const updatedFeedback = feedback.map((feedback, i) => i === index ? { ...feedback, downvotes: feedback.downvotes + 1 } : feedback);
    setFeedback(updatedFeedback);
  }

  return (
    <div className="mx-auto text-center max-w-5xl">
    <div className="flex flex-wrap justify-center mt-8 gap-8">
      {feedback.map((item, i) => (
        <div
          key={i}
          className="p-4 w-72 bg-white shadow-md rounded-md border"
        >
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <div className="flex justify-around my-6">
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              data-testid={`upvote-btn-${i}`}
              onClick={() => handleUpvotes(i)}
            >
              👍 Upvote
            </button>
            <button
              className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
              data-testid={`downvote-btn-${i}`}
              onClick={() => handleDownupvotes(i)}
            >
              👎 Downvote
            </button>
          </div>
          <p className="my-2">
            Upvotes: <strong>{item.upvotes}</strong>
          </p>
          <p className="my-2">
            Downvotes: <strong>{item.downvotes}</strong>
          </p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default FeedbackSystem;
