import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controller/register.js'
import handleSignIn from './controller/signin.js';
import handleProfile from './controller/profile.js';
import {handleImage, handleApiCall} from './controller/image.js';


const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'vikash1',
        database: 'face-detect'
    }
})


const app = express();
app.use(express.json());
app.use(cors())
const port = 3000



app.get('/', (req, res) => {
    res.send(db('users'))
})

app.post ('/signin', handleSignIn( db, bcrypt))

app.post('/register',handleRegister( db, bcrypt))

app.get('/profile/:id', handleProfile(db))

app.put('/image', handleImage(db))

app.post('/imageurl', (req, res) => {handleApiCall(req, res)})


app.listen(port, () => {
    console.log(`app is running on port: ${port}`)
})

