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

// GET
// get cart items
cartRoutes.get("./cart-items", (req, res) => {
    // let cartFilter: object = [];
    // get items, filtered by query string params
    // if (req.query.product.cartItem.startsWith()){
    //     maxPrice(num);
    // }
    res.json(cart);
})

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
    }else {
        return `ID Not Found: ${res.sendStatus(404)}`;
    }
})

// POST 
// add cart item to array with new id
cartRoutes.post("/cart-items", (req, res) => {
    // let newItem: cartItem = {
    //     id: nextId,
    //     product: req.body,
    //     price: req.body,
    //     quantity: req.body.quantity
    // };
    // weird but found on the internet
    const incomingItem = req.body;
    incomingItem.id = nextId;
    // increments each time new item is added to cart array
    nextId++;
    // pushes new item into cart
    cart.push(incomingItem);
    console.log(cart);
    res.status(201);
    res.json(incomingItem);
})












export default cartRoutes;