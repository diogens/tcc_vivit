import { render, screen } from '@testing-library/react'

import Drawer from '.'

describe('<Drawer />', () => {
  it('should render the heading', () => {
    const { container } = render(<Drawer />)

    expect(screen.getByRole('heading', { name: /Drawer/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})