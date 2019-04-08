import styled from 'styled-components';
import { colors } from '../../util/themeAx';

const BigInput = styled.input`
  width: 100%;
  height: ${props => props.height}px;
  padding: 5px;
  border: 0;
  border-bottom: 2px solid ${colors('lightgray')};
  background: none;
  outline: none;
  color: #2c1917;
  caret-color: ${colors('pink')};
  font-size: 30px;
  font-family: 'Exo', 'sans serif';
  font-weight: bold;
  &:focus {
    border-bottom: 2px solid ${colors('lightgray')};
  }
  ::placeholder {
    font-weight: bold;
    color: ${colors('lightgray')};
  }
`;

BigInput.defaultProps = {
  height: 30,
};

export default BigInput;
