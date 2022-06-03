import React from 'react'
import './Pagination.css'

interface Props {
  page: number
  repoCount: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function (props: Props): JSX.Element {
  const onClickNext = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    props.setPage(props.page + 1)
  }

  const onClickPrevious = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    if (props.page > 1) {
      props.setPage(props.page - 1)
    }
  }
  return (
    <div className='pagination-groupButtons'>
      <button
        className='pagination-groupButtons_item'
        disabled={props.page <= 1}
        onClick={onClickPrevious}
      >
        Previous
      </button>
      <button
        className='pagination-groupButtons_item'
        disabled={props.repoCount < 30}
        onClick={onClickNext}
      >
        Next
      </button>
    </div>
  )
}
