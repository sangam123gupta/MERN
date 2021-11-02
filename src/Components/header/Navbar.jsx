import React from 'react'

import img1 from '../header/as.jpg'

import {Link} from 'react-router-dom'

import './NavbarStyle'
export default function Navbar() {
    return (
        <div className="container">
            <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">
      <img src={img1} alt="" width="40" height="35"/>
    </a>
  <form class="form-inline justify-content-start">

  <Link to='/addpost' >
    <button class="btn btn-outline-success my-2 my-sm-0 ml-1 mr-" type="submit">AddPost</button>

    </Link >

    <Link to='/register' >
  <button class="btn btn-outline-success my-2 my-sm-0 style  ml-1 mr-1" type="submit">Sign Up</button>

  </Link >

  <Link to='/login' >
    <button class="btn btn-outline-success my-2 my-sm-0  ml-1 mr-1" type="submit">Login</button>

    </Link >
  </form>
</nav>
        </div>
    )
}
