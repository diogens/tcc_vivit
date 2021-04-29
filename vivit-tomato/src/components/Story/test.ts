import { render, screen } from '@testing-library/react'

import Story from '.'

describe('<Story />', () => {
  it('should render the heading', () => {
    const { container } = render(<Story />)

    expect(screen.getByRole('heading', { name: /Story/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})