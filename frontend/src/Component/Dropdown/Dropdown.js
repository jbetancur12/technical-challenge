import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import './Dropdown.css'

export default function Dropdown(props) {
  return (
    <div className="dropdown">
      <button className="dropbtn">{props.name}</button>
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
