import OrderProductType from "../types/orderProduct.type";
import client from "../database";


 
export class OrderProductStore {
    async addProduct(orderProd: OrderProductType): Promise<OrderProductType>{
        try{
            const connection = await client.connect();
            const sql ="INSERT INTO orderProduct (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
            const result = await connection.query(sql, [
                orderProd.quantity,
                orderProd.order_id,
                orderProd.product_id
            ]);
            connection.release();
            return result.rows[0];
        } catch(error){
            throw new Error (`couldn't add product ${orderProd.product_id} to order ${orderProd.order_id}. Error: ${error}`);


        }

    }

    async deleteAll(order_id: number): Promise<void> {
        try{
            const connection = await client.connect();
            const sql = "DELETE FROM orderProduct WHERE order_id = ($1)";
            await connection.query(sql, [order_id]);
            connection.release();

        } catch(err){
throw new Error(`couldn't delete order details for order : ${order_id}. Error: ${err}`);
        }
    }
}