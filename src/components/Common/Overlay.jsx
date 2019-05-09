// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  children: string,
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 2;
`;


const Overlay = (props: Props) => {
  const { children } = props;
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

Overlay.defaultProps = {
 
};

export default Overlay;
