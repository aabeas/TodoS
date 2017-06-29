const express = require('express');
const app = express()
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

app.engine("mustache", mustache())
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(3000, function(){
  console.log("life is good, but can be gooder.");
})

const due = [];
const done = [];
// const forget = [];

app.get('/', function (req, res){
  res.render("duedone", {
    pageTitle: "Due & Done",
    listTitle01: "List_Due",
    listTitle02: "List_Done",
    // listTitle03: "Forgotten",
    due: due,
    done: done,
    // forget: forget
  })
});

app.post('/', function(req, res){
  if(req.body.done){
    for (var i = 0; i < due.length; i++) {
      if(due[i]===req.body.done){
        due.splice(due[i]-1, 1)
      }
    }
    done.push(req.body.done)
  } else if (req.body.due){
    due.push(req.body.due)
  }
  res.redirect('/')
});

// app.post('/', function(req, res){
//   if(req.body.forget){
//     for (var i = 0; i < done.length; i++) {
//       if(done[i]===req.body.forget){
//         done.splice(done[i]-1, 1)
//       }
//     }
//     forget.push(req.body.forget)
//   } else if (req.body.done){
//     done.push(req.body.done)
//   }
//   res.redirect('/')
// });
