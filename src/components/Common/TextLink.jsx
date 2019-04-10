
import styled from 'styled-components';
import { Text } from 'rebass';
import { colors } from '../../util/themeAx'

const TextLink = styled(Text)`
  color: ${colors('lightgray')};
  cursor: pointer;
  font-weight: 700;
  user-select: none;
`;

export default TextLink;