const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
let userSchema = new mongoose.Schema({
    name: String,
    email:  {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
})
const document = this
userSchema.pre('save',(next)=>{
    if(document.isNew){
        bcrypt.hash(document.password, 10, (err, hashedPassword)=>{
            if(err){
                next(err)
            }else{
                document.password = hashedPassword
                next()
            }
        })
    }
})

userSchema.method.isCorrectPassword = (password, callback) =>{
    bcrypt.compare(password, document.password, (err, same)=>{
        if(err){
            callback(err)
        }else{
            callback(err, same)
        }
    })
}





module.exports = mongoose.model('User', userSchema)