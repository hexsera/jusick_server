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
  list: [],
  file_name: {}
}

function date_index_find(to_date, date_list)
{
  const to_date_sp = to_date.split("-");
  //let find = false;
  for (let i=0; i<date_list.length; i++)
  {
    const data_list_sp = date_list[i].split("-");
    if (parseInt(to_date_sp[0]) == parseInt(data_list_sp[0]))
    {
      if (parseInt(to_date_sp[1]) == parseInt(data_list_sp[1]))
      {
        if (parseInt(to_date_sp[2]) == parseInt(data_list_sp[2]))
        {
          //동일 존재
          return -1;
        }
        else if (parseInt(to_date_sp[2]) > parseInt(data_list_sp[2]))
        {
          //일 큼
          return i;
        }
      }
      else if (parseInt(to_date_sp[1]) > parseInt(data_list_sp[1]))
      {
        //월 큼
        return i;
      }
    }
    else if (parseInt(to_date_sp[0]) > parseInt(data_list_sp[0]))
    {
      //년 큼
      return i;
    }

  }
  return -2;
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

app.get('/user', (req, res) => {
  const user_id = req.query.data;
  console.log(user_id);
  const user = fs.readFileSync("./server/data/user_id/users.json", "utf8");
  const user_list = JSON.parse(user);
  //console.log();


  res.send(user_list.user_id.includes(user_id));
});

app.post('/data/save', (req, res) => {

  res.send("data/save");


  const user_path = req.body.user_id;
  //console.log(user_path);

  if (fs.existsSync("./server/data/"+user_path) == false)
  {
    fs.mkdirSync("./server/data/"+user_path);
    fs.mkdirSync("./server/data/"+user_path+"/files");
  }
  //console.log(fs.existsSync("./server/data/"+user_path));

  
  try{
    fs.statSync("./server/data/"+user_path+"/save_list.json");
  }
  catch(e){
    fs.writeFileSync("./server/data/"+user_path+"/save_list.json", JSON.stringify(save_list_frame));
  }



  const data = fs.readFileSync("./server/data/"+user_path+"/save_list.json", "utf8");
  console.log("data: ", data);
  let save_list = JSON.parse(data);
  

  let save_data = JSON.parse(req.body.data);
  console.log("save_data:", save_data.date)

  const idx = date_index_find(save_data.date, save_list.list);
  if (idx == -1)
  {
    //동일 존재
  }
  else if (idx == -2)
  {
    //빈 리스트 or 제일 작음
    save_list.list.push(save_data.date);
  }
  else
  {
    save_list.list.splice(idx, 0, save_data.date);
  }




  save_list.file_name[save_data.date] = `${save_data.date}.json`
  console.log("new_savelist: ", save_list);

  fs.writeFileSync(`./server/data/${user_path}/files/${save_data.date}.json`, JSON.stringify(save_data));
  fs.writeFileSync("./server/data/"+user_path+"/save_list.json", JSON.stringify(save_list));

});

app.get('/data/load', (req, res) => {
  console.log("load_query", req.query.date);

  const user_path = req.query.user_id;
  

  if (fs.existsSync("./server/data/"+user_path) == false)
  {
    res.json(JSON.stringify({date: "new"}));
  }
  else
  {
    const save_list_data = fs.readFileSync("./server/data/"+user_path+"/save_list.json", "utf8");
    const save_list = JSON.parse(save_list_data);
    if (Object.keys(save_list.file_name).includes(req.query.date) == true)
    {
      console.log("have");
      //let save_file = {}
      const save_file_data = fs.readFileSync(`./server/data/${user_path}/files/${save_list.file_name[req.query.date]}`, "utf8");
      const save_file = JSON.parse(save_file_data);

      res.json(JSON.stringify(save_file));
    }
    else
    {
      console.log("nohave");
      console.log(req.query.date);
      res.json(JSON.stringify({date: "new"}));
    }
  }

  //res.send("hh");
});

app.get('/data/delete', (req, res) => {

  const user_path = req.query.user_id;
  if (fs.existsSync("./server/data/"+user_path) == false)
  {
    res.send("no file");
    console.log("1nofile");
  }
  else
  {
    const save_list_data = fs.readFileSync("./server/data/"+user_path+"/save_list.json", "utf8");
    const save_list = JSON.parse(save_list_data);

    const idx = save_list.list.indexOf(req.query.date);
    if (idx != -1)
    {
      console.log(idx);
      save_list.list.splice(idx, 1);
      fs.unlinkSync(`./server/data/${user_path}/files/${save_list.file_name[req.query.date]}`);
      delete save_list.file_name[req.query.date];
      fs.writeFileSync("./server/data/"+user_path+"/save_list.json", JSON.stringify(save_list));

      console.log("delete");
      res.send("delete");
    }
    else
    {
      console.log("nofile");
      res.send("no file");
    }
  }
});

app.get('/data/list', (req, res) => {
  console.log("list_get");

  const user_path = req.query.user_id;

  if (fs.existsSync("./server/data/"+user_path) == false)
  {
    res.json(JSON.stringify({data: []}));
  }
  else
  {
    const save_list_data = fs.readFileSync("./server/data/"+user_path+"/save_list.json", "utf8");
    const save_list = JSON.parse(save_list_data);

    const list = save_list.list
    //console.log(Object.keys(save_list));
    res.json(JSON.stringify({data: list}));
  }

  
  //res.send("hh");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
