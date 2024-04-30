import {
    faFacebook,
    faInstagram,
    faLinkedinIn,
    faPix,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import BlurImage from '../BlurImage'

interface IFooter {
    address?: string
}

const Footer = ({ address }: IFooter) => {
    const { api } = useContext(APIdata)

    const footerMedia = api.media.filter(
        (media: any) => media.collection_name === 'footer'
    )

    function formatAddress(address: string) {
        return address.replace(/,/g, '').replace(/ /g, '+')
    }

    const formattedAddress = address && formatAddress(address)

    const urlBaseGoogleMaps = 'https://www.google.com/maps'

    const urlMapsAddress = `${urlBaseGoogleMaps}?q=${formattedAddress}&output=embed`

    return (
        <>
            {footerMedia[0] && (
                <div className="px-8 mx-auto max-w-7xl">
                    <div className="relative mb-14 h-[192px]">
                        {footerMedia && (
                            <BlurImage
                                alt="Imagem do rodapé"
                                fill
                                src={footerMedia[0]?.original_url}
                                className="object-contain object-top lg:object-cover rounded-xl"
                            />
                        )}
                    </div>
                </div>
            )}
            <div className="w-full bg-base-200">
                <div
                    className={
                        'flex flex-col text-center justify-center items-center align-center gap-6 p-8'
                    }
                >
                    <h2 className={'text-3xl font-semibold'}>
                        Onde estamos localizados
                    </h2>

                    <iframe
                        title="Localização do evento"
                        src={urlMapsAddress}
                        className={
                            'w-full h-96 rounded border-primary border-2'
                        }
                    ></iframe>
                </div>
                <footer className="flex flex-wrap justify-between px-8 py-10 mx-auto footer max-w-7xl text-base-content">
                    <div className="flex flex-col justify-between w-6/12 h-full gap-5 md:w-auto">
                        <ul className="flex flex-col w-full gap-4 text-base text-primary">
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
                                    href={`https://wa.me/+${api.country_code}${api.phone}`}
                                    rel={'noreferrer'}
                                >
                                    WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <ul className="flex flex-col w-full gap-4 text-base text-primary">
                            {api &&
                                api.payment_methods &&
                                api.payment_methods.map(
                                    (payment: string, index: number) => {
                                        let icon

                                        switch (payment) {
                                            case 'Cartão de crédito':
                                                icon = faCreditCard
                                                break
                                            case 'Pix':
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
                                            <li
                                                key={index}
                                                className="flex items-center"
                                            >
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

                    <div className="flex flex-col items-center gap-3">
                        <ul className="flex flex-col w-full gap-4 text-base text-primary">
                            {api.instagram && (
                                <li>
                                    <Link
                                        href={api.instagram}
                                        className="no-underline active:text-warning"
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
                                        className="no-underline active:text-warning"
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
                                        className="no-underline active:text-warning"
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
                                        className="no-underline active:text-warning"
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

                    <div className="flex items-center justify-center w-full gap-4 p-4 md:flex-col md:w-auto rounded-xl">
                        <BlurImage
                            src={Cadastur}
                            width={130}
                            height={65}
                            alt="logo"
                        />

                        <BlurImage
                            src={Clouflare}
                            width={100}
                            height={65}
                            alt="logo"
                        />

                        <BlurImage
                            src={SSL}
                            width={80}
                            height={65}
                            alt="logo"
                        />
                    </div>
                </footer>
                <div className="w-full pb-6 text-xs text-center">
                    <p>{api.address}</p>
                    <p className={api.cnpj ? '' : 'hidden'}>
                        CNPJ -{' '}
                        {api.cnpj?.replace(
                            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                            '$1.$2.$3/$4-$5'
                        )}
                    </p>
                    <p>
                        {new Date().getFullYear()} - {api.team.name}® | Todos os
                        direitos reservados
                    </p>
                </div>
            </div>
        </>
    )
}

export default Footer
