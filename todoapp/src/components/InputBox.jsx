import styled from "styled-components";

const InputWrapper = styled.div`
  margin-bottom: 15px;
  z-index: 1000;
  position: relative;
  display: inline-block;
  color: #ffffff;
  width: 100%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.0001) 100%
  );
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.157326),
    inset 0px -2px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5.43656px);

  border-radius: 8px;
  overflow: hidden;
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  padding: 9px;
  border: none;
  /* margin-left: 5px; */
  font: inherit;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: #fff;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    /* Set the desired background color */
    background-color: #fff !important;
    /* Add any additional styles */
    /* ... */
    appearance: inherit;
  }
`;

// eslint-disable-next-line react/prop-types
const InputBox = ({ register, placeholder, label, pattern, type, name }) => {
  return (
    <InputWrapper>
      <Input
        {...register(`${name}`, {
          required: `${label} is required!`,
          pattern: pattern,
        })}
        type={type}
        placeholder={placeholder}
        name={name}
        multiple
        accept="image/*"
        autocomplete="chrome-off"
      />
    </InputWrapper>
  );
};

export default InputBox;
