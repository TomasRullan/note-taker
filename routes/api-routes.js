const fs = require('fs');
var uniqid = require("uniqid");

module.exports = function (app) {

    app.get("/api/notes", async (req, res) => {
    let data = fs.readFileSync("./Develop/db/db.json","utf8");
    res.json(JSON.parse(data));
  });

  app.post("/api/notes", (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
        id: uniqid(),
      };

    let data = fs.readFileSync("./Develop/db/db.json", "utf8");
    const dataJSON = JSON.parse(data);
    dataJSON.push(newNote);

    fs.writeFile("./Develop/db/db.json",JSON.stringify(dataJSON),
        (err, text) => {
          if (err) {
            console.error(err);
            return;
          }
        });

    res.json(data);
    });


app.delete("/api/notes/:id", (req, res) => {
let data = fs.readFileSync("./Develop/db/db.json", "utf8");
const dataJSON = JSON.parse(data);
const newNotes = dataJSON.filter((note) => {
    return note.id !== req.params.id;
  });

    fs.writeFile( "./Develop/db/db.json",JSON.stringify(newNotes),(err, text) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    
    res.json(newNotes);
  });
};