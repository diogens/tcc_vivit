import styled, {css} from 'styled-components';
/* import { Button as Base } from '@buffetjs/core'; */

const Button = styled.button`
  width: 100%;
  text-transform: ${({ textTransform }) => textTransform};
  border-radius: 10px;
  height: 50px;
  ${({theme}) =>css`
    background-color: ${theme.main.colors.vivitD.PersioanGreen};
    color: ${theme.main.colors.vivitD.mediumChampagne};
  `}
  transition: background-color 0.5s;

  &:hover{
    ${({theme}) =>css`
      background-color: ${theme.main.colors.vivitD.BurntSienna};
      color: ${theme.main.colors.vivitD.orangeDark};
    `}
  }

`;

Button.defaultProps = {
  color: 'primary',
  type: 'button',
  textTransform: 'none',
};

export default Button;
