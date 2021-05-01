import { render, screen } from '@testing-library/react'

import Blablabla from '.'

describe('<Blablabla />', () => {
  it('should render the heading', () => {
    const { container } = render(<Blablabla />)

    expect(screen.getByRole('heading', { name: /Blablabla/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})