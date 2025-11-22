import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import initalizeDataBase from './db/db.config.js';
import Product from './model/products.models.js';
import ProductItems from './model/productItems.models.js';
import User from './model/user.models.js';
const app = express();

initalizeDataBase();
app.use(cors());
app.use(express.json());

app.post("/users/signup", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        const ifUserExists = await User.findOne({ email });
        if (ifUserExists) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashpassword,
        });

        await newUser.save();

        res.status(201).json({ message: "Signup Successful" });
    } catch (err) {
        res.status(500).json({ message: "Signup failed" });
    }
});

app.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }
        return res.status(200).json({
            message: "Login Successful",
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({ message: "Login failed" });
    }
});


async function createProduct(newData) {
    try {
        const savedProducts = new ProductItems(newData);
        const savedEachProducts = await savedProducts.save();
        return savedEachProducts;
    } catch (err) {
        throw err;
    }
}


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