const { createContext, useContext, useState, useEffect } = require("react");

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  async function fetchFeedbacks() {
    try {
      const response = await fetch(`http://localhost:3003/feedbacks`);

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

  async function handleUpvotes(id) {
    try {
        await fetch(`http://localhost:3003/feedbacks/upvotes/${id}`, { 
            method: 'POST' 
        })
        fetchFeedbacks();
    } catch (error) {
        console.error('Error ao enviar upvotes', error);
        setError('Falha ao enviar upvote.');
    }
  }

  async function handleDownupvotes(id) {
    try {
        await fetch(`http://localhost:3003/feedbacks/downvotes/${id}`, { 
            method: 'POST' 
        });
        fetchFeedbacks();
    } catch (error) {
        console.error('Erro ao enviar downvotes:', error);
        setError('Falha ao enviar downvotes');
    }
  }

  return (
    <FeedbackContext.Provider value={{ feedback, error, handleUpvotes, handleDownupvotes }}>
        {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => useContext(FeedbackContext);