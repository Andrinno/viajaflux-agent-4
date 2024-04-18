import React, { forwardRef, ReactNode, useRef } from 'react'

type ModalProps = {
    children: ReactNode
    onClose: () => void
}

// eslint-disable-next-line react/display-name,@typescript-eslint/no-unused-vars
const ModalDefault = forwardRef<HTMLDialogElement, ModalProps>(
    ({ children, onClose }, ref) => {
        return (
            <dialog ref={ref} className="bg-white card">
                <div className="card-body relative">
                    {/*<button className="absolute top-4 right-4" onClick={onClose}>*/}
                    {/*    <svg*/}
                    {/*        className="w-6 h-6 text-gray-500 hover:text-gray-800"*/}
                    {/*        fill="none"*/}
                    {/*        stroke="currentColor"*/}
                    {/*        viewBox="0 0 24 24"*/}
                    {/*        xmlns="http://www.w3.org/2000/svg"*/}
                    {/*    >*/}
                    {/*        <path*/}
                    {/*            strokeLinecap="round"*/}
                    {/*            strokeLinejoin="round"*/}
                    {/*            strokeWidth="2"*/}
                    {/*            d="M6 18L18 6M6 6l12 12"*/}
                    {/*        ></path>*/}
                    {/*    </svg>*/}
                    {/*</button>*/}
                    {children}
                </div>
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
