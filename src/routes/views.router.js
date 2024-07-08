import express from 'express';
import { Router } from 'express';
import { productsService } from '../managers/index.js';

const router = Router();

router.get('/',async (req,res) =>{
    const products = await productsService.loadProducts();
    res.render('home',{
        products
    });
})

router.get('/realtimeproducts', (req,res) =>{
    res.render('realTimeProducts');
})

router.get('/:id',async (req,res) =>{
    const pid = req.params.id;
    const product = await productsService.getProductById(pid);
    res.render('productsDetail',{
        product
    })
})




export default router;