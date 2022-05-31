import React, { useState } from 'react'
import './Filter.css'

export default function Filter(props) {
  const typeOptions = [
    'All',
    'Public',
    'Private',
    'Source',
    'Fork',
    'Archived',
    'Mirrors'
  ]

  const languages = ['All']

  props.repos.forEach((repo) =>
    languages.includes(repo.language)
      ? null
      : repo.language && languages.push(repo.language)
  )

  const languageOptions = languages.map((language) => (
    <option value={language} key={language}>
      {language}
    </option>
  ))

  const onChangeHandler = (e) => {
    props.setSearch({ ...props.search, [e.target.id]: e.target.value })
  }

  return (
    <div className="py-3 px-3">
      <div className="d-flex flex-items-start">
        <form className="filter-search" onChange={onChangeHandler}>
          <div className="d-flex flex-column flex-lg-row ">
            <div className="mb-1 mb-md-0 mr-md-3 filter-flex_auto">
              <input
                type="text"
                className="filter-search_input"
                placeholder="Find a repository..."
                id="input"
              />
            </div>
            <div className="d-flex flex-wrap select_mobile">
              {' '}
              <select name="" id="language" className="select-language">
                <option value="">Language</option>
                {languageOptions}
              </select>
              <select name="" id="type" className="select-type">
                <option>Type</option>
                {typeOptions.map((option) => (
                  <option key={option} value={option.toLocaleLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
