import CartManager from "./mongo/cartManager.js";
import ProductsManager from "./mongo/productsManager.js";

export const cartsService = new CartManager();
export const productsService = new ProductsManager();
