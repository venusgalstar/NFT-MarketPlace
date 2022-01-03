const AuthersalesController = require ('../controllers/author-sales');

const checkAuthentication = require('../../author/middlewares/authMiddleware');

const author_sales = (app) => {
    app.post('/api/author_ranks', checkAuthentication, AuthersalesController.CreateAuthorSales);
    app.get('/api/author_ranks',AuthersalesController.FindAuthorSales);
    app.get('/api/author_ranks/count',AuthersalesController.CountAuthorSales);
    app.get('/api/author_ranks/:id',AuthersalesController.FindOneAuthorSales);
    app.put('/api/author_ranks/:id',AuthersalesController.UpdateAuthorSales);
    app.delete('/api/author_ranks/:id',AuthersalesController.DeleteAuthorSales);
}
module.exports = author_sales;
