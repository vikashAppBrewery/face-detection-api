const handleProfile = (db) => (req, res) => {
    const {id} = req.params;
    let found = false
    db.select('*').from('users')
    .where({id})
    .then(user => {
        if(user.length){
         res.json(user[0])
        } else {
         res.status(400).json('user not found')    
        }
    })
    .catch(err => res.status(400).json('not found '))
    // if(!found) {
    //     res.status(400).json("no such account was found")
    // }
}

export default handleProfile;