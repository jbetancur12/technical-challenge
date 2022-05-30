import React from 'react'
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
  ].map((type) => (
    <option value={type.toLowerCase()} key={type}>
      {type}
    </option>
  ))

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
  return (
    <div className="py-3 px-3">
      <div className="d-flex flex-items-start">
        <form className="filter-search">
          {/* <label for="" className="filter-search_field">
            <input
              type="text"
              className="filter-search_input"
              placeholder="Find a repository..."
            />
          </label> */}
          <div className="d-flex flex-column flex-lg-row ">
            <div className="mb-1 mb-md-0 mr-md-3 filter-flex_auto">
              <input
                type="text"
                className="filter-search_input"
                placeholder="Find a repository..."
              />
            </div>
            <div className="d-flex flex-wrap mt-3">
              {' '}
              <select name="" id="select-language">
                <option value="">Language</option>
                {languageOptions}
              </select>
              <select name="" id="select-type">
                <option>Type</option>
                {typeOptions}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
