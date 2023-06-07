import styled from "styled-components";
import InputBox from "../components/InputBox";
import useLoginSubmit from "../hooks/useAuth";
import AppButton from "../components/AppButton";
import { ColorRing } from "react-loader-spinner";
import Notification from "../components/Notification";
import Error from "../components/Error";
import { useContext } from "react";
import { TodoContext } from "../context/todoContext";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.label`
  text-align: "left";
  font-weight: 600;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const LoginHeading = styled.h1`
  font-size: 40px;
  font-weight: 800;
  text-transform: uppercase;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Anchor = styled(Link)`
  color: rgb(179, 156, 150);
  font-weight: bold;
`;
const Login = () => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit();

  const { state } = useContext(TodoContext);
  return (
    <Container>
      <LoginHeading>TODO App </LoginHeading>

      <form onSubmit={handleSubmit(submitHandler)}>
        <InputWrapper>
          <Label>Enter Email: </Label>
          <InputBox
            register={register}
            label="Email"
            name="registerEmail"
            type="email"
          />
          <Error errorName={errors.registerEmail} />
        </InputWrapper>

        <InputWrapper>
          <Label>Enter Password: </Label>
          <InputBox
            register={register}
            label="Password"
            name="password"
            type="password"
          />
          <Error errorName={errors.password} />
        </InputWrapper>

        {!loading ? (
          <AppButton type="submit" text="login" />
        ) : (
          <Loader>
            <ColorRing
              visible={loading}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={[
                "rgba(117, 169, 149, 0.5)",
                "rgba(117, 169, 149, 0.6)",
                "rgba(117, 169, 149, 0.7)",
                "rgba(117, 169, 149, 0.8)",
                "rgba(117, 169, 149, 0.9)",
              ]}
            />
          </Loader>
        )}
      </form>
      <p>
        Doesnt have an account? <Anchor to="/register">Register Now!</Anchor>
      </p>
      {state.error && <Notification />}
    </Container>
  );
};

export default Login;
