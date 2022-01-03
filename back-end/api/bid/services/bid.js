const BidController = require ('../controllers/bid');

const checkAuthentication = require('../../author/middlewares/authMiddleware');

const bid = (app) => {
    app.post('/api/bids', checkAuthentication, BidController.CreateBid);
    app.get('/api/bids',BidController.FindBid);
    app.get('/api/bids/count',BidController.CountBid);
    app.get('/api/bids/:id',BidController.FindOneBid);
    app.put('/api/bids/:id',BidController.UpdateBid);
    app.delete('/api/bids/:id',BidController.DeleteBid);
}
module.exports = bid;
