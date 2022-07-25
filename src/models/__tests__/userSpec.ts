import UserModel from "../user.model";
import client from "../../database";

const UserStore = new UserModel();

describe("User Model", () => {
afterAll(async function () {
    const connection = await client.connect();
    const sql = 'DELETE FROM users;';
    await connection.query(sql);
    const reset = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(reset);
    connection.release();
});

  describe("Test methods exists", () => {
    it("Should have a get many user method", () => {
      expect(UserStore.getMany).toBeDefined();
    });
    it("Should have ea get one user method", () => {
      expect(UserStore.getOne).toBeDefined();
    });

    it("Should have a create user method", () => {
      expect(UserStore.create).toBeDefined();
    });
    it("Should have an update method", () => {
      expect(UserStore.updateOne).toBeDefined();
    });
    it("Should have a delete user emthod", () => {
      expect(UserStore.deleteOne).toBeDefined();
    });
    it("Should have an authenticate user  method", () => {
      expect(UserStore.authenticate).toBeDefined();
    });
  });
  describe("Test user model ", () => {
    describe('Create function',()=>{
      it('Create user', async()=>{
        const createdUser = await UserStore.create({
        email: "testingg@testing.com",
        user_name: "salmaosamaa",
        first_name: "salmaa",
        last_name: "osamaa",
        password: "test123",
        });
        expect(createdUser.id).toEqual(1);
        expect(createdUser. email).toEqual('testingg@testing.com');
        expect(createdUser.user_name).toEqual('salmaosamaa');
        expect(createdUser.first_name).toEqual('salmaa');
        expect(createdUser.last_name).toEqual('osamaa');
        expect(createdUser.password).toBeTruthy;
      });
      it('Get one user by id', async()=>{
        const result = await UserStore.getOne('1');
        expect(result.id).toEqual(1);
        expect(result.user_name).toEqual("salmaosamaa");
        expect(result.first_name).toEqual('salmaa');
        expect(result.last_name).toEqual('osamaa');
        expect(result.password).toBeTruthy;
      });
      it('Get many should return all users', async()=>{
        const users = await UserStore.getMany();
        expect(users.length).toBe(1);
        });
        it('Return authenticated user', async()=>{
          const users = await UserStore.authenticate("testingg@testing.com", "test123");
          expect(users?.id).toEqual(1);
          expect(users?.email).toEqual('testingg@testing.com');
          expect(users?.user_name).toEqual('salmaosamaa');
          expect(users?.first_name).toEqual('salmaa');
          expect(users?.last_name).toEqual('osamaa');
          expect(users?.password).toBeTruthy;
          })
      it('Return updated user', async()=>{
        const users = await UserStore.updateOne({
          email: 'test@test.com',
          user_name: 'test2User',
          first_name: 'Test',
          last_name: 'User',
          password: 'test123',
          id:1
      })
        expect(users.first_name).toEqual("Test");
        });
        it('Return deleted user', async()=>{
          const users = await UserStore.deleteOne("1")
           expect(users.id).toEqual(1);    
          })
    });
  });
})

  