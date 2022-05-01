import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 1.5rem;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;


export const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>
    hi
  </StyledButton>;
};
