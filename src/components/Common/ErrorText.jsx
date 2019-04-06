import styled from 'styled-components';
import { Text } from 'rebass';
import { colors } from '../../util/themeAx';

const ErrorText = styled(Text)`
  display: block;
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  height: 15px;
  color: ${colors('red')};
`;

export default ErrorText;
