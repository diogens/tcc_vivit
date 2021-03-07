import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { Feed } from '.'

describe('examples of some things', () => {
  test('Teste 2', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Feed />)
    const famousProgrammerInHistory = 'Ada Lovelace'

    const input = getByTestId('input')
    fireEvent.changeText(input, famousProgrammerInHistory)

    const button = getByText('Print Username')
    fireEvent.press(button)

    await waitFor(() => expect(queryByTestId('printed-username')).toBeTruthy())

    expect(getByTestId('printed-username').props.children).toBe(
      famousProgrammerInHistory
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
