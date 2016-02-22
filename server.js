#!/usr/bin/env node
const app = require('express')()
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const url = require('url')

if (!process.env.PORT || !process.env.INTEGRATION_TOKEN || !process.env.WEBHOOK_URL) {
    console.warn(`use: PORT=8081 INTEGRATION_TOKEN=1xxxxx WEBHOOK_URL=https://xxx ${process.argv.slice(0,2).join(' ')}`)
    process.exit(1)
}

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', (req, res) => {
    if (req.body.token != process.env.INTEGRATION_TOKEN) {
        return res.status(402).end("Bad token")
    }

    fetch(process.env.WEBHOOK_URL, {
        method: 'POST', 
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify({
            text: `Message from ${req.body.user_name} in #${req.body.channel_name}:\n\n${req.body.text}`
        })
    }).then(res => {
        if (res.statusCode >= 400) {
            return res.text().then(body => {
                throw Object.assign(new Error(body || "request failed"), {
                    statusCode: res.statusCode
                })
            })
        } else {
            return res.text()
        }
    })
    .then(() => res.end("Your message has been forwarded to the admins, we'll get in touch as soon as possible."))
    .catch(err => {
       console.warn(err)
       res.status(500).end("There was an error sending your request")
    })

})

app.listen(process.env.PORT, function () {
    console.log('started')
})
