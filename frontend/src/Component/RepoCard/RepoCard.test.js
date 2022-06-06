import { render, screen } from '@testing-library/react'
import RepoCard from './RepoCard'
import repoJSON from './repo.json'
import { BrowserRouter } from 'react-router-dom'

test('Render props', () => {
  render(
    <BrowserRouter>
      <RepoCard repo={repoJSON} username="Jorge" />
    </BrowserRouter>
  )
})

describe('Component Mounted', () => {
  it('renders the component', () => {
    const { container } = render(
      <BrowserRouter>
        <RepoCard repo={repoJSON} username="Jorge" />
      </BrowserRouter>
    )
    screen.logTestingPlawygroundURL()
    expect(container.firstChild).toMatchSnapshot()

    screen.getByText(
      /📈 uptime monitor and status page for ale ornelas figueroa, powered by @upptime/i
    )
  })
})
