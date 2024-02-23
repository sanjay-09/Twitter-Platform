const {getTweet}=require("../../src/Controllers/tweetController");
const mock=require("../mocker");
const TweetService=require("../../src/Services/tweet-service");
jest.mock("../../src/Services/tweet-service")

test("should return the tweet",async()=>{
    const req=mock.mockRequest();
    const res=mock.mockResponse();
    const response=[
        {
            content:'Tweet 1'
        },{
            content:'Tweet 2'
        }
    ];
    (TweetService.prototype.get).mockReturnValue(response);
   const resp=await getTweet(req,res);
      expect(res.json).toHaveBeenCalledWith({
        data:response,
        status:false,
        message:"Succesfully fetched the tweet",
        err:{}

    })
   



})