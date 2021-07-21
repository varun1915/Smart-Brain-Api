const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('users')
    .where('id', id)
    .then(user => {
        if(user.length)
            res.json(user);
        else
            res.status(404).json('no such user found')
    })
    .catch(err => res.json('Error Logging User'));
};

module.exports = {
    handleProfileGet: handleProfileGet
};