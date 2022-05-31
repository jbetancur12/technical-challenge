import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getUserInfo } from '../help/request'
import Filter from './Filter/Filter'
import Footer from './Footer/Footer'
import Pagination from './Pagination/Pagination'
import ProfileInformation from './ProfileInformation/ProfileInformation'
import RepoCard from './RepoCard/RepoCard'

export default function Main(props) {
  const API_URL = 'https://api.github.com/'
  const { username } = useParams()
  const [User, setUser] = useState([])
  const [Repos, setRepos] = useState([])
  const [search, setSearch] = useState({ language: '', type: '', input: '' })
  const [page, setPage] = useState(1)

  console.log(page)

  const reposSearch = Repos.filter((repo) => {
    if (search) {
      const languageFilter =
        search.language === 'All' || search.language === ''
          ? true
          : search.language === repo.language

      const typeFilter =
        typeof repo[search.type] === 'undefined' ? true : repo[search.type]

      console.log(typeof repo[search.type])
      return (
        repo.name.toLowerCase().includes(search.input.toLowerCase()) &&
        languageFilter &&
        typeFilter
      )
    }
    return true
  })

  console.log(search)

  useEffect(() => {
    getUserInfo(`${API_URL}users/${username}`).then((resp) => {
      setUser(resp)
      props.setRepositories(resp.public_repos)
    })
  }, [username])

  useEffect(() => {
    getUserInfo(`${API_URL}users/${username}/repos?page=${page}`).then((resp) =>
      setRepos(resp)
    )
  }, [User, page])

  return (
    <Container>
      <Row>
        <Col xs={12} lg={3}>
          {User && <ProfileInformation user={User} />}
        </Col>
        <Col>
          <Filter repos={Repos} search={search} setSearch={setSearch} />
          {reposSearch.length > 0 &&
            reposSearch.map((repo) => (
              <>
                <RepoCard
                  name={repo.name}
                  description={repo.description}
                  topics={repo.topics}
                  visibility={repo.visibility}
                  updated_at={repo.updated_at}
                  language={repo.language}
                  stargazers_count={repo.stargazers}
                  forks_counts={repo.forkers}
                  license={repo.license}
                  username={User.login}
                  key={repo.name}
                />
                <hr className="repo-line" />
              </>
            ))}
        </Col>
      </Row>
      <Pagination setPage={setPage} page={page} repoCount={Repos.length} />
      <Footer />
    </Container>
  )
}
