import Image, { ImageProps } from 'next/image'
import { HTMLAttributes, useState } from 'react'

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
interface blurImageProps extends ImageProps {
    classname?: HTMLAttributes<HTMLDivElement> | string
}

function BlurImage({ src, className, ...props }: blurImageProps) {
    const [isLoading, setLoading] = useState(true)

    return (
        <Image
            {...props}
            src={src}
            quality={75}
            // objectFit="contain"
            className={cn(
                `duration-100 ease-in-out ${className}`,
                isLoading ? 'blur-2xl scale-110' : 'blur-0 scale-100'
            )}
            onLoad={() => setLoading(false)}
            alt={props.alt}
            priority={true}
        />
    )
}

export default BlurImage
