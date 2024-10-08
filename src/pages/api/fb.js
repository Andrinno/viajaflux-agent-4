export default async function handler(req, res) {
    const { event_id, event_source_url, event_name } = req.body

    switch (req.method) {
        case 'GET':
            // handle GET request
            break
        case 'POST':
            // handle POST request
            let fbc = req.cookies['_fbc'] || req.cookies['@VFLX:fbc'] || ''
            let fbp = req.cookies['_fbp'] || req.cookies['@VFLX:fbp'] || ''
            const {
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
                fb_pixel_id,
                fb_access_token,
            } = req.body

            if (!fb_pixel_id || !fb_access_token) {
                return res.status(200).end('Facebook Pixel ID not found')
            }

            console.log('Facebook Pixel Event Received:' + event_name, req.body)
            console.log('Facebook Pixel Event Cookies:', req.cookies)

            const phone = whatsapp
                ? '55' + whatsapp.replace(/[-()\s]/g, '')
                : ''

            let firstName = ''
            let lastName = ''

            if (name) {
                const nameLower = name.toLowerCase()
                const nameArray = nameLower.split(' ')
                firstName = nameArray[0]
                lastName = nameArray.slice(1).join(' ')
            }

            const emailLower = email ? email.toLowerCase() : ''

            const firstNameHash = firstName
                ? crypto.createHash('sha256').update(firstName).digest('hex')
                : ''

            const lastNameHash = lastName
                ? crypto.createHash('sha256').update(lastName).digest('hex')
                : ''

            //sha256 hash email
            const emailHash = emailLower
                ? crypto.createHash('sha256').update(emailLower).digest('hex')
                : ''

            //sha256 hash whatsapp
            const whatsappHash = phone
                ? crypto.createHash('sha256').update(phone).digest('hex')
                : ''

            //sha256 hash cep
            const cepHash = cep
                ? crypto.createHash('sha256').update(cep).digest('hex')
                : ''

            //sha256 hash city
            const cityHash = city
                ? crypto.createHash('sha256').update(city).digest('hex')
                : ''

            //sha256 hash uf
            const ufHash = uf
                ? crypto.createHash('sha256').update(uf).digest('hex')
                : ''

            //sha256 hash country
            const countryHash = country
                ? crypto.createHash('sha256').update(country).digest('hex')
                : crypto.createHash('sha256').update('br').digest('hex')

            const fbclid = req.cookies['@VFLX:fbclid'] || ''

            if (!fbp) {
                fbp =
                    'fb.1.' +
                    Date.now() +
                    '.' +
                    Math.random().toString(36).substring(2, 15)
            }

            if (!fbc && fbclid) {
                fbc = 'fb.1.' + Date.now() + '.' + fbclid
            }

            const custom_data = {
                content_name: content_name,
                content_ids: [content_id],
                content_type: 'service',
                value: value,
                currency: 'BRL',
            }

            const data = [
                {
                    action_source: 'website',
                    event_name: event_name,
                    event_id: event_id || order_id,
                    event_time: Math.floor(Date.now() / 1000),
                    event_source_url: event_source_url,
                    custom_data: value ? custom_data : {},
                    user_data: {
                        em: emailHash || '',
                        ph: whatsappHash || '',
                        fn: firstNameHash || '',
                        ln: lastNameHash || '',
                        country: countryHash || '',
                        ct: cityHash || '',
                        st: ufHash || '',
                        zp: cepHash || '',
                        client_ip_address:
                            req.headers['x-forwarded-for'] ||
                            req.socket.remoteAddress,
                        client_user_agent: req.headers['user-agent'],
                        fbc: fbc.replace(/"/g, ''),
                        fbp: fbp.replace(/"/g, ''),
                    },
                },
            ]

            console.log('Facebook Pixel Event Sent:' + event_name, data)

            const url = `https://graph.facebook.com/v16.0/${fb_pixel_id}/events?access_token=${fb_access_token}`

            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            }).catch((err) => {
                console.error('Erro no processamento da resposta:', err)
                res.status(500).end(err.message)
            })

            res.status(200).end()
            break
        default:
            res.status(405).end() // Method Not Allowed
    }
}
