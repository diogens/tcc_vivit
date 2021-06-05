import { render, screen } from '@testing-library/react'

import SingIn from '.'

describe('<SingIn />', () => {
  it('should render the heading', () => {
    const { container } = render(<SingIn />)

    expect(screen.getByRole('heading', { name: /SingIn/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})