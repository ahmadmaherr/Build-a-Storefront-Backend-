import client from "../../database";
import { ProductStore } from "../product.model";


const productModel = new ProductStore();

describe("Product Model", () => {
afterAll(async function () {
    const connection = await client.connect();
    const sql = 'DELETE FROM products;';
    await connection.query(sql);
    const reset = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await connection.query(reset);
    connection.release();

});

  describe("Test methods exists", () => {
    it("Should have a get many product method", () => {
      expect(productModel.index).toBeDefined();
    });
    it("Should have ea get one product method", () => {
      expect(productModel.getOne).toBeDefined();
    });

    it("Should have a create product method", () => {
      expect(productModel.create).toBeDefined();
    });
    it("Should have an getbycat method", () => {
      expect(productModel.getProductbyCat).toBeDefined();
    });
   
   
  });
  describe("Test product model ", () => {
    describe('Create function',()=>{
      it('Create product', async()=>{
        const createdProduct = await productModel.create({
        name:"producttest",
        price:60,
        category:"testingproduct"
        });
        expect(createdProduct.id).toEqual(1);
        expect(createdProduct.name).toEqual('producttest');
        expect(createdProduct.price).toEqual(60);
        expect(createdProduct.category).toEqual('testingproduct');
        
      });
    });
    describe('Get product by id',()=>{
      it('Get one product by id', async()=>{
        const result = await productModel.getOne(1);
        expect(result.id).toEqual(1);
        expect(result.name).toEqual("producttest");
        expect(result.price).toEqual(60);
        expect(result.category).toEqual('testingproduct');

      })
    });
    describe('Get many', ()=>{
      it('Get many should return all products', async()=>{
      const products = await productModel.index();
      expect(products.length).toBe(1);
      })
    });
    describe('Get by category', ()=>{
      it('Get product by category', async()=>{
      const products = await productModel.getProductbyCat("testingproduct");
      expect(products.length).toEqual(1);
      
      });
      it('Delete product by id', async()=>{
        const products = await productModel.deleteProduct(1);
        expect(products.id).toEqual(1);
        
        })
    });
   


  });

  
})

  