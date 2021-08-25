const express = require(`express`);
const router = express.Router();
const path = require(`path`);

router.use(express.static(`public`))

// return notes.html
router.get(`/notes`, (req, res) => {
  console.log(`GET REQUEST FOR /notes RECEIVED`)
  res.sendFile(path.join(__dirname, `../public/notes.html`))
});

module.exports = router;