import styled, { css } from 'styled-components/native'
import { lighten, desaturate } from 'polished'

export const Wrapper = styled.View``

export const Card = styled.TouchableOpacity`
  ${({ theme }) => css`
    background-color: ${theme.theme_colors.back};
    margin: 3px;
    background-color: #fff;
  `}
  border-radius: 10px;
  padding: 20px;
  background-color: ${({ status }) =>
    status ? 'rgba(233, 222, 222, 0.13)' : 'rgba(34,139,34, 0.33)'};
  border: ${({ status }) =>
    status
      ? 'rgba(233, 222, 222, 0.13)'
      : '1px solid rgba(255, 255, 255, 0.5)'};
`
export const CardContent = styled.View``
