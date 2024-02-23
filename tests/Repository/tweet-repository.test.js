const TweetRepository=require("../../src/Repository/tweet-repository");
const Tweet=require("../../src/Models/tweet");
jest.mock("../../src/Models/tweet");

describe("to test the create function in repository layer",()=>{
    test("to check weather it is giving correct data or not",async()=>{
        const data={
            content:"this is my tweet"
        }
        const spy=jest.spyOn(Tweet,'create').mockImplementation(()=>{
            return {
                ...data,

            }
        })
        const TweetRepositoryObj=new TweetRepository();
        const response=await TweetRepositoryObj.create(data);
        expect(response.content).toBe(data.content);

    });
    test("to check weather it give error or not",async()=>{
          const spy=jest.spyOn(Tweet,'create').mockImplementation(()=>{
            throw new Error("Validation Error")
          })
          const TweetRepositoryObj=new TweetRepository();
           await TweetRepositoryObj.create().catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("Validation Error");

          })
    })
})

describe("To check the get function",()=>{
    test("to check get will return the data",async()=>{
        const data={
            id:"12345",
            content:"This is a tweet",
            comments:["345","678"],
           
        }
        const spy=jest.spyOn(Tweet,'findById').mockImplementation(()=>{
            return {
                ...data
            }
        });
        const TweetRepositoryObj=new TweetRepository();
        const response=await TweetRepositoryObj.get(data.id);
        expect(response.id).toBe(data.id);
    })
    test("to check if it give error or not",async()=>{
        const spy=jest.spyOn(Tweet,'findById').mockImplementation(()=>{
            throw new Error("Invalid Id");
        });
        const TweetRepositoryObj=new TweetRepository();
        const response=await TweetRepositoryObj.get().catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("Invalid Id");
        })

      

    })
})

describe("to check update function is working fine",()=>{
    test("to check that value return is correct or not",async()=>{
        const data={
            id:"234",
            content:"tweet content changed"
        }
        const spy=jest.spyOn(Tweet,'findByIdAndUpdate').mockImplementation(()=>{
            return {
                ...data
            }
        })
        const TweetRepositoryObj=new TweetRepository();
        const response=await TweetRepositoryObj.update();
        expect(response.content).toBe(data.content);
    })
})

describe("to test the getAll feature",()=>{
    test("to check if it is returning the data or not",async()=>{
        const data={
            content:"this is a tweet"
        }
        const tweetArr=[{...data},{...data}];
        const tweetObj={tweetArr};
        tweetObj.limit=jest.fn(()=>{ return tweetObj.tweetArr.splice(0,2)});
        tweetObj.skip=jest.fn(()=>{return tweetObj});
        const spy=jest.spyOn(Tweet,'find').mockImplementation(()=>{
            return tweetObj;
        })
        const TweetRepositoryObj=new TweetRepository();
        const response=await TweetRepositoryObj.getAll(0,2);
        expect(response).toHaveLength(2);



    })
})