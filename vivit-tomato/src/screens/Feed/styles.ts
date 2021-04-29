import styled, { css } from 'styled-components/native'

export const Wrapper = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    height: 100%;
  `}
`
