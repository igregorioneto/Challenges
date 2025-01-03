import { useEffect, useState } from "react";
import Articles from "./Articles";

const ArtigleSorting = ({ articles: initialArticles }) => {
    const [articles, setArticles] = useState(initialArticles);

    useEffect(() => {
      handleMostUpvoted()
    }, []);
  
    const handleMostUpvoted = () => {
      // Logic for most upvoted articles
      const sortedArticles = [...articles].sort((articlesA, articlesB) => articlesB.upvotes - articlesA.upvotes);
      setArticles(sortedArticles);
    };
  
    const handleMostRecent = () => {
      // Logic for most recent articles
      const sortedArticles = [...articles].sort((articlesA, articlesB) => new Date(articlesB.date) - new Date(articlesA.date));
      setArticles(sortedArticles);
    };
    return (
        <>
        <div className="App">
          <div className="flex flex-row items-center justify-center my-3 space-x-4">
            <label className="text-sm uppercase font-light">
              Sort By
            </label>
            <button
              data-testid="most-upvoted-link"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={handleMostUpvoted}
            >
              Most Upvoted
            </button>
            <button
              data-testid="most-recent-link"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={handleMostRecent}
            >
              Most Recent
            </button>
          </div>
          <Articles articles={articles} />
        </div>
      </>
    );
}

export default ArtigleSorting;