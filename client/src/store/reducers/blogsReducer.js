const initState = {
  blogs: [],
  isLoading: false,
  errors: [],
};

const blogsReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_BLOGS":
    case "ADD_COMMENT":
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    case "GET_BLOGS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        blogs: payload,
        errors: [],
      };
    case "ADD_COMMENT_SUCCESS":
      const { blogId, comment } = payload;
      const blog = state.blogs.find(({ _id }) => _id === blogId);
      blog.comments.unshift(comment);
      const blogs = [...state.blogs];
      const index = blogs.map(({ _id }) => _id).indexOf(blogId);
      blogs[index] = blog;
      return {
        ...state,
        isLoading: false,
        blogs,
      };
    case "GET_BLOGS_FAIL":
    case "ADD_COMMENT_FAIL":
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };
    default:
      return state;
  }
};

export default blogsReducer;
