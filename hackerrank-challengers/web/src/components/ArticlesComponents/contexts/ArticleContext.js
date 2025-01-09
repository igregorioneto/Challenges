const { useContext, useState, useEffect, createContext } = require("react");

const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState(null);
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
        <ArticleContext.Provider value={{ 
            articles, 
            loading,
            error,
            handleMostUpvoted,
            handleMostRecent
        }}>
            { children }
        </ArticleContext.Provider>
    );
}

export const useArticle = () => useContext(ArticleContext);