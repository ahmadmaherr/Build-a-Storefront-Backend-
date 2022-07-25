import productType from "../types/product.type";
import { ProductStore } from "../models/product.model";
import { Request, Response } from "express";


const store = new ProductStore();

export const index = async (req: Request, res: Response) => {
  try {
    const products: productType[] = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

//get product by id

export const getOne = async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id);
    const product: productType = await store.getOne(productId);
    res.json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

//create product

export const create = async (req: Request, res: Response) => {
  try {
    const product: productType = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct: productType = await store.create(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

// get product by category

export const showByCategory = async (req: Request, res: Response) => {
  try {
    const category = String(req.params.category);
    const productsbyCat: productType[] = await store.getProductbyCat(category);
    res.json(productsbyCat);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

// Delete product by ID

export const destroy = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const deletedOrder = await store.deleteProduct(id);
    return res.end(`Deleted product: ${deletedOrder}`);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};