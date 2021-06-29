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

// cart object interface
interface cartItem {
    id: number,
    product: string,
    price: number,
    quantity: number
}

// mock cart
let cart: cartItem[] = [
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
// cartRoutes.get("./cart-items", (req, res) => {
//     let cartFilter: object = [];
//     // get items, filtered by query string params
//     if (req.query.startsWith()){
//         maxPrice(num);
//     }
// })

// get cart items by :id
cartRoutes.get("/cart-items/:id", (req, res) => {
    let foundItem = cart.find((item) => {
        return item.id === parseInt(req.params.id)
        // ^^^^is this necc? can i just move if statement below up into this instead?
    });
    if (foundItem){
        // have item
        res.status(200);
        res.json(foundItem)
    }else {}

})










export default cartRoutes;