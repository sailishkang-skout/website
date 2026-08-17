
const { PRODUCTS_DATA } = require('./src/lib/productData');
console.log("PRODUCTS_DATA keys:", Object.keys(PRODUCTS_DATA));
console.log("Has 'dexter-ai':", !!PRODUCTS_DATA["dexter-ai"]);
if (PRODUCTS_DATA["dexter-ai"]) {
  console.log("dexter-ai slug:", PRODUCTS_DATA["dexter-ai"].slug);
}