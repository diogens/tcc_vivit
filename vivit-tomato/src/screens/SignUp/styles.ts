import styled, { css } from 'styled-components/native'

export const Wrapper = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.theme_colors.back};
  `}
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 30px;
`

export const CreateAccountButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
`
