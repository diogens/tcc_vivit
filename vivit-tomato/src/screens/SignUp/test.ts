import { render, screen } from '@testing-library/react'

import SignUp from '.'

describe('<SignUp />', () => {
  it('should render the heading', () => {
    const { container } = render(<SignUp />)

    expect(screen.getByRole('heading', { name: /SignUp/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})