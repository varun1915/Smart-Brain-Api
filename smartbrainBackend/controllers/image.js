const { json } = require('body-parser');
const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: '00f441b517004ae7b1c2f25e4d1a1ee8 ' })

const handleApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input  
    )
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const id = req.body.id;
    
    db("users").where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('unable'))
};

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};