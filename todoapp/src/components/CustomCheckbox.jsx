import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import PropTypes from "prop-types";

const CheckboxWrapper = styled.label`
  display: inline-block;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => (props.checked ? "#6d4c41" : "transparent")};
  border: 2px solid #6d4c41;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    display: ${(props) => (props.checked ? "block" : "none")};
    color: #fff;
    width: 12px;
    height: 12px;
  }
`;

const Checkbox = ({ checked, onChange }) => {
  return (
    <CheckboxWrapper>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked}>
        {checked && <FaCheck />}
      </StyledCheckbox>
    </CheckboxWrapper>
  );
};

export default Checkbox;
Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
