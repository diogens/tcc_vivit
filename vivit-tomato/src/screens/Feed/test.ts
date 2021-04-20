import { render, screen } from '@testing-library/react'

import Feed from '.'

describe('<Feed />', () => {
  it('should render the heading', () => {
    const { container } = render(<Feed />)

    expect(screen.getByRole('heading', { name: /Feed/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})