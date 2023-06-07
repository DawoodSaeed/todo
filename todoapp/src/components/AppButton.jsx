import styled from "styled-components";

const Button = styled.input`
  outline: none;
  border: none;
  background: linear-gradient(
    180deg,
    rgba(117, 169, 149, 0.8) 0%,
    rgba(77, 139, 134, 0.6) 100%
  );
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.157326),
    inset 0px -2px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5.43656px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 8px;
  width: 100%;
  height: 54px;
  margin-top: 20px;
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

// eslint-disable-next-line react/prop-types
const AppButton = ({ type, text }) => {
  return <Button type={type} value={text} />;
};

export default AppButton;
AppButton.defaultProps = {
  type: "button",
};
