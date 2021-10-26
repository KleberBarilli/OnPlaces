import styled from 'styled-components';

export const PageActions = styled.div`
  display:flex;
  align-items:center;
  justify-content: center;

  button{
    outline:0;
    border:0;
    background: #222;
    color: #FFF;
    padding: 5px 10px;
    border-radius: 4px;

    &:disabled{
      cursor: not-allowed;
      opacity: 0.5;
    }

  }

`;
