import { render } from '@testing-library/react'
import Footer from './Footer'

describe('Component Mounted', () => {
  it('renders the component', () => {
    const { container } = render(<Footer />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
