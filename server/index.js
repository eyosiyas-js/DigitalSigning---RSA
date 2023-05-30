const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 9000

const { postSignature, getSignature } = require('./handlers/signature.js')
const { Login, Signup, Verify } = require('./handlers/users.js')
const TokenVerification = require('./utils/TokenVerification.js')
mongoose.set('strictQuery', false)

const mongodbURI = `mongodb+srv://eyosiyas_js:eyosiyas1234@cluster0.8chdsxe.mongodb.net/?retryWrites=true&w=majority`

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const Multer = multer({ Storage: multer.memoryStorage() })

try {
  mongoose.connect(mongodbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
} catch (error) {
  console.log(error)
}

mongoose.connection.once('open', () => {
  console.log('connected to the DB')
})

app.post('/login', Login)
app.post('/signup', Signup)
app.post('/verify', Verify)
app.get('/', TokenVerification, getSignature)
app.post('/post', Multer.single('file'), postSignature)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
