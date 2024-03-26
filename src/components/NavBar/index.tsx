/* eslint-disable prettier/prettier */
import Link from 'next/link'
import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import CTA from '../CTA'
import BlurImage from '../BlurImage'

interface INavBar {
    onColor: boolean
    logo: string
    action_buttons: string
    phone: string
    email: string
    enable_popup?: boolean
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
                <div className="w-full px-4 py-4 mx-auto max-w-7xl">
                    <div className="navbar-start">
                        <a
                            href="#home"
                            className="relative flex w-24 h-12 md:w-32"
                        >
                            {props.logo && (
                                <BlurImage
                                    src={`http://app.viajaflux.test/${props.logo}`}
                                    fill
                                    alt="logo"
                                    className="object-contain cursor-pointer"
                                />
                            )}
                        </a>
                    </div>

                    <div className="hidden navbar-center md:flex">
                        <ul className="p-0 menu menu-horizontal">
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
                    <div className="flex gap-3 navbar-end">
                        <CTA
                            phone={props.phone}
                            action_buttons={props.action_buttons}
                            popup={props.enable_popup}
                            className={`hidden md:inline-flex`}
                        />

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
                <ul className="w-full gap-5 px-8 pt-10 menu">
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

                    <CTA
                        phone={props.phone}
                        action_buttons={props.action_buttons}
                        popup={props.enable_popup}
                    />
                </ul>
            </Drawer>
        </>
    )
}

export default NavBar
