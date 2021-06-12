import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

import {
  addBlogAction,
  updateBlogAction,
} from "../../redux/actions/blogsActions";

import "./BlogForm.css";

const BlogForm = ({ blog }) => {
  const [blogFormData, setBlogFormData] = useState({
    title: blog ? blog.title : "",
    tags: blog ? blog.tags.join(",") : "",
    description: blog ? blog.description : "",
    body: blog ? blog.body : "",
    checkedCategories: blog ? blog.categories.map((blog) => blog._id) : [],
    author: blog ? blog.author : "",
    image: null,
  });
  const { categories, isLoading: isCategoriesLoading } = useSelector(
    (state) => state.categoriesState
  );
  const { isLoading: isBlogLoading } = useSelector((state) => state.blogsState);
  const dispatch = useDispatch();
  const { title, description, tags, body, author, checkedCategories, image } =
    blogFormData;

  const inputHandleChange = (e) => {
    const { name, value } = e.target;

    setBlogFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const categoriesInputHandleChange = (e) => {
    const { value } = e.target;

    if (!checkedCategories.includes(value)) {
      setBlogFormData((prevState) => ({
        ...prevState,
        checkedCategories: [...checkedCategories, value],
      }));
    } else {
      setBlogFormData((prevState) => ({
        ...prevState,
        checkedCategories: checkedCategories.filter(
          (category) => category !== value
        ),
      }));
    }
  };

  const bodyHandleChange = (content, editor) => {
    setBlogFormData((prevState) => ({
      ...prevState,
      body: content,
    }));
  };

  const fileInputHandleChange = (e) => {
    setBlogFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    blog
      ? dispatch(
          updateBlogAction(blog._id, {
            title,
            description,
            tags,
            body,
            author,
            categories: checkedCategories.join(", "),
            image,
          })
        )
      : dispatch(
          addBlogAction({
            title,
            description,
            tags,
            body,
            author,
            categories: checkedCategories.join(", "),
            image,
          })
        );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="blog-publish-btn-container">
        <small>* required fields</small>
        <button
          id="blog-publish-btn"
          type="submit"
          disabled={
            !title ||
            !description ||
            !body ||
            !author ||
            checkedCategories.length === 0
          }
        >
          {isBlogLoading ? "Loading..." : "Publish"}
        </button>
      </div>
      <div className="input-container">
        <input
          id="blog-title-input"
          className="blog-input"
          type="text"
          name="title"
          value={title}
          placeholder="Title*"
          maxLength="200"
          onChange={inputHandleChange}
        />
        <input
          id="blog-author-input"
          className="blog-input"
          type="text"
          name="author"
          value={author}
          placeholder="Author*"
          onChange={inputHandleChange}
        />
        <input
          id="blog-tags-input"
          className="blog-input"
          type="text"
          name="tags"
          value={tags}
          placeholder="Tags*"
          onChange={inputHandleChange}
        />
        <textarea
          id="blog-desc-input"
          className="blog-input"
          name="description"
          value={description}
          placeholder="Description*"
          maxLength="150"
          onChange={inputHandleChange}
        ></textarea>
      </div>
      <Editor
        apiKey="ikkh91gpnwr70kvztwr6pn7w7xiaqkz47ls6z7ajhio3t7jz"
        init={{
          height: 300,
          menubar: true,
          plugins: `advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste help wordcount codesample image`,
          toolbar: `undo redo | formatselect | bold italic backcolor | codesample image media | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | "removeformat | preview | help`,
        }}
        value={body}
        onEditorChange={bodyHandleChange}
      />
      <fieldset className="categories-container">
        <legend>Categories*</legend>
        {!isCategoriesLoading ? (
          categories.length !== 0 ? (
            categories.map(({ _id, name }) => (
              <div className="category-input-container" key={_id}>
                <label htmlFor={_id}>{name}</label>
                <input
                  id={_id}
                  type="checkbox"
                  name={name}
                  value={_id}
                  defaultChecked={checkedCategories.includes(_id)}
                  onChange={categoriesInputHandleChange}
                />
              </div>
            ))
          ) : (
            <h2>No category yet.</h2>
          )
        ) : (
          <h2>Loading...</h2>
        )}
      </fieldset>
      <div className="file-input-container">
        <input
          id="blog-image-input"
          className="blog-input"
          type="file"
          onChange={fileInputHandleChange}
        />
      </div>
    </form>
  );
};

export default BlogForm;
