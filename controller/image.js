
import clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '67e9dd0468da492788c5952f3120f310'
   });


export const handleApiCall = (req, res) => {
    app.models.predict("d02b4508df58432fbb84e800597b8959", req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with api'))
}   

export const handleImage = (db) => (req, res) =>  {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries)
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

// export default {handleImage,  handleApiCall};