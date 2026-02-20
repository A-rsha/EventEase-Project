import { Link } from 'react-router-dom'
import { MdMenu, MdClose } from "react-icons/md"
import { FaUser } from "react-icons/fa"
import { useState } from 'react'

function Navbar() {

  const [open, setOpen] = useState(false)

  return (
    <nav className="relative">

      <div className='flex justify-between items-center py-6 w-full fixed top-0 z-50 backdrop-blur-md px-6 '>

        <h1 className='text-5xl  text-fuchsia-700! hover:text-pink-500!'>

          EventEase
        </h1>

        <div className='hidden md:flex items-center gap-6 font-semibold'>
          <Link className="no-underline! text-fuchsia-950! hover:text-pink-500!" to='/'>HOME</Link>
          <Link className="no-underline! text-fuchsia-950! hover:text-pink-500!" to='/events'>EVENTS</Link>
          <Link className="no-underline! text-fuchsia-950! hover:text-pink-500!" to='/comingsoon'>COMING SOON</Link>
          <Link className="no-underline! text-fuchsia-950! hover:text-pink-500!" to='/calendar'>CALENDAR</Link>
          <Link className="no-underline! text-fuchsia-950! hover:text-pink-500!" to='/about'>ABOUT</Link>
        </div>



        <div className='flex items-center gap-3'>
          <Link to="/login">
            <button className="text-xl hover:bg-fuchsia-950 hover:text-white rounded-full p-2 transition">
              <FaUser />
            </button>
          </Link>

          <Link
            to='/ticket'
            className='bg-fuchsia-950 text-white px-2 py-2 rounded hover:bg-pink-500 transition no-underline!'  >
            BUY TICKET
          </Link>


          <div className='md:hidden'>
            {open ? (
              <MdClose
                className='text-3xl cursor-pointer '
                onClick={() => setOpen(false)}
              />
            ) : (
              <MdMenu
                className='text-3xl cursor-pointer no-underline'
                onClick={() => setOpen(true)}
              />
            )}
          </div>

        </div>

      </div>


      {open && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md py-6 shadow-lg">
          <div className="flex flex-col items-center gap-6 text-black font-semibold">

            <Link className="no-underline! text-fuchsia-950! hover:text-pink-500!" onClick={() => setOpen(false)} to="/">HOME</Link>
            <Link className="no-underline! text-fuchsia-950! hover:text-pink-500!" onClick={() => setOpen(false)} to="/events">EVENTS</Link>
            <Link className="no-underline! text-fuchsia-950! hover:text-pink-500!" onClick={() => setOpen(false)} to="/comingsoon">COMING SOON</Link>
            <Link className="no-underline! text-fuchsia-950! hover:text-pink-500!" onClick={() => setOpen(false)} to="/calendar">CALENDAR</Link>
            <Link className="no-underline! text-fuchsia-950! hover:text-pink-500!" onClick={() => setOpen(false)} to="/about">ABOUT</Link>

          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar
