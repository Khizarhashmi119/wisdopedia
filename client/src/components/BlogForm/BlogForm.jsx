import React, { useState } from "react";

const BlogForm = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    body: "",
    categories: "",
    author: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name);
    console.log(value);

    setBlogData((prevState) => {
      return {
        ...prevState,
      };
    });
  };

  return (
    <form>
      <input
        type="text"
        name="title"
        value={blogData.title}
        onChange={handleChange}
        id="blog-title-input"
        placeholder="Title"
      />
      <textarea
        type="text"
        name="desc"
        value={blogData.description}
        onChange={handleChange}
        id="blog-desc-input"
        placeholder="Description"
      ></textarea>
      <textarea
        type="text"
        name="body"
        value={blogData.body}
        onChange={handleChange}
        id="blog-body-input"
      ></textarea>
      <input
        type="text"
        name="author"
        value={blogData.author}
        onChange={handleChange}
        id="blog-author-input"
        placeholder="Author"
      />
      <label htmlFor="blog-image-input">Image: </label>
      <input type="file" name="image" id="blog-image-input" />
      <button type="submit">Publish</button>
    </form>
  );
};

export default BlogForm;
