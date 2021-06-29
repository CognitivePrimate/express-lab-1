import express, {response} from "express";
const cartRoutes = express.Router();

const maxPrice = (max: number): object[] => {
    let maxPriceArray: any = [];
    for (let item of cart){
        console.log(item);
        // item.price <= max ?  maxPriceArray.push(item) : null;
    }
    return maxPriceArray;
}

// mock cart
let cart: object[] = [
    {
        id: 1,
        product: "windshield",
        price: 375,
        quantity: 2
    },
    {
        id: 2,
        product: "tune-up",
        price: 280,
        quantity: 1
    },
    {
        id: 3,
        product: "AC drainage hose",
        price: 80,
        quantity: 1
    },
    {
        id: 4,
        product: "wet/dry vacuum",
        price: 150,
        quantity: 1
    },             
]

let nextId: number = cart.length +1;

// get cart items
cartRoutes.get("./cart", (req, res) => {
    let cartFilter: object = [];
    // get items, filtered by query string params
    if (req.query.s)
})











export default cartRoutes;