const express = require(`express`);
const router = express.Router();

//return notes.html
router.get(`/notes`, (req, res) => {
  console.log(`GET REQUEST FOR /notes RECEIVED`)
  res.json({"GET /notes": "WORKS"})
});

//if no match, return the index.html
router.get(`*`, (req, res) => {
  console.log(`GET REQUEST FOR * RECEIVED`)
  res.json({"GET *": "WORKS"})
})

module.exports = router;