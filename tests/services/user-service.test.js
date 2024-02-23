const userService=require("../../src/Services/user-service");
const UserRepository=require("../../src/Repository/User-repository");

jest.mock("../../src/Repository/User-repository");




describe("to test the signUp process",()=>{
    test("to validate the data",async()=>{
        const data={
            email:"sanju.watson0110@gmail.com",
            password:"Sanjay@098"
        };
        (UserRepository.prototype.create).mockReturnValue({...data});
        const UserServiceObj=new userService();
        const response=await UserServiceObj.signUp(data);
        expect(response.email).toBe(data.email);

    })
    test("to validate the error",async()=>{
        (UserRepository.prototype.create).mockImplementation(()=>{
            throw new Error("error in repo")
        });
        const UserServiceObj=new userService();
        const response=await UserServiceObj.signUp().catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("error in repo")
        })

    })

})
describe("to check the signIn process",()=>{
    test("to validate the if user is not present",async()=>{
        const data={
            email:"ac@gmail.com"
        };
        (UserRepository.prototype.getWithEmail).mockReturnValue(null);
        const UserServiceObj=new userService();
        await UserServiceObj.logIn(data).catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("User not present in the database");

        })
    })
    

    test("to validate the correct passport",async()=>{
        const data={

            email:"sanju.watson0110@gmail.com",
            password:"abcdef",
            verifyPassword:()=>{
                return false

            }
        };
        (UserRepository.prototype.getWithEmail).mockReturnValue(data);
       
      
       
      
        const UserServiceObj=new userService();
        await UserServiceObj.logIn(data).catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("password not correct")
        })




    })
    test("to validate whole login Process",async()=>{
        const data={

            email:"sanju.watson0110@gmail.com",
            password:"abcdef",
            verifyPassword:()=>{
                return true

            },
            generateToken:()=>{
                return "abcdefgh"

            }
        };
        (UserRepository.prototype.getWithEmail).mockReturnValue(data);
        const UserServiceObj=new userService();
        const response=await UserServiceObj.logIn(data);
        expect(response).toBe("abcdefgh");
        
    })
})







    
