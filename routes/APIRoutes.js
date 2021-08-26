const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const fs = require(`fs`);
const { v4: uuid } = require(`uuid`);
const { readAndWriteDB } = require(`../helpers/functions.js`)


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//read db.json file and return all saved notes as JSON
router.get(`/api/notes`, (req, res) => {
  console.log(`GET REQUEST FOR /api/notes RECEIVED`)
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

//receive new note to save on the request body, add UUID, write it to the db.json file, and return the new note to the client.
router.post(`/api/notes`, async (req, res) => {
  console.log(`1. POST REQUEST FOR /api/notes RECEIVED`);
  const {title, text} = req.body; //{ title: 'Note Title.', text: 'Note Text.' }

  console.log(`2. TITLE: ${title}, TEXT: ${text}.`)

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
            console.log(`DATABASE SUCCESSFULLY UPDATED.`);

              fs.writeFile(
                path.join(__dirname, `../db/db.json`), 
                JSON.stringify(db, null, 4), 
                (err) =>
                err ? console.error(err) : console.log(`data successfully written to database.`))

            res.status(201).json(db);
          }
      })
     
    } else {
      console.log(`POST REQUEST REJECTED AS INCOMPLETE`);
      res.status(400).json({"ERROR": "Please include both a title and text."})
    }
  });

//delete note based on query parameter that contains the ID of the note. Need to read all notes from db.json file, remove note with corresponding id, then rewrite the notes and serve to client. ***NEED TO CHANGE TO QUERY PARAMS
router.delete(`/api/notes/:id`, (req, res) => {
  console.log(`DELETE REQUEST FOR /api/notes/${req.params.id} RECEIVED`)

  fs.readFile(
    path.join(__dirname, `../db/db.json`), 
    "utf-8",
    (err, data) => {
      let JSONData = JSON.parse(data);
      console.log(JSONData);
      if (err) {
        console.log(`ERROR: `, err);
        res.status(500).send(err);
      } else {
        JSONData.forEach((entry) => {
          
          console.log(entry.id);
          
          if (entry.id !== req.params.id) {
            return;
          } else {
            console.log(`MATCH FOUND`)
            JSONData.splice(JSONData.indexOf(entry), 1)
            return JSONData;
          }
        })
        res.json(JSON.parse(data));
      }
    }
  )

  // res.json({"DELETE /api/notes/:id": `WORKS, id is ${req.params.id}`})
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