import express from 'express'
import {sql} from '@vercel/postgres'

// const { Client } = pg

// const client = new Client({
//     connectionString: process.env.POSTGRES_URL
// })

// await client.connect()

const app = express()
// const OURA_PAYLOADS_TABLE = 'ouraPayloads'
const OURA_SIG_HEADER = 'x-oura-signature'
const OURA_TIME_HEADER = 'x-oura-timestamp'
const HOST_HEADER = 'host'
const VERIFICATION_TOKEN = process.env.OAW_VERIFICATION_TOKEN || undefined // undefined is the wrong default here

// const result = await sql`SELECT id from ouraPayloads`
// console.log(result)

app.use(express.json())

app.get('/api/oura-webhook', async (req, res) => {

    if (VERIFICATION_TOKEN === undefined) {
        console.log("no OAW_VERIFICATION_TOKEN environment variable set")
    } else {
        const verificationTokenParam = req.query['verification_token']
        const challengeString = req.query['challenge']
    
        // console.log()
        console.log(verificationTokenParam)
        // console.log()
        console.log(challengeString)
    
        if (verificationTokenParam === VERIFICATION_TOKEN) {
            res.json({challenge: challengeString}).send()
            return
        } else {
            console.log(`the verification_token is invalid ${verificationTokenParam}`)
        }
        
        
    }
    res.status(204).send();
})

app.post('/api/oura-webhook', async (req, res) => {
    const sigHeader = req.get(OURA_SIG_HEADER)
    const timeHeader = req.get(OURA_TIME_HEADER)
    const hostHeader = req.get(HOST_HEADER)
    const payload = req.body

    console.log(hostHeader)
    console.log(sigHeader)
    console.log(timeHeader)

    const insertResult = await sql`
        insert into oura_payloads (data_type, event_time, event_type, 
        object_id, user_id)
        values (${payload['data_type']}, ${payload['event_time']}, 
        ${payload['event_type']}, ${payload['object_id']},
        ${payload['user_id']})
    `

    res.json({ received: insertResult })
});

app.get('/healthbeat', (req, res) => {
    console.log('lub-dub')
    res.json({ status: 'lub-dub' })
});

const listenPort = process.env.NODE_PORT || 3000;

app.listen(listenPort, () => console.log(`Server ready on port ${listenPort}`));

// module.exports = app;
/* 
{
    "event_type": "update",
    "data_type": "tag",
    "object_id": "9fc867f2-b455-4c41-a05a-751c6e764ffa",
    "event_time": "2022-11-16T08:21:00+00:00",
    "user_id": "bd913327d56d-a0adf03b515a1d8ed46082e"
} 
*/