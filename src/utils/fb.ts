export default async function fb(
    fb_pixel_id: string,
    fb_access_token: string,
    event_name: string,
    event_id?: string | null,
    name?: string | null,
    email?: string | null,
    whatsapp?: string | null,
    content_name?: string | null,
    content_id?: string | null,
    value?: number | null,
    country?: string | null,
    uf?: string | null,
    city?: string | null,
    cep?: string | null,
    order_id?: string | null
): Promise<void> {
    await fetch('/api/fb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event_name: event_name,
            event_id: `${event_id ?? 'aho'}`,
            event_source_url: window.location.href,
            fb_pixel_id,
            fb_access_token,
            name,
            email,
            whatsapp,
            content_name,
            content_id,
            value,
            country,
            uf,
            city,
            cep,
            order_id,
        }),
    })
}
