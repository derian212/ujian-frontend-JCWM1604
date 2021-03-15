import axios from "axios";
import { API_URL } from "../../helper";

//* without thunk
export const CartAction = (input) => {
  return {
    type: "UPDATECART",
    cart: input,
  };
};

export const LoginAction = (input) => {
  return {
    type: "LOGIN",
    payload: input,
  };
};

export const LogoutAction = () => {
  return {
    type:"LOGOUT",
  };
};

export const ResetAction = () => {
  return {
    type: "RESET",
  };
};

export const ResetActionthunk = () => {
  return (dispatch) => {
    dispatch({ type: "RESET" });
  };
};

export const ErrorAction = (errmess) => {
  return {
    type: "ERROR",
    error: errmess,
  };
};
export const LoadingAction = () => {
  return {
    type: "LOADING",
  };
};

export const LoginActionThunk = (input) => {
  var { username, password } = input;
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`${API_URL}/users?username=${username}&password=${password}`)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("id", res.data[0].id);
          dispatch({ type: "LOGIN", payload: res.data[0] });
        }
      })
      .catch((err) => {
        // console.log(err.response.statusText);
        dispatch({ type: "ERROR", error: "server error" });
      });
  };
};

export const RegActionThunk = (input) => {
  return (dispatch) => {
    var { username, password } = input;
    let data = {
      username,
      password,
      role: "users",
    };
    if (password) {
      dispatch({ type: "LOADING" });
      axios
        .get(`${API_URL}/users?username=${username}`)
        .then((res1) => {
          let validation = new RegExp("^(?=.*[a-z])(?=.*[0-9])").test(password)
          if (res1.data.length) {
            dispatch({ type: "ERROR", error: "username telah terdaftar" });
          } else if (password.length < 6) {
            dispatch({ type: "ERROR", error: "password minimal 6 karakter" })
          }
          else if (validation == false) {
            dispatch({ type: "ERROR", error: "password harus mengandung angka, uppercase, lowercase" })
          }
          else if (!username && !password) {
            dispatch({ type: "ERROR", error: "data harus diisi" })
          } else if (!username) {
            dispatch({ type: "ERROR", error: "username harus diisi" })
          }
            else {
            axios
              .post(`${API_URL}/users`, data)
              .then((res2) => {
                console.log(res2.data);
                localStorage.setItem("id", res2.data.id);
                dispatch({ type: "LOGIN", payload: res2.data });
              })
              .catch((err) => {
                dispatch({ type: "ERROR", error: "server error" });
              });
          }
        })
        .catch((err) => {
          dispatch({ type: "ERROR", error: "server error" });
        });
    } else {
      dispatch({ type: "ERROR", error: "confirm dan pass harus sama" });
    }
  };
};
