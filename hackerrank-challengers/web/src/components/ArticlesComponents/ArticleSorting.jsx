import { useEffect, useState } from "react";
import Articles from "./Articles";
import { useArticle } from "./contexts/ArticleContext";

const ArtigleSorting = () => {
    const { articles, loading, error, handleMostUpvoted, handleMostRecent } = useArticle();

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