const express = require(`express`);
const app = express();
const { v4: uuid } = require(`uuid`);
const path = require(`path`)

const router = require(`./routes`);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

app.use(router)

//if no router match, return the index.html
app.get(`*`, (req, res) => {
  console.log(`GET REQUEST FOR * RECEIVED`)
  res.status(404)
    .sendFile(path.join(__dirname, `./public/index.html`))
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} at http://localhost:${PORT}`)
})