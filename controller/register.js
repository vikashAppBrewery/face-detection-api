const handleRegister = (db, bcrypt) => (req, res) => {
    const {email, name, password} = req.body
    if(!email || !name || !password) {
        return  res.status(400).json('Cannot leave input empty')
      }
    const hash = bcrypt.hashSync(password)
     return db.transaction(trx => {
        trx.insert({
            hash: hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                })
             .then(user => {
             res.json(user[0]) //change this line to res.json()
             })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    
    .catch(err => res.status(404).json('unable to resgiter'))
    res.json(database.user[database.user.length-1])
}

// module.exports = {
//     handleRegister: handleRegister
// }
export default handleRegister;