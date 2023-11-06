import { InputMask } from '@react-input/mask'
import Link from 'next/link'
import { SetStateAction, useState } from 'react'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ICta {
    action_buttons: string
    phone: string
    popup?: boolean
    className?: string
}

const CTA = (props: ICta) => {
    const { popup, action_buttons, phone, className } = props

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [loading, setLoading] = useState(false)

    const schema = yup.object().shape({
        name: yup.string().required('Por favor, informe o seu nome.'),
        email: yup
            .string()
            .email('Por favor, informe um e-mail válido.')
            .required('Por favor, informe o seu e-mail.'),
        whatsapp: yup
            .string()
            .required('Por favor, informe o seu número de telefone.')
            .matches(
                /^\(\d{2}\) \d{5}-\d{4}$/,
                'Por favor, informe um número de telefone válido (exemplo: (99) 99999-9999).'
            ),
    })

    function handleInputChange(event: {
        target: { value: SetStateAction<string> }
    }) {
        setWhatsapp(event.target.value)
    }

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        setLoading(true)

        try {
            // Validação dos dados do formulário
            await schema
                .validate({ name, email, whatsapp }, { abortEarly: false })
                .then(async () => {
                    //enviar dados para o CRM
                    if (process.env.NEXT_PUBLIC_API) {
                        await fetch(process.env.NEXT_PUBLIC_API, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name, email, whatsapp }),
                        })
                        setLoading(false)
                    }
                    window.location.href = `https://wa.me/+55${phone}`
                })
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.inner.map(
                    (error) => error.message
                )
                validationErrors.forEach((message) => {
                    toast.error(message)
                })
                setLoading(false)
            } else {
                setLoading(false)
                window.location.href = `https://wa.me/+55${phone}`
            }
        }
    }

    return popup ? (
        <>
            <label
                htmlFor="modal_lead"
                className={`btn btn-primary normal-case ${className}`}
            >
                {action_buttons}
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="modal_lead" className="modal-toggle" />
            <label
                htmlFor="modal_lead"
                className="modal modal-bottom sm:modal-middle"
            >
                <label htmlFor="" className="modal-box relative box-glow">
                    <label
                        htmlFor="modal_lead"
                        className="btn btn-ghost btn-circle absolute right-3 top-3"
                    >
                        ✕
                    </label>
                    <h3 className="font-bold text-2xl text-primary">
                        {action_buttons}
                    </h3>
                    <form
                        id="form"
                        className="py-4 grid gap-2"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome Completo"
                            className="rounded-md input w-full bg-base-200"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            className="rounded-md input w-full bg-base-200"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <InputMask
                            mask="(__) _____-____"
                            replacement={{ _: /\d/ }}
                            name="whatsapp"
                            value={whatsapp}
                            onChange={handleInputChange}
                            className="rounded-md input w-full bg-base-200"
                            placeholder="(XX) 9XXXX-XXXX"
                        />

                        <div className="modal-action flex justify-between">
                            <button
                                form="form"
                                type="submit"
                                className="btn btn-block btn-primary"
                                disabled={loading}
                            >
                                {loading && (
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                )}
                                Continuar
                            </button>
                        </div>
                    </form>
                </label>
            </label>
        </>
    ) : (
        <Link
            target={'_blank'}
            href={`https://wa.me/+55${phone}`}
            rel={'noreferrer'}
            className={`btn btn-primary normal-case ${className}`}
        >
            {action_buttons}
        </Link>
    )
}

export default CTA
