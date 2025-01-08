import React, { useEffect, useState } from "react";
import { useFeedback } from "./contexts/FeedbackContext";

const baseURL = process.env.REACT_APP_URL_BASE;

const FeedbackSystem = () => {
  const { feedback, error, handleUpvotes, handleDownupvotes } = useFeedback();

  return (
    <div className="mx-auto text-center max-w-5xl">
    {error && (
      <div className="text-red-500 mb-4">{error}</div>
    )}
    <div className="flex flex-wrap justify-center mt-8 gap-8">
      {feedback?.length > 0 ? (
        feedback.map((item, i) => (
          <div
            key={item.id}
            className="p-4 w-72 bg-white shadow-md rounded-md border"
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <div className="flex justify-around my-6">
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                data-testid={`upvote-btn-${item.id}`}
                onClick={() => handleUpvotes(item.id)}
              >
                👍 Upvote
              </button>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                data-testid={`downvote-btn-${item.id}`}
                onClick={() => handleDownupvotes(item.id)}
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
        ))
      ): (
        !error && (
          <p className="text-gray-500">Nenhum feedback disponível no momento.</p>
        )
      )}
    </div>
  </div>
  );
};

export default FeedbackSystem;
