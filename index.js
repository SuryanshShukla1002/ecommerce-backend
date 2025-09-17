import express from "express";
import cors from "cors";
import initalizeDataBase from './db/db.config.js';
import Product from './model/products.models.js';
import ProductItems from './model/productItems.models.js';
const app = express();

initalizeDataBase();
app.use(cors());
app.use(express.json());


async function createProduct(newData) {
    try {
        const savedProducts = new ProductItems(newData);
        const savedEachProducts = await savedProducts.save();
        return savedEachProducts;
    } catch (err) {
        throw err;
    }
}

// createProduct(newData);

app.post("/products", async (req, res) => {
    try {
        const savedNewData = await createProduct(req.body);
        if (savedNewData) {
            res.status(201).json(savedNewData);
        } else {
            res.status(404).json({ error: "Unable to add the data" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch the data" });
    }
});

async function getAllProduct() {
    try {
        const getAll = await Product.find();
        return getAll;
    } catch (err) {
        throw err;
    }
}


app.get("/products", async (req, res) => {
    try {
        const getAll = await getAllProduct();
        if (getAll) {
            res.status(200).json(getAll);
        } else {
            res.status(404).json({ error: "Unable to get all data" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

async function getAllPorductItems() {
    try {
        const allProductItems = await ProductItems.find();
        return allProductItems;
    } catch (error) {
        throw error;
    }
}

app.get("/productItems", async (req, res) => {
    try {
        const savedItemsProduct = await getAllPorductItems();
        if (savedItemsProduct) {
            res.status(200).json(savedItemsProduct);
        } else {
            res.status(404).json({ error: "Unable to get all data" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the data" });
    }
});

async function getAllProductByCategory(productCategory) {
    try {
        const categoryproduct = await ProductItems.find({ category: productCategory });
        return categoryproduct;
    } catch (err) {
        throw err;
    }
}

app.get("/products/:prodCategory", async (req, res) => {
    try {
        const category = await getAllProductByCategory(req.params.prodCategory);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: "unable to fetch the category the data " });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

async function getDataById(productId) {
    try {
        const getId = await ProductItems.findById(productId);
        return getId;
    } catch (err) {
        throw err;
    }
}

app.get("/products/details/:productId", async (req, res) => {
    try {
        const SavedGetById = await getDataById(req.params.productId);
        if (SavedGetById) {
            res.status(200).json(SavedGetById);
        } else {
            res.status(404).json({ error: "Unable to fetch the data by Id" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is listening on", PORT);
});