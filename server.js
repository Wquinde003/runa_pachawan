const express = require('express')
const cors = require('cors')
const path = require('path')

const config = require('./config')
const db = require('./bd')
const router = require('./network/router')

const app = express()

app.use(cors())
app.use(express.json())

// ✅ Servir estáticos
app.use(express.static(path.join(__dirname, 'public')))

// ✅ IMPORTANTE: que / vaya a /inicio/
app.get('/', (req, res) => {
  res.redirect('/inicio/')
})

// ✅ Servir /inicio/ como carpeta (para que ./inicio.css funcione)
app.get('/inicio/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'inicio', 'index.html'))
})

router(app)

db(config.DB_URL)

app.listen(config.PORT, () => {
  console.log(`[server] Running on http://${config.HOST}:${config.PORT}`)
})
