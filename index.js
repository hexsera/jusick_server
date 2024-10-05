const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const port = 8000;
const bodyParser = require('body-parser');
const fs = require('fs');
const { json } = require('stream/consumers');

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

console.error("-----------------------update---------------------------------------------");

function make_stock_data(
  name, id, money, wantper, parent_id, item
)
{
  return {name, id, money, wantper, parent_id, item}
}

const full_data = [
  make_stock_data("한국", crypto.randomUUID(), 0, 30, "", [
      make_stock_data("한국은행주", crypto.randomUUID(), 0, 30, "", [
          make_stock_data("하나은행", crypto.randomUUID(), 0, 30, "", []),
          make_stock_data("국민은행", crypto.randomUUID(), 0, 30, "", []),
      ]),
      make_stock_data("배당주", crypto.randomUUID(), 0, 30, "", [
          make_stock_data("배당1", crypto.randomUUID(), 0, 30, "", []),
          make_stock_data("배당2", crypto.randomUUID(), 0, 30, "", []),
      ])
  ]),
  make_stock_data("미국", crypto.randomUUID(), 0, 30, "", [
      make_stock_data("미국은행주", crypto.randomUUID(), 0, 30, "", [
          make_stock_data("미국은행", crypto.randomUUID(), 0, 30, "", []),
          make_stock_data("미국2은행", crypto.randomUUID(), 0, 30, "", []),
      ]),
      make_stock_data("배당주", crypto.randomUUID(), 0, 30, "", [
          make_stock_data("배당11", crypto.randomUUID(), 0, 30, "", []),
          make_stock_data("배당22", crypto.randomUUID(), 0, 30, "", []),
      ])
  ]),
]

const save_list_frame = {
  //"save_data" : "file_name"
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.get('/test', (req, res) => {
  //sample["test"] = "see"
  console.log("test 접속");
  //res.json(JSON.stringify(full_data));
  //fs.writeFile("./server/data/save_list.json", JSON.stringify(save_list_frame), (err) => { });
  res.send("test");
});

app.get('/test_get', (req, res) => {
  console.log("test_get");
  fs.readFile("./server/data/save_list.json", "utf8", (err, data) =>{
    const open_file = JSON.parse(data);
    res.send(open_file);
    console.log(open_file["test"]);
  })
})

app.post('/get', (req, res) =>
{
  res.send("Post");
  console.log("save 접속");
  fs.writeFile("./server/data/test.json", req.body.data, (err) => {
    
  });
  //console.log(JSON.parse(req.body.data));
  
});

app.post('/data/save', (req, res) => {
  res.send("data/save");

  const data = fs.readFileSync("./server/data/save_list.json", "utf8");
  console.log("data: ", data);
  let save_list = JSON.parse(data);
  

  let save_data = JSON.parse(req.body.data);
  console.log("save_data:", save_data.date)
  save_list[save_data.date] = `${save_data.date}.json`
  console.log("new_savelist: ", save_list);

  fs.writeFileSync(`./server/data/files/${save_data.date}.json`, JSON.stringify(save_data));
  fs.writeFileSync("./server/data/save_list.json", JSON.stringify(save_list));

});

app.get('/data/load', (req, res) => {
  console.log("load_query", req.query.date);

  const save_list_data = fs.readFileSync("./server/data/save_list.json", "utf8");
  const save_list = JSON.parse(save_list_data);

  if (Object.keys(save_list).includes(req.query.date) == true)
  {
    console.log("have");
    //let save_file = {}
    const save_file_data = fs.readFileSync(`./server/data/files/${save_list[req.query.date]}`, "utf8");
    const save_file = JSON.parse(save_file_data);

    res.json(JSON.stringify(save_file));
  }
  else
  {
    console.log("nohave");
    console.log(req.query.date);
    res.json(JSON.stringify({date: "new"}));
  }


  //res.send("hh");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
