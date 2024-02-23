const tweetService=require("../../src/Services/tweet-service");
const TweetRepository=require("../../src/Repository/tweet-repository");
const hashTagRepository=require("../../src/Repository/hashtag-repository");

jest.mock("../../src/Repository/tweet-repository");
jest.mock("../../src/Repository/hashtag-repository")

describe("to test the create",()=>{
    // test("to test whole workflow is working fine or not",async()=>{
    //     const data={
    //         content:"this is #best #shot"
    //     };
    //     (TweetRepository.prototype.create).mockReturnValue({
    //        ...data,
    //        id:"123"


    //     });
    //     (hashTagRepository.prototype.findByTag).mockReturnValue({
    //         id:"123",
    //         tweets:["321"],
    //         title:"best",
    //         save:()=>{return true},
            
    //     });
    //     (hashTagRepository.prototype.bulkCreate).mockReturnValue({
    //         title:"shot",
    //         Tweets:"123"
    //     })
    //     const tweetServiceObj=new tweetService();
    //     const response=await tweetServiceObj.create(data);
    //     expect(response.content).toBe("okay");

    // })
    test("to test the error in tweetRepo create",async()=>{
        const data={
            content:"very good shot",
            
        };
        (TweetRepository.prototype.create).mockImplementation(()=>{
            throw new Error("Cannot create this tweet");

        })
        const TweetServiceObj=new tweetService();
        await TweetServiceObj.create().catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("Cannot create this tweet");
        })
    })
    test("to check error in hashtag findByTag",async()=>{
        const data={
            content:"Very #Nice shot"
        };
        (TweetRepository.prototype.create).mockReturnValue(data);
        (hashTagRepository.prototype.findByTag).mockImplementation(()=>{
            throw new Error("error in hashtagRepo")
        });
        const tweetServiceObj=new tweetService();
        await tweetServiceObj.create(data).catch((err)=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("error in hashtagRepo");
        })
    })
})