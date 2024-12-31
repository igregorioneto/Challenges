import React, { useEffect, useState } from "react";

const FeedbackSystem = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  function fetchFeedbacks() {
    fetch('http://localhost:3000/feedbacks')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFeedback(data.feedbacks);
      })
      .catch((error) => {
        console.error('Erro ao carregar feedbacks:', error);
      });
  }

  function handleUpvotes(id) {
    //const updatedFeedback = feedback.map((feedback, i) => i === index ? {...feedback, upvotes: feedback.upvotes + 1} : feedback);
    //setFeedback(updatedFeedback);
    fetch(`http://localhost:3000/feedbacks/upvotes/${id}`, { method: 'POST' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        fetchFeedbacks();
      })
      .catch((error) => {
        console.error('Erro ao enviar upvote:', error);
      });
  }

  function handleDownupvotes(id) {
    //const updatedFeedback = feedback.map((feedback, i) => i === index ? { ...feedback, downvotes: feedback.downvotes + 1 } : feedback);
    //setFeedback(updatedFeedback);
    fetch(`http://localhost:3000/feedbacks/downvotes/${id}`, { method: 'POST' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        fetchFeedbacks();
      })
      .catch((error) => {
        console.error('Erro ao enviar upvote:', error);
      });
  }

  return (
    <div className="mx-auto text-center max-w-5xl">
    <div className="flex flex-wrap justify-center mt-8 gap-8">
      {feedback.map((item, i) => (
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
      ))}
    </div>
  </div>
  );
};

export default FeedbackSystem;
