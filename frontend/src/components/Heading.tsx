import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  element: 'h1' | 'h2' | 'h3';
  color: 'light' | 'dark';
};

const colors = {
  light: '#fff',
  dark: '#000',
};

const StyledHeading = styled(({ element: Component, children, ...props }) => (
  <Component {...props}>{children}</Component>
))`
  text-align: ${(p: Props) => p.align};
  color: ${(p: Props) => colors[p.color]};
`;

const Heading = ({ children, align, element, color }: Props) => {
  return (
    <StyledHeading element={element} align={align} color={color}>
      {children}
    </StyledHeading>
  );
};

Heading.defaultProps = {
  element: 'h2',
  align: 'left',
  color: 'dark',
};

export default Heading;
