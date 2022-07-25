import { app } from "../../index";
import UserModel from "../../models/user.model";
import client from "../../database";
import supertest from "supertest";
import OrderType from "../../types/order.type";
import User from "../../types/user.type";

const request = supertest(app);
const userModel = new UserModel();

let token = '';
const user = {
          email: 'test1@test.com',
          user_name: 'test2User',
          first_name: 'Test',
          last_name: 'User',
          password: 'test123'
      } as User;
  
const order = {
      status: "active",
      user_id: 1,
    } as OrderType;

    describe('Check Orders Routes', function () {
  
      beforeAll(async function () {
    const created_user = await userModel.create(user);
   });

  afterAll(async function () {
    const cn = await client.connect();
    const sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1; \n DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
    await cn.query(sql);
    cn.release();
  });

  describe('Check /api/orders', function () {
    it('Get token', async()=>{
      const response = await request
      .post('/api/users/authenticate')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test1@test.com',
        password: 'test123'

      });
      const { token: userToken } = response.body.data
      token = userToken
    })
    it('It should create new order', async () => { 
      
      const response = await request
        .post('/api/orders')
        .send({
          id:1,
          status: "active",
          user_id: 1,
        });
      expect(response.status).toBe(200);
    });
    it("It should get all orders", async () => {
      
      const res = await request
        .get("/api/orders")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("It should get  order by id", async () => {
      
      const res = await request
        .get("/api/orders/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("It should get all current orders", async () => {
      
      const res = await request
        .get("/api/orders/current")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("It should get all completed orders", async () => {
      
      const res = await request
        .get("/api/orders/completed")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
  
  });
  
});












