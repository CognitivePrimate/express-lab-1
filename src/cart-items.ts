import express, {response} from "express";
const cartRoutes = express.Router();

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
    // string query arrays
    let prefixArray: object[] = [];
    let maxPriceArray: object[] = [];
    let pageSizeArray: object[] = [];

    // string query variables
    const maxPrice: number = Number(req.query.maxPrice);
    const prefix: string = String(req.query.prefix);
    const pageSize: number = Number(req.query.pageSize);

    // string query params
    if (maxPrice){
        for (let item of cart){
            item.price <= maxPrice ?  maxPriceArray.push(item) : null;
        }
        console.log(maxPriceArray);
        res.json(maxPriceArray);
    }else if (prefix && prefix != "undefined"){
        console.log(prefix)
        for (let item of cart){
            item.product.startsWith(prefix) ? prefixArray.push(item) : null;
        }
        console.log(prefixArray);
        res.status(200);
        res.json(prefixArray);
    }else if(pageSize){
        console.log("pageSize")
        console.log(pageSize)
        for (let i: number = 0; i < pageSize; i++){
            console.log(cart[i]);
            pageSizeArray.push(cart[i]);
        }
        console.log(pageSizeArray);
        res.json(pageSizeArray);
    } else {
        res.status(200);
        res.json(cart);
    };

})

// get cart items by :id
cartRoutes.get("/cart-items/:id", (req, res) => {
    let foundItem: cartItem|undefined = cart.find((item) => {    
        return item.id === parseInt(req.params.id)
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
            product: req.body.product,
            price: req.body.price,
            quantity: req.body.quantity,
            id:cart[itemIndex].id
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