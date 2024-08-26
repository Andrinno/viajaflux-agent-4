import React, { forwardRef, ReactNode, useRef } from 'react'

type ModalProps = {
    children: ReactNode
    onClose: () => void
}

// eslint-disable-next-line react/display-name,@typescript-eslint/no-unused-vars
const ModalDefault = forwardRef<HTMLDialogElement, ModalProps>(
    ({ children }, ref) => {
        return (
            <dialog ref={ref} className="bg-white card">
                <div className="card-body relative">{children}</div>
            </dialog>
        )
    }
)

type UseModalReturnType = {
    ref: React.RefObject<HTMLDialogElement>
    onOpen: () => void
    onClose: () => void
}

export function useModal(): UseModalReturnType {
    const ref = useRef<HTMLDialogElement>(null)

    const onOpen = () => {
        if (ref.current) {
            ref.current.showModal()
        }
    }

    const onClose = () => {
        if (ref.current) {
            ref.current.className = 'close'
            setTimeout(() => {
                if (ref.current) {
                    ref.current.close()
                    ref.current.className = ''
                }
            }, 300)
        }
    }

    return { ref, onOpen, onClose }
}

export default ModalDefault
