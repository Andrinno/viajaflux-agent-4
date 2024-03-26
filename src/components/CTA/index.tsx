import Link from 'next/link'
import { SetStateAction, useContext, useState } from 'react'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { APIdata } from '../../../context/ApiContext'

interface ICta {
    action_buttons: string
    phone: string
    popup?: boolean
    className?: string
}

const CTA = (props: ICta) => {
    const { popup, action_buttons, phone, className } = props
    const { api } = useContext(APIdata)

    return popup ? (
        <>
            <label
                htmlFor="modal_lead"
                className={`btn border-none normal-case ${className}`}
                style={{ backgroundColor: api.bg_color, color: api.color }}
            >
                {action_buttons}
            </label>
        </>
    ) : (
        <Link
            target={'_blank'}
            href={`https://wa.me/55${phone}`}
            rel={'noreferrer'}
            className={`btn normal-case border-none`}
            style={{ backgroundColor: api.bg_color, color: api.color }}
        >
            {action_buttons}
        </Link>
    )
}

export default CTA
