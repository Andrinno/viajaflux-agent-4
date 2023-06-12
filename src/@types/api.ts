export interface IData {
    //id                : number,
    //user_id           : number,
    //email             : string,
    company: string
    theme: string
    cta: string
    //number_contact    : string,
    headline: string
    description: string
    video?: string
    featured: string
    instagram?: string
    linkedin?: string
    facebook?: string
    address: string
    cnpj?: string
    logo: string
    main_image: string
    image_footer: string
    //subdomain         : string,
    category: Array<string>
    payment: Array<string>
    title_of_featured_product: string
    description_of_featured_product: string
    image_of_featured_product: string
}
