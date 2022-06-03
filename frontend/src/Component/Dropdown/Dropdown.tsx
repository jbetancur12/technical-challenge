import { Link } from 'react-router-dom'

import './Dropdown.css'

interface Props {
  name: string
  data: Array<{
    id: number
    name: string
    url: string
    class?: string
  }>
}

export default function Dropdown ({ name, data }: Props): JSX.Element {
  return (
    <div className='dropdown'>
      <button className='dropbtn'>{name}</button>
      <svg
        x='0'
        y='0'
        viewBox='0 0 14 8'
        fill='none'
        className='dropdown-iconChevon'
      >
        <path d='M1,1l6.2,6L13,1' />
      </svg>
      <div className='dropdown-content'>
        {data.map((prop) => (
          <Link key={prop.id} to={prop.url} className={prop.class ?? ''}>
            {prop.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
