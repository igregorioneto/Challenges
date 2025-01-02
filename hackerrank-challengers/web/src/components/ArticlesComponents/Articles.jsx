const Articles = ({ articles = [] }) => {
    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border border-gray-200">Title</th>
                <th className="px-4 py-2 border border-gray-200">Upvotes</th>
                <th className="px-4 py-2 border border-gray-200">Date</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((article, i) => (
                <tr 
                    className={`text-left ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`} 
                    data-testid="article" 
                    key={i}
                >
                    <td className="px-4 py-2 border border-gray-200" data-testid="article-title">
                    {article.title}
                    </td>
                    <td className="px-4 py-2 border border-gray-200" data-testid="article-upvotes">
                    {article.upvotes}
                    </td>
                    <td className="px-4 py-2 border border-gray-200" data-testid="article-date">
                    {article.date}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}

export default Articles;