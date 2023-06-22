const express = require("express");
const router = express.Router();
let ProductsModel = require("../models/products");

router.get("/", async (req, res) => {
  try {
    console.log("/products GET");
    let products = await ProductsModel.find({});
    res.json(products);
  } catch (error) {
    console.log(err);
  }
});

router.post("/newproduct", async (req, res) => {
  // new product
  try {
    await ProductsModel.create(req.body);
    res.json({ status: true, msg: "Product Added Successfully !" });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    await ProductsModel.deleteOne({ id: req.params.id });
    res.json({ status: true, msg: "Product Deleted successfully !" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong !");
  }
});

module.exports=router;

// res.json({status:true,msg:"Product deleted successfully"})


