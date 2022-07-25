import  { Request, Response } from "express";
import OrderType from "../types/order.type";
import { Order } from "../models/order.model";

const orderStore = new Order();

//create order
export const create = async (req: Request, res: Response) => {
  try {
    const order: OrderType = {
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      status: req.body.status,
    };
    const newOrder: OrderType = await orderStore.create(order);
    return res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// get all completed orders
export const CompletedOrders = async (req: Request, res: Response) => {
  try {
    const Orders: OrderType[] = await orderStore.getCompletedOrders();
    return res.json(Orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
export const CurrentOrders = async (req: Request, res: Response) => {
  try {
    const Orders: OrderType[] = await orderStore.getCurrentOrders();
    return res.json(Orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// Get orders by user id
export const show = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.id);
    const Orders: OrderType = await orderStore.show(userId);
    return res.json(Orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//get all orders
export const index = async (req: Request, res: Response) => {
  try {
    const Orders: OrderType[] = await orderStore.index();
    return res.json(Orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};