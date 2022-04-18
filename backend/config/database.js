const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/mynote', {
    UseNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Conectado com o banco de dados')
}).catch((err)=>{
    console.log('Banco não conectado: ' + err)
})