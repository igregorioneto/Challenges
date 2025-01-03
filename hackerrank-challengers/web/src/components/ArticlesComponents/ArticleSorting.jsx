import { useEffect, useState } from "react";
import Articles from "./Articles";

const ArtigleSorting = ({ articles: initialArticles }) => {
    const [articles, setArticles] = useState(initialArticles);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetchArticles()
    }, []);

    const fetchArticles = async (query = "") => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3003/articles${query}`);

        if (!response.ok) {
          throw new Error(`Http error! Status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data.articles);
        setError(null);
      } catch (error) {
        setArticles([]);
        setError('Error in requesting articles. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  
    const handleMostUpvoted = () => fetchArticles("?upvotes=true");
  
    const handleMostRecent = () => fetchArticles("?date=true");

    return (
        <>
        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}
        <div className="App">
          <div className="flex flex-row items-center justify-center my-3 space-x-4">
            <label className="text-sm uppercase font-light">
              Sort By
            </label>
            <button
              data-testid="most-upvoted-link"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={handleMostUpvoted}
              disabled={loading}
            >
              Most Upvoted
            </button>
            <button
              data-testid="most-recent-link"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={handleMostRecent}
              disabled={loading}
            >
              Most Recent
            </button>
          </div>
          
          {loading ? (
            <div className="text-center text-gray-500">Loading Articles...</div>
          ) : (
            <Articles articles={articles} />
          )}

        </div>
      </>
    );
}

export default ArtigleSorting;