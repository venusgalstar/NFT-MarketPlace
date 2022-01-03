const Hot_CollectionController = require ('../controllers/hot-collection');

const checkAuthentication = require('../../author/middlewares/authMiddleware');

const hot_collection = (app) => {
    app.post('/api/hot_collections', checkAuthentication, Hot_CollectionController.CreateHot_Collection);
    app.get('/api/hot_collections',Hot_CollectionController.FindHot_Collection);
    app.get('/api/hot_collections/count',Hot_CollectionController.CountHot_Collection);
    app.get('/api/hot_collections/:id',Hot_CollectionController.FindOneHot_Collection);
    app.put('/api/hot_collections/:id',Hot_CollectionController.UpdateHot_Collection);
    app.delete('/api/hot_collections/:id',Hot_CollectionController.DeleteHot_Collection);
}
module.exports = hot_collection;