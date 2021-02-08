import axios from "axios";

const signInAdminAction = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SIGN_IN_ADMIN" });

      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      dispatch({ type: "SIGN_IN_ADMIN_SUCCESS", payload: response.data.token });
    } catch (error) {
      console.error(error);
    }
  };
};

const signOutAdminAction = () => {
  localStorage.removeItem("token");
  return { type: "SIGN_OUT_ADMIN" };
};

export { signInAdminAction, signOutAdminAction };
