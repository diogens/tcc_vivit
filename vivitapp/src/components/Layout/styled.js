import styled, { css } from 'styled-components/native'

export const WrapperLayout = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.charcoal};
  `}
  flex: 1;
`
