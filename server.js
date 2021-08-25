const express = require(`express`);
const app = express();
const { v4: uuid } = require(`uuid`);

console.log(uuid())

const PORT = process.env.PORT || 5000;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

// app.use(require(`./routes`))

//return notes.html
app.get(`/notes`, (req, res) => {
  console.log(`GET REQUEST FOR /notes RECEIVED`)
  res.json({"GET /notes": "WORKS"})
})

//read db.json file and return all saved notes as JSON
app.get(`/api/notes`, (req, res) => {
  console.log(`GET REQUEST FOR /api/notes RECEIVED`)
  res.json({"GET /api/notes": "WORKS"})
})

//receive new note to save on the request body, add it to the db.json file, and return the new note to the client.
app.post(`/api/notes`, (req, res) => {
  console.log(`POST REQUEST FOR /api/notes RECEIVED`)
  res.json({"POST /api/notes": "WORKS"})
})

//delete note based on query parameter that contains the ID of the note. Need to read all notes from db.json file, remove note with corresponding id, then rewrite the notes and serve to client.
app.delete(`/api/notes/:id`, (req, res) => {
  console.log(`DELETE REQUEST FOR /api/notes RECEIVED`)
  res.json({"DELETE /api/notes/:id": `WORKS, id is ${req.params.id}`})
})

//if no match, return the index.html
app.get(`*`, (req, res) => {
  console.log(`GET REQUEST FOR * RECEIVED`)
  res.json({"GET *": "WORKS"})
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} at http://localhost:${PORT}`)
})