import { OrderProductStore } from "../models/orderProduct.model";
import{ Request,Response} from 'express';
import OrderProductType from "../types/orderProduct.type";



 const store = new OrderProductStore();

 export const addProduct = async (req:Request, res:Response)=>{
    const order_id: number = parseInt(req.params.id as unknown as string);
    const product_id: number = parseInt(req.body.product_id as unknown as string);
    const quantity: number = parseInt(req.body.quantity);
    const orderProduct: OrderProductType = {quantity, order_id, product_id};

    try{
        const newOrderProduct = await store.addProduct(orderProduct);
        res.json(newOrderProduct);
    } catch(error){
        res.status(400);
        res.json(error);

    }

 };

