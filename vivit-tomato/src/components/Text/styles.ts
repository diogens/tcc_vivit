import styled, { css } from 'styled-components/native'

import { TextProps } from '.'

export type WrapperProps = {
  size: boolean
  color: boolean
} & Pick<TextProps, 'size' | 'fontFamily' | 'color'>

const wrapperModifiers = {
  small: (theme) => css`
    font-size: ${theme.font.sizes.small}px;
  `,

  medium: (theme) => css`
    font-size: ${theme.font.sizes.medium}px;
  `,

  large: (theme) => css`
    font-size: ${theme.font.sizes.large}px;
  `,

  primary: (theme) => css`
    color: ${theme.theme_colors.primary};
  `,

  secondary: (theme) => css`
    color: ${theme.theme_colors.secondary};
  `,

  white: (theme) => css`
    color: ${theme.theme_colors.white};
  `,

  yellow1: (theme) => css`
    color: ${theme.theme_colors.yellow1};
  `,

  yellow2: (theme) => css`
    color: ${theme.theme_colors.yellow2};
  `,

  tomato: (theme) => css`
    color: ${theme.theme_colors.tomato};
  `
}

export const Wrapper = styled.Text<WrapperProps>`
  ${({ size, color, theme }) => css`
    font-family: ${theme.font.family.ubuntu_light};
    color: ${theme.colors.black};

    padding-top: 5px;
    padding-bottom: 5px;

    text-align: justify;

    ${!!size && wrapperModifiers[size](theme)};
    ${!!color && wrapperModifiers[color](theme)};
  `}
`
