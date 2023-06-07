import { useContext, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { TodoContext } from "../context/todoContext";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const ToastWrapper = styled.div`
  position: absolute;
  background: #fff;
  color: #333;
  padding: 21px;
  border-radius: 8px;
  z-index: 100000;
`;

const ToastHeader = styled(Toast.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToastHeaderString = styled.strong`
  flex-grow: 1;
  text-transform: uppercase;
  font-weight: bold;
`;

const ToastMessage = styled(Toast.Body)`
  font-weight: 500;
  color: ${(props) => (props.error ? "red" : "green")};
`;
const Notification = () => {
  const {
    state: { error },
    setLoading,
    setError,
    dispatch,
  } = useContext(TodoContext);

  useEffect(() => {
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const onCloseHandler = () => {
    setError("");
  };
  return (
    <>
      <ToastWrapper aria-live="polite" aria-atomic="true">
        <ToastContainer
          className="p-3"
          position={"middle-center"}
          style={{ zIndex: 1 }}
        >
          <Toast>
            <ToastHeader closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <ToastHeaderString className="me-auto">
                Notication
              </ToastHeaderString>
              <small>
                <FaTimes onClick={onCloseHandler} />
              </small>
            </ToastHeader>
            <ToastMessage error={error}>
              <span>{error ? "Error" : "SUCCESS"}: </span>
              <span> {error && <span>{error}</span>}</span>
            </ToastMessage>
          </Toast>
        </ToastContainer>
      </ToastWrapper>
    </>
  );
};

export default Notification;
