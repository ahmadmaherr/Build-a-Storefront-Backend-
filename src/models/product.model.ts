import client from "../database";
import productType from "../types/product.type";


export class ProductStore {
  async index(): Promise<productType[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`counldn't get products, ${error}`);
    }
  }
  async getOne(id: number): Promise<productType> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`couldn't find product ${id}, ${error}`);
    }
  }
  async create(prod: productType): Promise<productType> {
    try {
      const { name, price, category } = prod;
      const sql=
        "INSERT INTO products (name,price,category) VALUES($1,$2,$3) RETURNING *";
      const connection = await client.connect();
      const result = await connection.query(sql, [prod.name, prod.price, prod.category]);
      connection.release();
      return result.rows[0];
     
      
    } catch (err) {
      throw new Error(`couldn't add new product ${prod.name}, ${err}`);
    }
  }
  async getProductbyCat(category: string): Promise<productType[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM products WHERE category = $1";
      const result = await connection.query(sql, [category]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`couldn't get product by category ${category}, ${err}`);
    }
  }
  async deleteProduct(id: number): Promise<productType> {
    try {
      const sql = "DELETE FROM products WHERE id= $1 RETURNING *";
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`couldn't delete ${id}, ${err}`);
    }
  }
}