const userRepository=require("../../src/Repository/User-repository")
const user=require("../../src/Models/user");

jest.mock("../../src/Models/user");

describe("to test whether new user is able to create",()=>{
    test("to check the user is created with encrypted password",async()=>{
        const data={
            email:"sanjay.s01558@gmail.com",
            password:"Sanjay@098"
        }
        const spy=jest.spyOn(user,'create').mockImplementation(()=>{
            return data;


        })
        const userRepositoryObj=new userRepository();
        const response=await userRepositoryObj.create(data);
        expect(response.email).toBe("sanjay.s01558@gmail.com");
    })
    test("to check it gives error or not",async()=>{
        const data={
            Useremail:"sanjay.s01558@gmail.com",
            password:"Sanjay@098"
        }
        const spy=jest.spyOn(user,'create').mockImplementation(()=>{
            throw new Error("Validation error");
        })
        const userRepositoryObj=new userRepository();
        await userRepositoryObj.create().catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("Validation error");
        })
    });
   
})
describe("to test the get function",()=>{
    test("to check data return is correct or not",async()=>{
        const data={
            id:"1234",
            email:"ab@gmail.com"
        };
        const spy=jest.spyOn(user,'findById').mockImplementation(()=>{
            return data;
        })
        const UserRepositoryObj=new userRepository();
        const response=await UserRepositoryObj.get(data.id);
        expect(response).toBe(data);
    })
    test("to check the error",async()=>{
        const spy=jest.spyOn(user,"findById").mockImplementation(()=>{
            throw new Error("validation error");
        })
        const UserRepositoryObj=new userRepository();
        const response=await UserRepositoryObj.get().catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("validation error");
        })
        
    })

})