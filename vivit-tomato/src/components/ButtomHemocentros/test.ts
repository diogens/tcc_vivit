import { render, screen } from '@testing-library/react'

import ButtomHemocentros from '.'

describe('<ButtomHemocentros />', () => {
  it('should render the heading', () => {
    const { container } = render(<ButtomHemocentros />)

    expect(screen.getByRole('heading', { name: /ButtomHemocentros/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})