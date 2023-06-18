/* eslint-disable prettier/prettier */
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

interface INavBar {
    onColor: boolean
    logo: string
    action_buttons: string
    phone: string
    email: string
}

const NavBar = (props: INavBar) => {
    const [openDrawer, setOpenDrawer] = useState(false)

    const toggleDrawer = () => {
        setOpenDrawer((prevState) => !prevState)
    }
    return (
        <>
            <div
                className={
                    'navbar p-0 fixed w-full text-primary z-50 transition-all duration-200 ' +
                    (!props.onColor
                        ? 'bg-transparent'
                        : 'bg-base-100 shadow glass')
                }
            >
                <div className="w-full max-w-7xl mx-auto px-4 py-4">
                    <div className="navbar-start">
                        <a
                            href="#home"
                            className="relative h-12 w-24 md:w-32 flex"
                        >
                            <Image
                                src={props.logo}
                                fill
                                alt="logo"
                                // loading="lazy"
                                priority={true}
                                className="cursor-pointer object-contain"
                            />
                        </a>
                    </div>
                    <div className="navbar-center hidden md:flex">
                        <ul className="menu menu-horizontal p-0">
                            <li>
                                <a
                                    className="active:text-warning"
                                    href="#quem-somos"
                                >
                                    Quem somos
                                </a>
                            </li>
                            <li>
                                <a
                                    className="active:text-warning"
                                    href="#produtos"
                                >
                                    Produtos
                                </a>
                            </li>
                            <li>
                                <a
                                    className="active:text-warning"
                                    href={`mailto:${props.email}`}
                                >
                                    E-mail
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-end flex gap-3">
                        <Link
                            target={'_blank'}
                            href={`https://wa.me/+55${props.phone}`}
                            rel={'noreferrer'}
                            className="btn btn-primary normal-case hidden md:inline-flex"
                        >
                            {props.action_buttons}
                        </Link>
                        <button
                            aria-label="menu"
                            className="block md:hidden text-primary"
                            onClick={toggleDrawer}
                        >
                            <svg
                                className={
                                    'swap-off fill-current ' +
                                    (!props.onColor
                                        ? 'text-primary'
                                        : 'text-primary')
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
                className="w-2/3 bg-base-200"
            >
                <ul className="menu gap-5 w-full px-8 pt-10">
                    <li>
                        <Link className="active:text-warning" href="#produtos">
                            Produtos
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="active:text-warning"
                            href="#quem-somos"
                        >
                            Quem somos
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="active:text-warning"
                            href={`mailto:${props.email}`}
                        >
                            E-mail
                        </Link>
                    </li>

                    <Link
                        href={`https://wa.me/55${props.phone}`}
                        target={'_blank'}
                        className="btn btn-primary normal-case"
                    >
                        Falar com um agente
                    </Link>
                </ul>
            </Drawer>
        </>
    )
}

export default NavBar
