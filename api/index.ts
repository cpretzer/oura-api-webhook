import express from 'express'
import {sql} from '@vercel/postgres'

// const { Client } = pg

// const client = new Client({
//     connectionString: process.env.POSTGRES_URL
// })

// await client.connect()

const app = express()
const OURA_PAYLOADS_TABLE = 'ouraPayloads'
const OURA_SIG_HEADER = 'x-oura-signature'
const OURA_TIME_HEADER = 'x-oura-timestamp'

const result = await sql`SELECT COUNT(0) from ${OURA_PAYLOADS_TABLE}`
console.log(result)

app.use(express.json())

app.post('/api/oura-webhook', (req, res) => {
    const sigHeader = req.get(OURA_SIG_HEADER)
    const timeHeader = req.get(OURA_TIME_HEADER)
    const payload = req.body

    console.log(payload)
    console.log(sigHeader)
    console.log(timeHeader)

    res.json({ received: payload })
});

app.get('/healthbeat', (req, res) => {
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