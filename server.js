const express = require(`express`);
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

// app.use(require(`./routes`))

app.get(`/notes`, (req, res) => {
  console.log(`GET REQUEST FOR /notes RECEIVED`)
  res.json({"GET /notes": "WORKS"})
})
app.get(`/api/notes`, (req, res) => {
  console.log(`GET REQUEST FOR /api/notes RECEIVED`)
  res.json({"GET /api/notes": "WORKS"})
})

app.post(`/api/notes`, (req, res) => {
  console.log(`POST REQUEST FOR /api/notes RECEIVED`)
  res.json({"POST /api/notes": "WORKS"})
})

app.delete(`/api/notes/:id`, (req, res) => {
  console.log(`DELETE REQUEST FOR /api/notes RECEIVED`)
  res.json({"DELETE /api/notes/:id": `WORKS, id is ${req.params.id}`})
})

app.get(`*`, (req, res) => {
  console.log(`GET REQUEST FOR * RECEIVED`)
  res.json({"GET *": "WORKS"})
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} at http://localhost:${PORT}`)
})