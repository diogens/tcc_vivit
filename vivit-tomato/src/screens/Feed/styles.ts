import styled, { css } from 'styled-components/native'

export const Wrapper = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    height: 100%;
    justify-content: center;
    align-items: center;
  `}
`
