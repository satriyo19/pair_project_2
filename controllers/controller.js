class Controller{
    static renderLogin(req, res){
        res.render('login')
    }

    static renderRegister(req, res){
        res.render('createAccount')
    }
}

module.exports = Controller