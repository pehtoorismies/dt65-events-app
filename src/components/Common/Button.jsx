import { Button } from 'rebass';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  display: inline-flex;
  height: ${props => props.height}px;
  border-radius: 8px;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;

  padding: 15px 25px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;

`;

Button.defaultProps = {
  height: 40,
};


export default StyledButton;
