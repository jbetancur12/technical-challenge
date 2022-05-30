import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserInfo } from '../help/request'

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
    <>
      <h1>{User.login}</h1>
      {Repos.map((r) => (
        <h2 key={r.name}>{r.name}</h2>
      ))}
    </>
  )
}
