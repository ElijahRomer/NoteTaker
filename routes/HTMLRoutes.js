const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const COLOR = require(`../helpers/consoleColors`);

router.use(express.static(`public`))

// return notes.html
router.get(`/notes`, (req, res) => {
  console.log(`${COLOR.fgGreen}GET${COLOR.reset} REQUEST FOR /notes RECEIVED`)
  res.sendFile(path.join(__dirname, `../public/notes.html`))
});

module.exports = router;