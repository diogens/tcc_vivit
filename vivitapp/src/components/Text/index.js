import styled, { css } from 'styled-components/native'
import theme from '../../styles/theme'

export const Text = styled.Text`
  color: ${({ color }) => (color ? color : theme.colors.black)};
  font-size: ${theme.font.sizesRN.large}px;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  text-align: justify;
  ${({ theme }) => css`
    font-family: ${theme.font.family};
  `}
`
