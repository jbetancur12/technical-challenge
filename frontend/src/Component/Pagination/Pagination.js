import React from 'react'
import './Pagination.css'

export default function (props) {
  const onClickNext = (e) => {
    e.preventDefault()
    props.setPage(props.page + 1)
  }

  const onClickPrevious = (e) => {
    e.preventDefault()
    if (props.page > 1) {
      props.setPage(props.page - 1)
    }
  }
  return (
    <div className="pagination-groupButtons">
      <button
        className="pagination-groupButtons_item"
        disabled={props.page <= 1}
        onClick={onClickPrevious}>
        Previous
      </button>
      <button
        className="pagination-groupButtons_item"
        disabled={props.repoCount < 30}
        onClick={onClickNext}>
        Next
      </button>
    </div>
  )
}
