const Input = ({ 
        title, 
        description, 
        handleChangeTitle, 
        handleChangeDescription 
}) => {
    return (
        <div className="flex flex-col items-center space-y-3">
        <input 
            className="w-full border border-gray-300 p-2 rounded" 
            type="text" 
            placeholder="Enter Title" 
            value={title} 
            onChange={handleChangeTitle}
            data-testid="title-input" 
        />
        <textarea 
            className="w-full mt-3 border border-gray-300 p-2 rounded" 
            placeholder="Enter Description" 
            value={description} 
            onChange={handleChangeDescription}
            data-testid="description-input" 
        />
        </div>
    );
}

export default Input;