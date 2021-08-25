const express = require(`express`);
const router = express.Router();

//read db.json file and return all saved notes as JSON
router.get(`/api/notes`, (req, res) => {
  console.log(`GET REQUEST FOR /api/notes RECEIVED`)
  res.json({"GET /api/notes": "WORKS"})
})

//receive new note to save on the request body, add it to the db.json file, and return the new note to the client.
router.post(`/api/notes`, (req, res) => {
  console.log(`POST REQUEST FOR /api/notes RECEIVED`)
  res.json({"POST /api/notes": "WORKS"})
})

//delete note based on query parameter that contains the ID of the note. Need to read all notes from db.json file, remove note with corresponding id, then rewrite the notes and serve to client. ***NEED TO CHANGE TO QUERY PARAMS
router.delete(`/api/notes/:id`, (req, res) => {
  console.log(`DELETE REQUEST FOR /api/notes/${req.params.id} RECEIVED`)
  res.json({"DELETE /api/notes/:id": `WORKS, id is ${req.params.id}`})
})

module.exports = router;