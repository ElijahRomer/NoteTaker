const express = require(`express`);
const app = express();
const { v4: uuid } = require(`uuid`);

const router = require(`./routes`);

// console.log(`DIRNAME: `, __dirname)
// console.log(`FILENAME: `, __filename)

// console.log(router)

// console.log(uuid())

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

app.use(router)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} at http://localhost:${PORT}`)
})