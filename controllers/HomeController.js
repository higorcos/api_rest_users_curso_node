class HomeController{
    async index(req,res){
        res.status(200).json({
            error: false,
            msg:'Sucesso, Home',
        })
    }
}

module.exports = new HomeController();