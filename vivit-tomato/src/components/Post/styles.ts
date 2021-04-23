import styled, { css } from 'styled-components/native'

export const Wrapper = styled.View`
  ${({ theme }) => css`
    /* background-color: ${theme?.colors?.charcoal}; */
    background-color: ${theme?.colors?.charcoal};
  `}
  height: 380px;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: row;
  border: 1px #fff;
`

export const WrapperContent = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  width: 82%;
`

export const WrapperAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 100px;
  background: #fff;
  border-color: #fff;
  border-width: 3px;
`

export const WrapperImage = styled.Image`
  width: 100%;
  height: 200px;
  background: #fff;
  border-radius: 10px;
`

export const WrapperAction = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`
