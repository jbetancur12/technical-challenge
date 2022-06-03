import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import './Dropdown.css'

export default function Dropdown(props) {
  return (
    <div className="dropdown">
      <button className="dropbtn">{props.name}</button>
      <svg
        x="0"
        y="0"
        viewBox="0 0 14 8"
        fill="none"
        className="dropdown-iconChevon">
        <path d="M1,1l6.2,6L13,1"></path>
      </svg>
      <div className="dropdown-content">
        {props.data.map((prop) => (
          <Link key={prop.id} to={prop.url} className={prop.class || ''}>
            {prop.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
