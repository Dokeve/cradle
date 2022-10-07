const fs = require('fs');
const path = require('path');
const express = require('express');
const serve   = require('express-static');

const pythoncode = path.join("Derek\Documents\Derek\Krippe\cradle\python\scenario.txt");
console.log(pythoncode);
let wechsel = false;
let day = true;
const app = express();
 
app.use((req, res, next) => {
  console.log(req.url);
  next();
})

app.get("/action", (req, res, next) => {
  let file = "dauer";
  if(wechsel) {
    day=!day;
    if(day) {
      file = "tag";
    } else {
      file = "nacht";
    }
  }     
  fs.copyFile(path.resolve(`./${file}.txt`), pythoncode, (err) => {
    if (err) next(err);
  });
  res.redirect('/');
});


app.get("/scenario/:scenario", (req, res, next) => {
  let file = path.resolve(`./templates/${req.params.scenario}.txt`);

  if(req.params.scenario=="dauer") {
    wechsel = false;
  }
  if(req.params.scenario=="wechsel") {
    wechsel = true;
    file = path.resolve(`./tag.txt`);
  }

  fs.copyFile(file, pythoncode , (err) => {
    if (err) next(err);
  });
  res.redirect('/');
});

app.use(serve(__dirname + '/public'));

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.json({ error: err })
});

const server = app.listen(3000, function(){
  console.log('server is running at %s', server.address().port);
  console.log( server.address())
});
