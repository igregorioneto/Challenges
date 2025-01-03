import Input from "@/src/components/BlogPostComponents/Input";
import PostDisplay from "@/src/components/BlogPostComponents/PostDisplay";
import { useState } from "react";

const BlogPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [initialValues, setInitialValues] = useState([]);

  const handleChangeTitle = (event) => setTitle(event.target.value);
  const handleChangeDescription = (event) => setDescription(event.target.value);  

  const handleSetInput = () => {
    if (title.length === 0 || description.length === 0) {
      return;
    }
    setInitialValues([...initialValues, { title, description }])
    hancleClearInputs();
    return;
  }

  const hancleClearInputs = () => {
    setTitle("");
    setDescription("");
  }

  const handleDeleteValueInput = (index) => {
    setInitialValues((prev) => filterElementsByIndexForRemove(prev, index));
  }

  const filterElementsByIndexForRemove = (prev, index) => 
    prev.filter((_, i) => i !== index);

  return (
    <div className="text-center m-5">
      <div className="mb-5">
        <Input 
          title={title} 
          description={description} 
          handleChangeTitle={handleChangeTitle}
          handleChangeDescription={handleChangeDescription}
        />
        <button 
          onClick={handleSetInput} 
          data-testid="create-button" 
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </div>
      <div className="posts-section">
        <PostDisplay 
          initialValues={initialValues} 
          handleDeleteValueInput={handleDeleteValueInput}
        />
      </div>
    </div>
  );
}

export default BlogPost;