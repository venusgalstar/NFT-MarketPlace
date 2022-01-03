const AutherController = require ('../controllers/author');

const author =  (app) => {
    app.post('/api/authors',AutherController.CreateAuthor);
    app.post('/api/authors/login',AutherController.LoginAuthor);
    app.get('/api/authors',AutherController.FindAuthor);
    app.get('/api/authors/count',AutherController.CountAuthor);
    app.get('/api/authors/:id',AutherController.FindOneAuthor);
    app.put('/api/authors/:id',AutherController.UpdateAuthor);
    app.delete('/api/authors/:id',AutherController.DeleteAuthor); 
    app.put("/api/authors/updateprofile/:authorId", AutherController.UpdateAuthorProfile);
    
}
module.exports = author;

