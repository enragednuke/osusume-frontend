const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  // server.get('/p/:id', (req, res) => {
  //   const actualPage = '/post'
  //   const queryParams = { id: req.params.id }
  //   app.render(req, res, actualPage, queryParams)
  // })

  server.get('/user/token/:token', (req, res) => {
    app.render(req, res, '/user', {access_token: req.params.token})
  })

  server.get('/user', (req, res) => {
    // If the user reloads the page after masking the token, just pass through login to prevent errors
    let BACKEND_URI = process.env.BACKEND_URI || "http://localhost:8888/login"
    res.redirect(BACKEND_URI)
  })

  server.get('/login', (req, res) => {
    let BACKEND_URI = process.env.BACKEND_URI || "http://localhost:8888/login"
    res.redirect(BACKEND_URI)
  })


  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
