import styled from 'styled-components/native'
import theme from '../../styles/theme'
import { ButtonProps } from '.'

export const Wrapper = styled.View<ButtonProps>`
  background: ${({ color }) =>
    color === '#fff' ? theme.theme_colors.tomato : '#fff'};
  width: 100px;
  height: 40px;
  margin-top: 15px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  border-left-width: 5px;
  border-right-width: 5px;
`
