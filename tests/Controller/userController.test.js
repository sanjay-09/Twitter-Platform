const {signUp}=require("../../src/Controllers/userController");
const userService=require("../../src/Services/user-service");
const mock=require("../mocker");

jest.mock("../../src/Services/user-service");
describe("to test the signUp process",()=>{
    test("to check flow is working fine",async()=>{
        const req=mock.mockRequest();
        const res=mock.mockResponse();
        const response={
            email:"sanjay.s1558@gmail.com",
            password:"zxxxxxxxxx"
        };
        (userService.prototype.signUp).mockReturnValue(response);
        await signUp(req,res);
        expect(res.json).toHaveBeenCalledWith({
            data:response,
            status:true,
            message:"Created the user",
            err:{}

        });
    })
    test("to check it is giving correct error or not",async()=>{
        const req=mock.mockRequest();
        const res=mock.mockResponse();
        const response={
            email:"sanjay.s1558@gmail.com",
            password:"zxxxxxxxxx"
        };
        (userService.prototype.signUp).mockImplementation(()=>{
            throw new Error("validation error");
        })
        await signUp(req,res);
        expect(res.json).toHaveBeenCalledWith({
            data:{},
            status:false,
            message:"Cannot signUp",
            err:"validation error"
        })
       
    

    })
})