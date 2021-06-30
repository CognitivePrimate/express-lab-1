import express, {response} from "express";
const cartRoutes = express.Router();

// const maxPrice = (max: number): object[] => {
//     let maxPriceArray: object[] = [];
//     for (let item of cart){
//         console.log("maxPriceRuns");
//         item.price <= max ?  maxPriceArray.push(item) : null;
//     }
//     console.log(max);
//     console.log(maxPriceArray);
//     return maxPriceArray;
// }

// cart object interface
interface cartItem {
    product: string,
    price: number,
    quantity: number,
    id: number,
}

// mock cart
let cart: cartItem[] = [
    {
        product: "windshield",
        price: 375,
        quantity: 2,
        id: 1,
    },
    {
        product: "tune-up",
        price: 280,
        quantity: 1,
        id: 2,
    },
    {
        product: "AC drainage hose",
        price: 80,
        quantity: 1,
        id: 3
    },
    {
        product: "wet/dry vacuum",
        price: 150,
        quantity: 1,
        id: 4
    },             
]

let nextId: number = cart.length +1;

// GET
// get cart items
cartRoutes.get("/cart-items", (req, res) => {
    let cartFilter: object = [];
    let maxPriceArray: object[] = [];
    const maximumPrice: any = req.query.maximumPrice;
    // get items, filtered by query string params
    // typeof parseInt(maximumPrice  === "number")   <----taken from below's if statement
    if (req.query.maxPrice){
        console.log("in max query");
        // maxPrice(maximumPrice);
        // copying maxPrice() function into here essentially
       
        for (let item of cart){
            console.log("maxPriceLoopRuns");
            item.price <= parseInt(maximumPrice) ?  maxPriceArray.push(item) : null;
        }
    }

    console.log("get is being accessed");
    res.json(cart);
    console.log(maximumPrice);
    console.log(maxPriceArray);
    return maxPriceArray;
    
    
})

// get cart items by :id
cartRoutes.get("/cart-items/:id", (req, res) => {
    let foundItem = cart.find((item) => {
        return item.id === parseInt(req.params.id)
        // ^^^^is this necc? can i just move if statement below up into this instead? ASK KYLE***
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

// PUT
// update by id
cartRoutes.put("/cart-items/:id", (req, res) => {
    let itemIndex = cart.findIndex((item) => {
        console.log(item.id);
        return item.id === parseInt(req.params.id);
    });
    // found it!
    if (itemIndex > -1){
        console.log("found, now in if statement");
        cart[itemIndex] = {
            id:cart[itemIndex].id,
            product: req.body.product,
            price: req.body.price,
            quantity: req.body.quantity
        };
        // send update cart array
        res.status(200);
        res.json(cart);  
    }else {
        res.sendStatus(204)
    }
    
})


// DELETE
// delete item by id 
cartRoutes.delete("/cart-items/:id", (req, res) => {
    let itemIndex = cart.findIndex((item) => {
        return item.id === parseInt(req.params.id);
    });
    // statuses "no content" : "bad request"
    itemIndex > -1 ? cart.splice(itemIndex, 1) && res.sendStatus(204) : res.sendStatus(400);
    console.log(cart);
    res.status(201);
})












export default cartRoutes;