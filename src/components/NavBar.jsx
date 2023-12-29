import React from 'react'
import logo from"/images/logo.png"
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <header className='h-16 px-10 shadow-sm'>
         <nav className='flex justify-between items-center xl:w-9/12 mx-auto py-3'>
            <Link to=""> <img src={logo} alt="" /> </Link>
            <div className='flex items-center gap-x-5'>
                <ul className='hidden xl:flex  space-x-5 py-1 items-center font-medium '>
                    <li>
                        <NavLink to="/" > How it's Work?</NavLink>
                    </li>
                    <li>
                        <NavLink to="/" > Feature</NavLink>
                    </li>
                    <li>
                        <NavLink to="/" >About us</NavLink>
                    </li>

                </ul>
                <button className=' mt-2 xl:mt-0 font-medium py-1 px-5 border border-primary rounded'>Login</button>
            </div>
         </nav>

    </header>
  )
}

export default NavBar