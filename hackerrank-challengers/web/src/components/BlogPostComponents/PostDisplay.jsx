const PostDisplay = ({ 
    initialValues = [],
    handleDeleteValueInput
}) => {
    return (
        <div 
            data-testid="posts-container" 
            className="flex flex-wrap gap-4 justify-center"
        >
            {initialValues.length > 0 ? initialValues.map((post, i) => (
                <div 
                key={i} 
                className="p-4 border border-gray-300 rounded shadow-md w-60"
                >
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-gray-600">{post.description}</p>
                <button 
                    onClick={() => handleDeleteValueInput(i)} 
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Delete
                </button>
                </div>
            )) : null}
        </div>
    )
}

export default PostDisplay;