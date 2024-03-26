interface Media {
    id: number
    model_type: string
    model_id: number
    uuid: string
    collection_name: string
    name: string
    file_name: string
    mime_type: string
    disk: string
    conversions_disk: string
    size: number
    // manipulations: any[] // Aqui você pode definir uma interface mais específica se necessário
    // custom_properties: any[] // Aqui você pode definir uma interface mais específica se necessário
    // generated_conversions: any[] // Aqui você pode definir uma interface mais específica se necessário
    // responsive_images: any[] // Aqui você pode definir uma interface mais específica se necessário
    order_column: number
    created_at: string
    updated_at: string
    original_url: string
    preview_url: string
}

interface Team {
    id: number
    user_id: number
    name: string
    personal_team: boolean
    team_photo_path: string | null
    created_at: string
    updated_at: string
    team_photo_url: string
}

interface IData {
    id: number
    team_id: number
    subdomain: string
    template: string
    bg_color: string
    color: string
    email: string
    cnpj: string | null
    theme: string
    cta: string
    country_code: string
    phone: string
    head: string
    description: string
    video: string | null
    featured: string
    featured_title: string
    featured_description: string
    products: string[]
    instagram_link: string | null
    linkedin_link: string | null
    facebook_link: string | null
    payment_methods: string[]
    address: string
    enable_popup: boolean
    vsl_mode: boolean
    vsl_time: number
    online_at: string | null
    created_at: string
    updated_at: string
    media: Media[]
    team: Team
}

export default IData
