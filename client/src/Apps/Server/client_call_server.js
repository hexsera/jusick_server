import React from "react";

import axios from 'axios';

const path = "http://localhost:8000"



export async function axios_get_user(data)
{
    const get_data = await axios.get(path+"/user", { params: {data: data}})
    //console.log(get_data.data);
    //console.log(typeof get_data.data);
    return get_data.data;
}

export async function axios_post_data_save(data, user_id)
{
    await axios.post(path+"/data/save", 
        {data: JSON.stringify(data), user_id: user_id});
}

export async function axios_get_data_load(data, user_id)
{
    const get_data =  await axios.get(path+"/data/load", { params: {date: data, user_id: user_id}});
    return get_data;
}

export async function axios_get_data_delete(data, user_id)
{
    await axios.get(path+"/data/delete", { params: {date: data, user_id: user_id}});

}

export async function axios_get_data_list(user_id)
{
    const get_data = await axios.get(path+"/data/list", {params: {user_id: user_id}});
    const json_data = JSON.parse(get_data.data).data;
    console.log(json_data);
    return json_data;
}