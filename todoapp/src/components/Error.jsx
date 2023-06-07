import styled from "styled-components";

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;
// eslint-disable-next-line react/prop-types
const Error = ({ errorName }) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {errorName && (
        // eslint-disable-next-line react/prop-types
        <ErrorMessage>{errorName.message}</ErrorMessage>
      )}
    </>
  );
};

export default Error;
