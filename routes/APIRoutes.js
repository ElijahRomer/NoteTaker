const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const fs = require(`fs`);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//__dirname: C:\Users\romer\Desktop\GitHub-Repositories\NoteTaker\routes

//__filename: C:\Users\romer\Desktop\GitHub-Repositories\NoteTaker\routes\APIRoutes.js

//read db.json file and return all saved notes as JSON
router.get(`/api/notes`, (req, res) => {
  console.log(`GET REQUEST FOR /api/notes RECEIVED`)
  fs.readFile(
    path.join(__dirname, `../db/db.json`), 
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(`ERROR: `,err);
        res.status(500).send(err);
      } else {
        console.log(`NO ERROR, DATA AS FOLLOWS: ` , JSON.parse(data));
        res.json(JSON.parse(data));
      }
    }
  )
});

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