import path from 'path';
import express from "express";
import cors from "cors";

import cartRoutes from "./cart-items";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

app.use("/", cartRoutes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})