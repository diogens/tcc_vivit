import { screen, render } from '@testing-library/react'
import { renderWithTheme } from '../../utils/tests/helpers'

import Form from '.'

describe('<Form/>', () => {
  it('should render the text', () => {
    const { container } = renderWithTheme(<Form />)

    expect(screen.getByText('Form')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})