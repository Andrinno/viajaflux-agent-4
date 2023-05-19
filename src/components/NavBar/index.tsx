import Link from 'next/link'
import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

const NavBar = ({ onColor }: { onColor: boolean }) => {
    const [openDrawer, setOpenDrawer] = useState(false)

    const toggleDrawer = () => {
        setOpenDrawer((prevState) => !prevState)
    }
    return (
        <>
            <div
                className={
                    'navbar p-0 fixed w-full text-primary z-50 transition-all duration-200 ' +
                    (!onColor ? 'bg-transparent' : 'bg-gray-100 shadow')
                }
            >
                <div className="w-full max-w-7xl mx-auto px-4 py-4">
                    <div className="navbar-start">
                        <a href="#home">
                            <h1 className="font-bold">Logo ou Nome</h1>
                            {/* <Image
                                src={LogoImg}
                                width={200}
                                height={45}
                                alt="logo"
                                // loading="lazy"
                                priority={true}
                                className="cursor-pointer w-24 md:w-24"
                            /> */}
                        </a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            <li>
                                <a
                                    className="active:text-warning"
                                    href="#como-funciona"
                                >
                                    Produto
                                </a>
                            </li>
                            <li>
                                <a
                                    className="active:text-warning"
                                    href="quem-somos"
                                >
                                    Quem somos
                                </a>
                            </li>
                            <li>
                                <a
                                    className="active:text-warning"
                                    href="#vender-milhas"
                                >
                                    Contato
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-end flex gap-3">
                        <Link
                            href={`${process.env.NEXT_PUBLIC_URL}/register`}
                            className="btn btn-primary normal-case text-base-100 hidden md:inline-flex"
                        >
                            Falar com um agente
                        </Link>
                        <button
                            aria-label="menu"
                            className="block md:hidden text-primary"
                            onClick={toggleDrawer}
                        >
                            <svg
                                className={
                                    'swap-off fill-current ' +
                                    (!onColor ? 'text-primary' : 'text-primary')
                                }
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512"
                            >
                                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <Drawer
                open={openDrawer}
                onClose={toggleDrawer}
                direction="right"
                duration={400}
                className="w-2/3"
            >
                <ul className="menu gap-5 w-full px-8 pt-10">
                    <li>
                        <Link className="active:text-warning" href="#">
                            Produto
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="active:text-warning"
                            href="/quem-somos"
                        >
                            Quem somos
                        </Link>
                    </li>
                    <li>
                        <Link className="active:text-warning" href="#">
                            Contato
                        </Link>
                    </li>

                    <Link
                        href="#"
                        className="btn btn-primary normal-case text-base-100"
                    >
                        Falar com um agente
                    </Link>
                </ul>
            </Drawer>
        </>
    )
}

export default NavBar
