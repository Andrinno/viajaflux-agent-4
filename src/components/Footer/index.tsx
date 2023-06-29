import {
    faFacebook,
    faInstagram,
    faLinkedinIn,
    faPix,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { Link } from 'react-daisyui'
import Cadastur from '../../assets/images/logo-cadastur.webp'
import Clouflare from '../../assets/images/logo-cloudflare.webp'
import SSL from '../../assets/images/logo-ssl.webp'
import {
    faBarcode,
    faCreditCard,
    faMoneyCheck,
} from '@fortawesome/free-solid-svg-icons'
import { APIdata } from '../../../context/ApiContext'
import { useContext } from 'react'

const Footer = () => {
    const { api } = useContext(APIdata)

    return (
        <>
            <div className="px-8 max-w-7xl mx-auto">
                <div className="relative mb-14 h-[192px]">
                    <Image
                        alt="Imagem do rodapé"
                        fill
                        className="object-cover rounded-xl shadow-lg bg-base-200"
                        src={api.image_footer}
                    />
                </div>
            </div>
            <div className="bg-base-200 w-full">
                <footer className="footer py-10 max-w-7xl flex flex-wrap justify-between mx-auto text-base-content px-8">
                    <div className="flex w-6/12 md:w-auto flex-col h-full justify-between gap-5">
                        <ul className="flex w-full flex-col gap-4 text-primary text-base">
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
                                    href={`mailto:${api.email}`}
                                    className="active:text-warning"
                                >
                                    E-mail
                                </a>
                            </li>
                            <li>
                                <a
                                    className="active:text-warning"
                                    target={'_blank'}
                                    href={`https://wa.me/+55${api.phone}`}
                                    rel={'noreferrer'}
                                >
                                    WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 items-center">
                        <ul className="flex w-full flex-col gap-4 text-primary text-base">
                            {api &&
                                api.payment &&
                                api.payment.map(
                                    (payment: string, index: number) => {
                                        let icon

                                        switch (payment) {
                                            case 'Cartão de crédito':
                                                icon = faCreditCard
                                                break
                                            case 'PIX':
                                                icon = faPix
                                                break
                                            case 'Boleto':
                                                icon = faBarcode
                                                break
                                            case 'Dinheiro':
                                                icon = faMoneyCheck
                                                break
                                            default:
                                                icon = faCreditCard
                                                break
                                        }

                                        return (
                                            <li key={index}>
                                                <FontAwesomeIcon
                                                    icon={icon}
                                                    className="w-4 h-4 mr-2"
                                                />
                                                {payment}
                                            </li>
                                        )
                                    }
                                )}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 items-center">
                        <ul className="flex w-full flex-col gap-4 text-primary text-base">
                            {api.instagram && (
                                <li>
                                    <Link
                                        href={api.instagram}
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
                            )}
                            {api.facebook && (
                                <li>
                                    <Link
                                        href={api.facebook}
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
                            )}
                            {api.youtube && (
                                <li>
                                    <Link
                                        href={api.youtube}
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
                            )}
                            {api.linkedin && (
                                <li>
                                    <Link
                                        href={api.linkedin}
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
                            )}
                        </ul>
                    </div>

                    <div className="flex items-center md:flex-col gap-4 w-full md:w-auto justify-center rounded-xl p-4">
                        <Image
                            src={Cadastur}
                            width={130}
                            height={65}
                            alt="logo"
                        />

                        <Image
                            src={Clouflare}
                            width={100}
                            height={65}
                            alt="logo"
                        />

                        <Image src={SSL} width={80} height={65} alt="logo" />
                    </div>
                </footer>
                <div className="text-center w-full pb-6 text-xs">
                    <p>{api.address}</p>
                    <p className={api.cnpj ? '' : 'hidden'}>
                        CNPJ -{' '}
                        {api.cnpj?.replace(
                            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                            '$1.$2.$3/$4-$5'
                        )}
                    </p>
                    <p>
                        {new Date().getFullYear()} - {api.company}® | Todos os
                        direitos reservados
                    </p>
                </div>
            </div>
        </>
    )
}

export default Footer
