import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css';

export default function Navbar() {
  return(
    <>
    <nav className='nav shadow bg-body-tertiary rounded'>
    <a href='/' className='logo'>MyReactApp</a>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/To-Do List">To-Do List</Link></li>
    </ul>
    </nav>
    </>
  )
}
