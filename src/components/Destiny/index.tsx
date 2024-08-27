import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { InputMask } from '@react-input/mask'
import * as yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { aeroportosDisponiveis } from '../../utils/useLata'
import ModalDefault, { useModal } from '../Modals/ModalDefault'

interface PassagemInfo {
    origemQuery: string
    destinoQuery: string
    dataIda: Date | null
    dataVolta: Date | null
    adultos: number
    name: string
    whatsapp: string
    gastos: string
}

interface IDestiny {
    bgColor: string
    color: string
    number: string
    cta: string
    isVisible?: boolean
}

export default function Destiny({
    bgColor,
    color,
    number,
    cta,
    isVisible = true,
}: IDestiny) {
    const [loading, setLoading] = useState<boolean>(false)
    const [idaDate, setIdaDate] = useState<Date | null>(null)
    const [isQuotation, setIsQuotation] = useState(false)
    const [voltaDate, setVoltaDate] = useState<Date | null>(null)
    const [userName, setUserName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [userWhatsapp, setUserWhatsapp] = useState<string>('')
    const [gastos, setGastos] = useState<string>('')
    const [quantidadeAdultos, setQuantidadeAdultos] = useState<number>(1)
    const [origemQuery, setOrigemQuery] = useState<string>('')
    const [destinoQuery, setDestinoQuery] = useState<string>('')
    const [origemResults, setOrigemResults] = useState<string[]>([])
    const [destinoResults, setDestinoResults] = useState<string[]>([])
    const [showOrigemResults, setShowOrigemResults] = useState<boolean>(false)
    const [showDestinoResults, setShowDestinoResults] = useState<boolean>(false)
    const [passagemInfo, setPassagemInfo] = useState<PassagemInfo>({
        origemQuery: '',
        destinoQuery: '',
        dataIda: null,
        dataVolta: null,
        adultos: quantidadeAdultos,
        name: '',
        whatsapp: '',
        gastos: '',
    })

    const firstSchema = yup.object().shape({
        origemQuery: yup
            .string()
            .required('Por favor, informe o local de origem.'),
        destinoQuery: yup
            .string()
            .required('Por favor, informe o local de destino.'),
        idaDate: yup.date().required('Por favor, informe a data de ida.'),
        voltaDate: yup.date().required('Por favor, informe a data de volta.'),
        quantidadeAdultos: yup
            .number()
            .required('Por favor, informe a quantidade de adultos.'),
    })

    const secondSchema = yup.object().shape({
        userName: yup.string().required('Por favor, informe o seu nome.'),
        userEmail: yup
            .string()
            .email('Por favor, informe um e-mail válido.')
            .required('Por favor, informe o seu e-mail.'),
        userWhatsapp: yup
            .string()
            .required('Por favor, informe o seu número de telefone.')
            .matches(
                /^\(\d{2}\) \d{5}-\d{4}$/,
                'Por favor, informe um número de telefone válido (exemplo: (99) 99999-9999).'
            ),
    })

    const isDateValid = (date: Date | null): boolean => {
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)
        return date !== null && date >= currentDate
    }

    const [textoPassagem, setTextoPassagem] = useState<string>('')

    function sendWhatsapp() {
        const url = `https://wa.me/5518996505452&text=${encodeURIComponent(
            textoPassagem
        )}`

        window.open(url, '_blank')
    }

    const handleContinuar = async () => {
        const firstData = {
            origemQuery,
            destinoQuery,
            idaDate,
            voltaDate,
            quantidadeAdultos,
        }

        setLoading(true)

        try {
            // Validação dos dados do formulário
            await firstSchema
                .validate(firstData, { abortEarly: false })
                .then(async () => {
                    setPassagemInfo({
                        origemQuery,
                        destinoQuery,
                        dataIda: idaDate,
                        dataVolta: voltaDate,
                        adultos: quantidadeAdultos,
                        name: userName,
                        whatsapp: userWhatsapp,
                        gastos,
                    })

                    const novoTextoPassagem = `
                    Olá, sou ${userName} e gostaria de cotar a seguinte passagem:

                    Origem: ${passagemInfo.origemQuery}
                    Destino: ${passagemInfo.destinoQuery}
                    Data de ida: ${
                        passagemInfo.dataIda
                            ? passagemInfo.dataIda.toLocaleDateString()
                            : 'Não especificada'
                    }
                    Data de volta: ${
                        passagemInfo.dataVolta
                            ? passagemInfo.dataVolta.toLocaleDateString()
                            : 'Não especificada'
                    }
                    Quantidade de adultos: ${passagemInfo.adultos}
                    Gasto médio mensal no cartão de crédito: ${
                        passagemInfo.gastos
                    }`

                    setTextoPassagem(novoTextoPassagem)

                    setIsQuotation(false)
                    setLoading(false)
                })
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.inner.map(
                    (error) => error.message
                )
                validationErrors.forEach((message) => {
                    console.log(message)
                    toast.error(message)
                })
                setLoading(false)
            }
        }
    }

    const handleQuotation = async () => {
        //chama api addToList.js
        const data = {
            name: userName,
            email: userEmail,
            whatsapp: userWhatsapp,
            origem: origemQuery,
            destino: destinoQuery,
            dataIda: idaDate,
            dataVolta: voltaDate,
            adultos: quantidadeAdultos,
            gastos,
            tags: 'site,cotação',
        }

        const secondData = {
            userName,
            userEmail,
            userWhatsapp,
            origemQuery,
            destinoQuery,
            idaDate,
            voltaDate,
            quantidadeAdultos,
        }

        const linkWhatsapp = `https://api.whatsapp.com/send?phone=+55${number}&text=Nome:${encodeURIComponent(
            userName
        )}%0AE-mail:${encodeURIComponent(
            userEmail
        )}%0AWhatsapp:${encodeURIComponent(userWhatsapp)}${
            gastos && `%0AGasto%20m%C3%A9dio: ${encodeURIComponent(gastos)}`
        }`

        setLoading(true)

        try {
            await secondSchema
                .validate(secondData, { abortEarly: false })
                .then(async () => {
                    await fetch(`${process.env.NEXT_PUBLIC_API}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
                        },
                        body: JSON.stringify(data),
                    })

                    setLoading(false)
                    //clear form
                    setUserName('')
                    setUserEmail('')
                    setUserWhatsapp('')
                    setOrigemQuery('')
                    setDestinoQuery('')
                    setIdaDate(null)
                    setVoltaDate(null)
                    setQuantidadeAdultos(1)
                    setGastos('')
                    sendWhatsapp()

                    window.open(linkWhatsapp, '_blank')
                })
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.inner.map(
                    (error) => error.message
                )
                validationErrors.forEach((message) => {
                    toast.error(message)
                })
            } else {
                toast.error(
                    'Ocorreu um erro ao enviar os dados. Por favor, tente novamente mais tarde.'
                )
            }
            setLoading(false)
        }
    }

    const incrementarAdultos = () => {
        setQuantidadeAdultos((prevQuantidade) => prevQuantidade + 1)
    }

    const decrementarAdultos = () => {
        if (quantidadeAdultos > 1) {
            setQuantidadeAdultos((prevQuantidade) => prevQuantidade - 1)
        }
    }

    useEffect(() => {
        setOrigemResults(aeroportosDisponiveis)
        setDestinoResults(aeroportosDisponiveis)
    }, [])

    useEffect(() => {
        if (loading) {
            onOpen()
        } else {
            onClose()
        }
    }, [loading])

    const { ref, onOpen, onClose } = useModal()

    const handleSearch = (
        e: React.ChangeEvent<HTMLInputElement>,
        setQuery: React.Dispatch<React.SetStateAction<string>>,
        setResults: React.Dispatch<React.SetStateAction<string[]>>,
        setShowResults: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const query = e.target.value
        setQuery(query)

        if (query.length > 1) {
            // Filtra com base na nova query antes de atualizar searchResults
            const filteredResults = aeroportosDisponiveis.filter((result) =>
                result.toLowerCase().includes(query.toLowerCase())
            )
            setResults(filteredResults)
            setShowResults(true)
        } else {
            setShowResults(false)
        }
    }

    const handleOrigemResultClick = (result: string) => {
        setOrigemQuery(result)
        setShowOrigemResults(false)
    }

    const handleDestinoResultClick = (result: string) => {
        setDestinoQuery(result)
        setShowDestinoResults(false)
    }

    const handleGastos = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGastos(e.target.value)
    }

    return (
        <div className={`${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
            <ToastContainer />

            <ModalDefault ref={ref} onClose={onClose}>
                <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            </ModalDefault>

            <div
                className={
                    'flex flex-col mx-auto p-3 text-center gap-4 max-w-6xl items-center'
                }
                id="emitir-passagens"
            >
                <span
                    className={'text-sm md:text-xl text-center font-light z-10'}
                    style={{ color: bgColor }}
                >
                    Preencha seus dados e ganhe uma cotação personalizada com um
                    desconto especial!
                </span>

                {isQuotation ? (
                    <div
                        style={{ borderColor: color }}
                        className={
                            'grid sm:grid-cols-6 gap-4 w-full bg-white/25 backdrop-blur-md p-6 rounded border border-solid z-10'
                        }
                    >
                        <div className="relative flex flex-col gap-1">
                            <h2 className="text-xs font-normal text-left">
                                Local de origem
                            </h2>

                            <input
                                key={'from'}
                                name={'from'}
                                id={'from'}
                                type="text"
                                placeholder="De:"
                                value={origemQuery}
                                onChange={(e) =>
                                    handleSearch(
                                        e,
                                        setOrigemQuery,
                                        setOrigemResults,
                                        setShowOrigemResults
                                    )
                                }
                                onClick={() => {
                                    setShowDestinoResults(false)
                                }}
                                className="iata input col-span-1 border w-full text-sm bg-white text-gray-600 max-h-10"
                                style={{ borderColor: color }}
                            />

                            {showOrigemResults && origemQuery.length > 1 && (
                                <ul className="text-xs absolute z-10 mt-16 w-full bg-white border rounded-md shadow-lg">
                                    {origemResults.map((result, index) => (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                handleOrigemResultClick(result)
                                            }
                                            className="cursor-pointer p-2 hover:bg-gray-100"
                                        >
                                            {result}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="relative flex flex-col gap-1">
                            <h2 className="text-xs font-normal text-white text-left">
                                Local de destino
                            </h2>
                            <input
                                key={'destiny'}
                                name={'destiny'}
                                id={'destiny'}
                                type="text"
                                placeholder="Para:"
                                value={destinoQuery}
                                onChange={(e) =>
                                    handleSearch(
                                        e,
                                        setDestinoQuery,
                                        setDestinoResults,
                                        setShowDestinoResults
                                    )
                                }
                                onClick={() => {
                                    setShowOrigemResults(false)
                                }}
                                className="iata input col-span-1 border w-full text-sm bg-white text-gray-600 max-h-10"
                                style={{ borderColor: color }}
                            />

                            {showDestinoResults && destinoQuery.length > 1 && (
                                <ul className="text-xs absolute z-10 mt-16 w-full bg-white border rounded-md shadow-lg">
                                    {destinoResults.map((result, index) => (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                handleDestinoResultClick(result)
                                            }
                                            className="cursor-pointer p-2 hover:bg-gray-100"
                                        >
                                            {result}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="relative flex flex-col gap-1">
                            <h2 className="text-xs font-normal text-white text-left">
                                Data da ida
                            </h2>
                            <DatePicker
                                selected={idaDate}
                                onChange={(
                                    date: React.SetStateAction<Date | null>
                                ) => {
                                    setIdaDate(date)
                                    setShowOrigemResults(false)
                                    setShowDestinoResults(false)
                                }}
                                placeholderText="dd/mm/yyyy"
                                dateFormat="dd/MM/yyyy"
                                className="iata input col-span-1 border w-full text-sm bg-white text-black max-h-10 z-30"
                                filterDate={isDateValid}
                            />
                        </div>

                        <div className="relative flex flex-col gap-1">
                            <h2 className="text-xs font-normal text-white text-left">
                                Data da volta
                            </h2>
                            <DatePicker
                                selected={voltaDate}
                                onChange={(
                                    date: React.SetStateAction<Date | null>
                                ) => {
                                    setVoltaDate(date)
                                    setShowOrigemResults(false)
                                    setShowDestinoResults(false)
                                }}
                                placeholderText="dd/mm/yyyy"
                                dateFormat="dd/MM/yyyy"
                                className="iata input col-span-1 border w-full text-sm bg-white text-black max-h-10 z-30"
                                filterDate={isDateValid}
                            />
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <h2 className="text-xs font-normal text-white text-left">
                                Quantidade de adultos
                            </h2>

                            <div className={'flex'}>
                                <button
                                    onClick={decrementarAdultos}
                                    className="text-white rounded-full px-3"
                                    style={{ backgroundColor: bgColor }}
                                >
                                    -
                                </button>
                                <div className="col-span-1 px-3 py-2 text-sm text-white max-h-10">
                                    {quantidadeAdultos < 10
                                        ? `0${quantidadeAdultos}`
                                        : quantidadeAdultos}
                                </div>
                                <button
                                    onClick={incrementarAdultos}
                                    className="text-white rounded-full px-3"
                                    style={{ backgroundColor: bgColor }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            style={{ backgroundColor: bgColor }}
                            className="btn rounded self-end text-white"
                            onClick={handleContinuar}
                        >
                            Continuar
                        </button>
                    </div>
                ) : (
                    <div
                        className={
                            'grid sm:grid-cols-5 gap-4 w-full bg-white/25 backdrop-blur-md p-6 rounded border border-solid z-10'
                        }
                        style={{ borderColor: color }}
                    >
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xs font-normal text-left">
                                Nome
                            </h2>
                            <input
                                name="name"
                                id="name"
                                className="iata input col-span-1 border w-full text-sm bg-white text-gray-600 max-h-10"
                                style={{ borderColor: color }}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder={'Nome'}
                            ></input>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h2 className="text-xs font-normal text-left">
                                E-mail
                            </h2>
                            <input
                                name="email"
                                id="email"
                                className="iata input col-span-1 border w-full text-sm bg-white text-gray-600 max-h-10"
                                style={{ borderColor: color }}
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder={'E-mail'}
                            ></input>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h2 className="text-xs font-normal text-left">
                                Whatsapp
                            </h2>
                            <InputMask
                                mask="(__) _____-____"
                                replacement={{ _: /\d/ }}
                                name="whatsapp"
                                id="whatsapp"
                                value={userWhatsapp}
                                onChange={(e) =>
                                    setUserWhatsapp(e.target.value)
                                }
                                className="iata input col-span-1 border w-full text-sm bg-white text-gray-600 max-h-10"
                                style={{ borderColor: color }}
                                placeholder="(XX) 9XXXX-XXXX"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h2 className="text-xs font-normal text-left">
                                Gasto cartão de crédito
                            </h2>
                            <select
                                name="gasto"
                                id="gasto"
                                className="iata input col-span-1 border w-full text-sm bg-white text-gray-600 max-h-10"
                                style={{ borderColor: color }}
                                onChange={(e) => handleGastos(e)}
                            >
                                <option value="">Não Opinar</option>
                                <option value="De R$ 2.000 a R$ 5.000">
                                    De R$ 2.000 a R$ 5.000
                                </option>
                                <option value="De R$ 5.000 a R$ 15.000">
                                    De R$ 5.000 a R$ 15.000
                                </option>
                                <option value="De R$ 15.000 a R$ 30.000">
                                    De R$ 15.000 a R$ 30.000
                                </option>
                                <option value="Mais de R$ 30.000">
                                    Mais de R$ 30.000
                                </option>
                            </select>
                        </div>

                        <button
                            style={{ backgroundColor: bgColor }}
                            className={'btn rounded self-end text-white mb-1'}
                            onClick={handleQuotation}
                        >
                            {cta}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
