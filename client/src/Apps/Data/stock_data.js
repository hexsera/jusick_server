import { createContext, useRef, useContext } from 'react';

function make_stock_data(
    name, id, money, wantper, parent_id, item
)
{
    return {name, id, money, wantper, parent_id, item}
}

export const full_data = {
    id: "",
    date: "",
    item: [
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
]}

export const Stock_full_data = createContext();

export function save_data(give_data)
{
    //console.log(full_data);
    console.log(Stock_full_data);

}

