import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { profileInterface, reposInterface } from '../interfaces/interfaces'
import Filter from './Filter/Filter'
import Footer from './Footer/Footer'
import Pagination from './Pagination/Pagination'
import ProfileInformation from './ProfileInformation/ProfileInformation'
import RepoCard from './RepoCard/RepoCard'
import Spinner from './Spinner/Spinner'

interface Props {
  setRepositories: (n: number) => void
}

export interface Search {
  language: string
  type: string
  input: string
}

interface profileFecthed {
  data: profileInterface
}

interface reposFecthed {
  data: reposInterface[]
  status: string
}

const Main = ({ setRepositories }: Props): JSX.Element => {
  const API_URL = 'https://api.github.com/'
  const { username } = useParams<{ username: string }>()

  const [search, setSearch] = useState<Search>({
    language: '',
    type: '',
    input: ''
  })
  const [page, setPage] = useState(1)

  const userFetch = useFetch(`${API_URL}users/${username}`)
  const reposFetch = useFetch(
    `${API_URL}users/${username}/repos?sort=updated&page=${page}`
  )

  const { data: user }: profileFecthed = userFetch
  const { data: repos, status: loading }: reposFecthed = reposFetch

  const reposSearch: reposInterface[] = repos.filter((repo) => {
    const languageFilter =
      search.language === 'All' || search.language === ''
        ? true
        : search.language === repo.language

    const typeFilter =
      typeof repo[search.type as keyof typeof repo] === 'undefined'
        ? true
        : repo[search.type as keyof typeof repo]

    return (
      repo.name.toLowerCase().includes(search.input.toLowerCase()) &&
      languageFilter &&
      typeFilter
    )
  })

  if (userFetch.status === 'fetched') setRepositories(user.public_repos)

  return (
    <Container>
      <Row>
        <Col xs={12} lg={3}>
          {user != null && <ProfileInformation profile={user} />}
        </Col>
        <Col style={{ minHeight: '1000px' }}>
          <Filter repos={repos} search={search} setSearch={setSearch} />
          {loading !== 'fetched' ? (
            <div
              className='d-flex d-flex justify-content-center'
              style={{ marginTop: 250 }}
            >
              <Spinner />
            </div>
          ) : (
            reposSearch.map((repo) => (
              <div key={repo.name}>
                <RepoCard repo={repo} username='Jorge' />
                <hr className='repo-line' />
              </div>
            ))
          )}
        </Col>
      </Row>
      <Pagination setPage={setPage} page={page} repoCount={repos.length} />
      <Footer />
    </Container>
  )
}

export default Main
