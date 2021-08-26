const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const fs = require(`fs`);
const { v4: uuid } = require(`uuid`);
const COLOR = require(`../helpers/consoleColors`);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//reads db.json file and returns all saved notes to client
router.get(`/api/notes`, (req, res) => {
  console.log(`${COLOR.fgGreen}GET${COLOR.reset} REQUEST AT /api/notes RECEIVED`);
  fs.readFile(
    path.join(__dirname, `../db/db.json`), 
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(`ERROR: `, err);
        res.status(500).send(err);
      } else {
        res.json(JSON.parse(data));
      }
    }
  )
});

//receives new note to save on the request body, adds UUID, reads db.json file, appends  new entry to it, then returns the new database content to the client.
router.post(`/api/notes`, async (req, res) => {
  console.log(`${COLOR.fgYellow}POST${COLOR.reset} REQUEST at /api/notes RECEIVED`);
  const {title, text} = req.body; //{ title: 'Note Title.', text: 'Note Text.' }

    if(title && text) {

      const newEntry = {
        "title": title,
        "text": text,
        "id": uuid()
      };

      fs.readFile(
        path.join(__dirname, `../db/db.json`),
        "utf-8",
          (err, dbContents) => {
        if (err) {
            console.log(`3. ERROR: `,err);
            res.status(500).send(err);
        } else {
            let db = JSON.parse(dbContents);
            db.push(newEntry);

            fs.writeFile(
              path.join(__dirname, `../db/db.json`), 
              JSON.stringify(db, null, 4), 
              (err) =>
              err ? console.error(err) : console.log(`${COLOR.fgCyan}DATA SUCCESSFULLY WRITTEN TO DATABASE.${COLOR.reset}`))

            res.status(201).json(db);
          }
      })
     
    } else {
      console.log(`POST REQUEST REJECTED AS INCOMPLETE`);
      res.status(400).json("ERROR: Please include both a title and text.")
    }
  });

//delete note based on query parameter that contains the ID of the note. Reads all notes from db.json file, removes note with corresponding id, then rewrites the db.json file and serves back to client.
router.delete(`/api/notes/:id`, (req, res) => {
  console.log(`${COLOR.fgRed}DELETE${COLOR.reset} REQUEST AT /api/notes/ RECEIVED`)

  fs.readFile(
    path.join(__dirname, `../db/db.json`), 
    "utf-8",
    (err, data) => {
      let JSONData = JSON.parse(data);
      let titleOfRemovedEntry;
      if (err) {
        console.log(`ERROR: `, err);
        res.status(500).send(err);
      } else {
        JSONData.every((entry) => {
          if (entry.id !== req.params.id) {
              return true;
          } else {
              console.log(`${COLOR.fgCyan}MATCH FOUND${COLOR.reset}`)
              titleOfRemovedEntry = entry.title;
              JSONData.splice(JSONData.indexOf(entry), 1)
              return false;
          }});

        fs.writeFile(
          path.join(__dirname, `../db/db.json`), 
          JSON.stringify(JSONData, null, 4), 
          (err) => {
            if (!err) {
              console.log(`${COLOR.fgCyan}MATCH DELETED${COLOR.reset}.`);
              res.status(204).json(JSONData);
            } else {
              res.status(500).json("ERROR: Server Could not complete delete request");
            }
          })
      }
    }
  )
})

module.exports = router;










//WORKS IN PLACE OF readAndWriteDB(path.join(__dirname, `../db/db.json`), newEntry);
//IN POST ROUTE

    // fs.readFile(
    //     path.join(__dirname, `../db/db.json`),
    //     "utf-8",
    //       (err, dbContents) => {
    //     if (err) {
    //         console.log(`3. ERROR: `,err);
    //         res.status(500).send(err);
    //     } else {
    //           console.log(`3. NO ERROR READING db.json FILE. CONTENTS ARE AS FOLLOWS:\n`, JSON.parse(dbContents));
    //         let db = JSON.parse(dbContents);
    //         db.push(newEntry);
    //         console.log(`THE UPDATED DATABASE IS AS FOLLOWS:\n`, db);

    //           fs.writeFile(
    //             path.join(__dirname, `../db/db.json`), 
    //             JSON.stringify(db, null, 4), 
    //             (err) =>
    //             err ? console.error(err) : console.log(`data successfully written to database.`))

    //         res.status(201).json(db);
    //       }
    //   })