import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getUserInfo } from '../help/request'
import { profileInterface, reposInterface } from '../interfaces/interfaces'
import Filter from './Filter/Filter'
import Footer from './Footer/Footer'
import Pagination from './Pagination/Pagination'
import ProfileInformation from './ProfileInformation/ProfileInformation'
import RepoCard from './RepoCard/RepoCard'

interface Props {
  setRepositories: (n: number) => void
}

export interface Search {
  language: string
  type: string
  input: string
}

const Main = ({ setRepositories }: Props): JSX.Element => {
  const API_URL = 'https://api.github.com/'
  const { username } = useParams<{ username: string }>()
  const [User, setUser] = useState<profileInterface>()
  const [Repos, setRepos] = useState<reposInterface[]>([])
  const [search, setSearch] = useState<Search>({
    language: '',
    type: '',
    input: ''
  })
  const [page, setPage] = useState(1)

  const reposSearch: reposInterface[] = Repos.filter((repo) => {
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

  useEffect(() => {
    getUserInfo(`${API_URL}users/${username}`)
      .then((resp: profileInterface) => {
        setUser(resp)
        if (typeof resp.public_repos === 'number') {
          setRepositories(resp.public_repos)
        } else {
          setRepositories(0)
        }
      })
      .catch((err) => console.error(err))
  }, [username])

  useEffect(() => {
    getUserInfo(`${API_URL}users/${username}/repos?sort=updated&page=${page}`)
      .then((resp) => {
        setRepos(resp)
      })
      .catch((err) => console.error(err))
  }, [User, page])

  return (
    <Container>
      <Row>
        <Col xs={12} lg={3}>
          {User != null && <ProfileInformation profile={User} />}
        </Col>
        <Col>
          <Filter repos={Repos} search={search} setSearch={setSearch} />
          {reposSearch.length > 0 &&
            reposSearch.map((repo) => (
              <div key={repo.name}>
                <RepoCard repo={repo} username='Jorge' />
                <hr className='repo-line' />
              </div>
            ))}
        </Col>
      </Row>
      <Pagination setPage={setPage} page={page} repoCount={Repos.length} />
      <Footer />
    </Container>
  )
}

export default Main
