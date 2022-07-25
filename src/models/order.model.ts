import OrderType from "../types/order.type";
import client from "../database";



export class Order {
  async create(order: OrderType): Promise<OrderType> {
    try {
      const { user_id, status } = order;
      const connection = await client.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1,$2) RETURNING *";
      const result = await connection.query(sql, [user_id, status]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`couldn't create order, ${error}`);
    }
  }
  async getCompletedOrders(): Promise<OrderType[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM orders WHERE status LIKE 'comp%'";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`couldn't get the orders, ${error}`);
    }
  }
  async getCurrentOrders(): Promise<OrderType[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM orders WHERE status LIKE 'curr%'";
      const result = await connection.query(sql);
      connection.release();
      console.log("ROWS:", result.rows);
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get the orders, ${error}`);
    }
  }
  async show(id: number): Promise<OrderType> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't find orders for user: ${id}, ${error}`);
    }
  }
  async index(): Promise<OrderType[]> {
    try {
      const sql = "SELECT * FROM orders";
      const connection = await client.connect();
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't find orders, ${error}`);
    }
  }
}