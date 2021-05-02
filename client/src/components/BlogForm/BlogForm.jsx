import { useState } from "react";
// import { useSelector } from "react-redux";

import FileBase64 from "../FileBase64/FileBase64";

import "./BlogForm.css";

const BlogForm = () => {
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    description: "",
    body: "",
    categories: "",
    author: "",
    image: "",
  });
  const { title, description, body, author } = blogFormData;
  // const { categories } = useSelector((state) => state.categoriesState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBlogFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(blogFormData.categories);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-input-container">
        <input
          className="blog-input"
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          id="blog-title-input"
          placeholder="Title*"
        />
        <input
          className="blog-input"
          type="text"
          name="author"
          value={author}
          onChange={handleChange}
          id="blog-author-input"
          placeholder="Author*"
        />
        <textarea
          className="blog-input"
          name="description"
          value={description}
          onChange={handleChange}
          id="blog-desc-input"
          placeholder="Description*"
        ></textarea>
        <textarea
          className="blog-input"
          name="body"
          value={body}
          onChange={handleChange}
          id="blog-body-input"
          placeholder="Content*"
        ></textarea>
        <small>* required fields</small>
        <FileBase64
          className="blog-input"
          id="blog-image-input"
          onDone={(fileDataURL) =>
            setBlogFormData((prevState) => {
              return {
                ...prevState,
                image: fileDataURL,
              };
            })
          }
        />
      </div>
      <div className="blog-publish-button-container">
        <button id="blog-publish-button" type="submit">
          Publish
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
