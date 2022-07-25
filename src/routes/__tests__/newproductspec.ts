import {app} from "../../index";
import User from "../../types/user.type";
import supertest from "supertest";
import productType from "../../types/product.type";
import client from "../../database";
import UserModel from "../../models/user.model";

const userModel = new UserModel();
const request = supertest(app);

let token = "";

describe("Users Endpoints", () => {
  
  describe('User API Endpoints',()=>{
    const user = {
        email: 'test@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123'
    } as User;
    const product = {
        name:"producttest",
        price:60,
        category:"testingproduct"
    } as productType;
    beforeAll(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await userModel.create(user)
        // const res = await request
        // .post("/api/users/authenticate")
        // .set("Content-type", "application/json")
        // .set("Authorization", `Bearer ${token}`)
        // .send({
        //   email: 'test@test.com',
        //   password: 'test123'


        // });
        // const { token: userToken } = res.body.data
        // token = userToken
      })
      afterAll(async () => {
        // clean db
        const connection = await client.connect()
        const sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1; \n DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1; \n DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1; '
        await connection.query(sql)
        connection.release()
      })

  });
  describe("Test CRUD Operation for Product APIs ", () => {
    it('Get token', async()=>{
      await userModel.create( {
        email: 'test@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123'
      })

      const response = await request
      .post('/api/users/authenticate')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test@test.com',
        password: 'test123'

      });
      const { token: userToken } = response.body.data
      token = userToken
      console.log(response);
      
    })
    it("It should create new product", async () => {
      console.log(token, "creattee");
      
      const res = await request
        .post("/api/products")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "testProduct",
          price: 31.9,
          category: "test",
        });
      expect(res.statusCode).toBe(400);
    });
    it("It should get all product", async () => {
      const res = await request
        .get("/api/products")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("It should getByid product", async () => {
      const res = await request
        .get("/api/products/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
    });
    it("It should get product by category", async () => {
      const res = await request
        .get("/api/products/category/test")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
    });
    it("It should delete product by id", async () => {
      const res = await request
        .get("/api/products/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
    });
      
      
    })
  })
  
