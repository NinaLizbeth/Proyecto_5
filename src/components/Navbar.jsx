import { Link } from "react-router-dom"
import { UserSvg } from "./UserSvg"
import { LoginModal } from "./LoginModal"
import { useDisclosure } from "@nextui-org/react"
import { CarritoBadge } from "./CarritoBadge"
import { useState, useContext, useEffect } from "react"
import { HeartNavbarSvg } from "./HeartNavbarSvg"
import { UserContext } from "../context/user/userContext.js"
import jwt_decode from "jwt-decode";
import { AvatarNavbar } from "./AvatarNavbar"




export const Navbar = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openBurger, setOpenBurger] = useState(false)
  const [state, dispatch] = useContext(UserContext)
  const [userData, setUserData] = useState(null)

  const onToggleBurgerMenu = () => {
    setOpenBurger(!openBurger)
  }

  const decodeUser = () => {
    const { token } = state
    if (token) {
      const decoded = jwt_decode(token);
      setUserData(decoded)
    } else {
      setUserData(null)
    }
  }

  useEffect(() => {
    decodeUser()
  }, [state])


  return (
    <>
      <nav className="bg- border-gray-200 dark:bg-gray-900 mt-10">
        <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4 ">
          <Link to="/" className="flex items-center">
            <img src="https://res.cloudinary.com/dt7h6qci4/image/upload/v1696551338/brigthbook_titulo_png_bmkxc1_b8guto.png" className=" h-10 mr-3" alt="Brightbooks Logo" />
            <span className="font-sevillana self-center text-2xl whitespace-nowrap dark:text-white"></span>
          </Link>
          <div className="flex md:order-2 items-center justify-center gap-3">
            <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-mooli" placeholder="Buscar..." />
            </div>
            <button onClick={onToggleBurgerMenu} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <button>
              {
                (userData)
                ? <AvatarNavbar/>
                : <UserSvg onClick={onOpen} />
              }
             
            </button>
            <Link to="/favorites">
              <HeartNavbarSvg />
            </Link>
            <CarritoBadge />
            <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />

          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 font-mooli" id="navbar-search">
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-violet-300 md:bg-transparent md:text-violet-700 md:p-0 md:dark:text-violet-500" aria-current="page">Inicio</Link>
              </li>
              <li>
                <Link to="/nosotros" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-700 md:p-0 md:dark:hover:text-violet-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Nosotros</Link>
              </li>
              <li>
                <Link to="/productos" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Productos</Link>
              </li>
            </ul>
          </div>
        </div>
        {(openBurger)
          ? <div className="bg-gradient-to-r from-violet-500 w-full h-screen absolute z-50 backdrop-blur-md font-cookie">
            <ul className="flex flex-col justify-center items-center gap-5 mt-5">
              <Link onClick={onToggleBurgerMenu} className="text-2xl text-white" to="/">Inicio</Link>
              <hr className="w-full" />
              <Link onClick={onToggleBurgerMenu} className="text-2xl text-white" to="/nosotros">Nosotros</Link>
              <hr className="w-full" />
              <Link onClick={onToggleBurgerMenu} className="text-2xl text-white" to="/productos">Productos</Link>
              <hr className="w-full" />
              <a href="#footerId" onClick={onToggleBurgerMenu} className="text-2xl text-white">Tienda física y horarios</a>
              <hr className="w-full" />
              <a href="#footerId" onClick={onToggleBurgerMenu} className="text-2xl text-white" >Contacto</a>
              <hr className="w-full" />
              <Link onClick={onToggleBurgerMenu} className="text-2xl font-bold cursor-pointer text-violet-600">Cerrar</Link>
            </ul>
          </div>
          : <></>
        }
      </nav>
    </>
  )
}
