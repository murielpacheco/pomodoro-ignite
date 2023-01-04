import styled from 'styled-components';

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }

`;

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }
  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: ${props => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  
`;

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${props => props.theme['gray-100']};
  display: flex;
  flex: 1;
  
  span {
    background: ${props => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
width: 4rem;
  padding: 2rem 0;
  color: ${props => props.theme['green-500']};
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

export const CountdownButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  background: ${props => props.theme['green-500']};
  color: ${props => props.theme['gray-100']};

  &:hover {
    background: ${(props) => props.theme['green-700']};
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

`;