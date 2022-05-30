import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getUserInfo } from '../help/request'
import Filter from './Filter/Filter'
import ProfileInformation from './ProfileInformation/ProfileInformation'
import RepoCard from './RepoCard/RepoCard'

export default function Main() {
  const API_URL = 'https://api.github.com/'
  const { username } = useParams()
  const [User, setUser] = useState([])
  const [Repos, setRepos] = useState([])
  useEffect(() => {
    getUserInfo(`${API_URL}users/${username}`).then((resp) => setUser(resp))
  }, [username])

  useEffect(() => {
    getUserInfo(`${API_URL}users/${username}/repos`).then((resp) =>
      setRepos(resp)
    )
  }, [User])
  return (
    <Container>
      <Row>
        <Col md={3}>{User && <ProfileInformation user={User} />}</Col>
        <Col>
          <Filter repos={Repos} />
          {Repos.length > 0 &&
            Repos.map((repo) => (
              <RepoCard r={repo} username={User.login} key={repo.name} />
            ))}
        </Col>
      </Row>
    </Container>
  )
}
