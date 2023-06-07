import Cookies from "js-cookie";
import CowlarAPI from "../api/CowlarApi";

export const userLogin = async (email, password) => {
  const { user, token } = await CowlarAPI.post("/users/login", {
    email,
    password,
  });

  return {
    user,
    token,
  };
};

export const userRegister = async (
  username,
  email,
  password,
  confrimPassword
) => {
  const { user, token } = await CowlarAPI.post("/users/", {
    username,
    email,
    password,
    confrimPassword,
  });
  return {
    user,
    token,
  };
};

export const handleUpload = async (image) => {
  if (image) {
    const formData = new FormData();
    formData.append("image", image);
    let user = Cookies.get("user");
    if (user) user = JSON.parse(user);
    const data = await CowlarAPI.patch(`users/${user._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }
};

export const userLogout = async () => {};
