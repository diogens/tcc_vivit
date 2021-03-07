import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'

import { Marker }from '.'

describe('<Marker/>', () => {
  test('Deve fazer algo...', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Marker />)
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

  test('Deve fazer isso...', async () => {
    const { getByText } = render(<Marker />)
    expect(getByText('Marker')).toBeTruthy()
  })
})



