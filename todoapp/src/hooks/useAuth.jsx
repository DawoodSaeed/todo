import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { userLogin, userRegister } from "../services/UserService";
import { TodoContext } from "../context/todoContext";

const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const { setError } = useContext(TodoContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = ({
    username,
    email,
    registerEmail,
    password,
    newPassword,
    confirmPassword,
  }) => {
    setLoading(true);
    if (registerEmail && password) {
      userLogin(registerEmail, password)
        .then(({ user, token }) => {
          setUser(user, token);
          setLoading(false);
        })
        .catch((ex) => {
          if (ex.response) {
            setError(ex.response.data);
          }
          setLoading(false);
        });
    }
    if (username && email && newPassword) {
      if (newPassword !== confirmPassword) {
        setError("Password and confrim password should be the same");
        setLoading(false);
        return;
      }
      userRegister(username, email, newPassword, confirmPassword)
        .then(({ user, token }) => {
          setUser(user, token);
          setLoading(false);
          window.location.href = "/";
        })
        .catch((ex) => {
          if (ex.response) {
            setError(ex.response.data);
          }
          setLoading(false);
        });
    }
  };

  return {
    handleSubmit,
    submitHandler,
    register,
    errors,
    loading,
  };
};

export default useLoginSubmit;
