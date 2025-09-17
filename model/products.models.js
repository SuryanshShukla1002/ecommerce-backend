import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    productImage: {
        type: String,
    },
    category: {
        type: String
    },
    productDescription: {
        type: String,
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
