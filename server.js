const express = require(`express`);
const app = express();
const { v4: uuid } = require(`uuid`);
const path = require(`path`)
const COLOR = require(`./helpers/consoleColors`)

const router = require(`./routes`);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

app.use(router)

//if no router match, return the index.html
app.get(`*`, (req, res) => {
  console.log(`${COLOR.fgGreen}GET${COLOR.reset} REQUEST FOR * RECEIVED`)
  res.status(404)
    .sendFile(path.join(__dirname, `./public/index.html`))
})

app.listen(PORT, () => {
  console.log(`${COLOR.fgCyan}App is listening on port ${PORT} at http://localhost:${PORT}${COLOR.reset}`)
})