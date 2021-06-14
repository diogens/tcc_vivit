import styled, { css } from 'styled-components/native'

export const Wrapper = styled.View`
  ${({ theme }) => css`
    height: 100%;
    justify-content: center;
    align-items: center;
  `}
`

export const WrapperDetails = styled.ScrollView`
  ${({ theme }) => css`
    height: 100%;
    padding: 20px;
    position: absolute;
    z-index: -2;
  `}
`
