import BlurImage from '../BlurImage'

const CardProvider = ({ logo }: { logo: string }) => {
    return (
        <div className="bg-white w-full h-auto flex flex-col gap-3 card border items-center p-5 transition-all duration-300 hover:scale-105">
            <BlurImage
                src={'/clients/' + logo}
                width={300}
                height={33}
                alt="reserva image"
            ></BlurImage>
        </div>
    )
}

export default CardProvider
