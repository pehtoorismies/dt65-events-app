import styled from 'styled-components';
import {colors} from '../../util/themeAx';


const Input = styled.input`
  width: 100%;
  height: ${props => props.height}px;
  padding: 10px 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  outline: none;
  caret-color: ${colors('lightgray')};
  font-size: 16px;
  &:focus {
    border: 1px solid ${colors('lightgray')};;
  }
  ::placeholder {
    font-weight: bold;
    color: ${colors('lightgray')};;
  }
`;

Input.defaultProps = {
  height: 20,
}

export default Input;

