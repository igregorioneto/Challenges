import React, { useEffect, useState } from "react";

const baseURL = process.env.REACT_APP_URL_BASE;

const FeedbackSystem = () => {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  async function fetchFeedbacks() {
    try {
      const response = await fetch(`http://localhost:3002/feedbacks`);

      if (!response.ok) {
        throw new Error(`Http error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFeedback(data.feedbacks);
      setError(null);
    } catch (error) {
      setFeedback([]);
      setError('Falha ao carregar feedbacks. Por favor, tente novamente.')
    }
  }

  function handleUpvotes(id) {
    //const updatedFeedback = feedback.map((feedback, i) => i === index ? {...feedback, upvotes: feedback.upvotes + 1} : feedback);
    //setFeedback(updatedFeedback);
    fetch(`http://localhost:3002/feedbacks/upvotes/${id}`, { method: 'POST' })
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
        setError('Falha ao enviar upvote');
      });
  }

  function handleDownupvotes(id) {
    //const updatedFeedback = feedback.map((feedback, i) => i === index ? { ...feedback, downvotes: feedback.downvotes + 1 } : feedback);
    //setFeedback(updatedFeedback);
    fetch(`http://localhost:3002/feedbacks/downvotes/${id}`, { method: 'POST' })
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
        console.error('Erro ao enviar downvotes:', error);
        setError('Falha ao enviar downvotes');
      });
  }

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
