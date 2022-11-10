const express = require('express');
const session = require('express-session');
const router = require('./routes');
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.set("view engine",'ejs');

app.use('/',router)
app.use(session({
  secret: 'ini terbuka',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))


app.listen(port, () => {
  console.log(`Phase 1 Ezz Bangeet`)
})