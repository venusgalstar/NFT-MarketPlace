const NftsController = require ('../controllers/nft');
const checkAuthentication = require('../../author/middlewares/authMiddleware');

const nfts = (app) => {
    app.post('/api/nfts', checkAuthentication, NftsController.CreateNfts);
    app.get('/api/nfts',NftsController.FindNfts);
    app.get('/api/nft_showcases',NftsController.ShowcasesNfts);
    app.get('/api/nfts/count',NftsController.CountNfts);
    app.get('/api/nfts/:id',NftsController.GetNFTDetail);
    app.put('/api/nfts/:id',NftsController.UpdateNfts);
    app.delete('/api/nfts/:id',NftsController.DeleteNfts);
}

module.exports = nfts;
