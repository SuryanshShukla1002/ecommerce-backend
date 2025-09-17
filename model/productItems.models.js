import mongoose from 'mongoose';

const prodcutItemsSchema = new mongoose.Schema({
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
    description1: {
        type: String
    },
    description2: {
        type: String
    },
    description3: {
        type: String
    },
    description4: {
        type: String
    }
});

const ProductItems = mongoose.model("ProductItems", prodcutItemsSchema);

export default ProductItems;