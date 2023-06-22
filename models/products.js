const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
  rating: Number,
  likes: Number,
  imageUrl: String,
});

module.exports = mongoose.model("products", productsSchema);

// var products = [
//   {
//     id: 1,
//     title: "Mac Book Pro",
//     rating: 5,
//     price: 250000,
//     likes: 100,
//     imageUrl:
//       "https://www.apple.com/v/macbook-pro-14-and-16/b/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg",
//   },
//   {
//     id: 2,
//     title: "Mac Book Air",
//     rating: 5,
//     price: 200000,
//     likes: 200,
//     imageUrl:
//       "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664472289661",
//   },
//   {
//     id: 3,
//     title: "iPod",
//     rating: 4,
//     price: 25000,
//     likes: 700,
//     imageUrl:
//       "https://www.deccanherald.com/sites/dh/files/articleimages/2022/05/20/apples-original-ipod-1108279-1653031508.jpg",
//   },
//   {
//     id: 4,
//     title: "Boat Headphones",
//     rating: 4,
//     price: 2000,
//     likes: 300,
//     imageUrl:
//       "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/rockerz-518-blue_600x.png?v=1613731627",
//   },
//   {
//     id: 5,
//     title: "JBL Speakers",
//     rating: 3,
//     price: 5000,
//     likes: 800,
//     imageUrl:
//       "https://www.myg.in/images/detailed/12/JBL_Boombox_2-1_mgid-eu.jpg",
//   },
// ];

// module.exports = products;
