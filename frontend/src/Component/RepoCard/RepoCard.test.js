import { render } from '@testing-library/react'
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
    const container = render(
      <BrowserRouter>
        <RepoCard repo={repoJSON} username="Jorge" />
      </BrowserRouter>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
