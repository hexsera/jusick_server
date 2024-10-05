const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const port = 8000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.get('/test', (req, res) => {
  console.log("test 접속");
  res.json(JSON.stringify(full_data));
});

app.post('/get', (req, res) =>
{
  res.send("Post");
  console.log("save 접속");
  fs.writeFile("./server/data/test.json", req.body.data, (err) => {
    
  });
  //console.log(JSON.parse(req.body.data));
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*
axios.get("")
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
*/