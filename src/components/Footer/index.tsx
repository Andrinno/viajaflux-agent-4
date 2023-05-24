/* eslint-disable prettier/prettier */
import {
    faFacebook,
    faInstagram,
    faLinkedinIn,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { Link } from 'react-daisyui'
import Cadastur from '../../assets/images/logo-cadastur.webp'
import Clouflare from '../../assets/images/logo-cloudflare.webp'
import SSL from '../../assets/images/logo-ssl.webp'

interface IFooter {
    instagram_link?: string,
    facebook_link?: string,
    linkedin_link?: string,
    video_link?: string,
    fantasy_name: string,
    address: string,
    cnpj?: string,
    image_footer: string,
}

const Footer = ( props : IFooter) => {
    return (
        <>
            <div className="flex w-full relative justify-center my-14">
                <Image 
                    alt="Imagem do rodapé" 
                    loading="lazy" 
                    width={1250} 
                    height={200} 
                    className="rounded-3xl h-52" 
                    src={props.image_footer}    
                />
            </div>
            <div className="bg-base-200 w-full">
                <footer className="footer py-10 max-w-7xl flex flex-wrap justify-between mx-auto text-base-content px-8">
                    <div className="flex w-6/12 md:w-auto flex-col h-full justify-between gap-5">
                        <ul className="flex w-full flex-col gap-4 text-primary text-base">
                            <li>
                                <a className="active:text-warning" href="#">
                                    Produto
                                </a>
                            </li>
                            <li>
                                <a className="active:text-warning" href="#">
                                    Quem somos
                                </a>
                            </li>
                            <li>
                                <a className="active:text-warning" href="#">
                                    Contato
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 items-center">
                        <ul className="flex w-full flex-col gap-4 text-primary text-base">
                            <li>
                                <Link
                                    href={props.instagram_link}
                                    className="active:text-warning no-underline"
                                    target={'_blank'}
                                >
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        className="w-4 h-4 mr-2"
                                    />
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={props.facebook_link}
                                    className="active:text-warning no-underline"
                                    target={'_blank'}
                                >
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        className="w-4 h-4 mr-2"
                                    />
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={props.video_link}
                                    className="active:text-warning no-underline"
                                    target={'_blank'}
                                >
                                    <FontAwesomeIcon
                                        icon={faYoutube}
                                        className="w-4 h-4 mr-2"
                                    />
                                    Youtube
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={props.linkedin_link}
                                    className="active:text-warning no-underline"
                                    target={'_blank'}
                                >
                                    <FontAwesomeIcon
                                        icon={faLinkedinIn}
                                        className="w-4 h-4 mr-2"
                                    />
                                    LinkedIn
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center md:flex-col md:items-end gap-4 w-full md:w-auto justify-center">
                        <Image src={Cadastur} width={130} height={65} alt="logo" />

                        <Image src={Clouflare} width={100} height={65} alt="logo" />

                        <Image src={SSL} width={80} height={65} alt="logo" />
                    </div>
                </footer>
                <div className="text-center w-full pb-6 text-xs">
                    <p>
                        Endereço - {props.address}
                    </p>
                    <p className={(props.cnpj ? '' : "hidden ...")}>
                        CNPJ - {props.cnpj}
                    </p>
                    <p>
                        {new Date().getFullYear()} - {props.fantasy_name}® | Todos os
                        direitos reservados
                    </p>
                </div>
            </div>
        </>
    )
}

export default Footer
