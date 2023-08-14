const UsersModel = require('../models/User')

class UserController{
    async index(req,res){
        const users = await UsersModel.findAll();
      
        if(!users.err){
            return res.status(200).json({
                error: false,
                msg:'Sucesso, Lista de Usuário',
                data: users,
            });
        }else{
            return res.status(400).json({
                error: false,
                msg:'Erro, Lista de Usuário',
                data: req.body,
                msgErr:
                {sqlState: users.return.sqlState,
                sqlMessage: users.return.sqlMessage,}
            });
        }   
    }
    async create(req,res){
        const {email,name,password} = req.body;

        if(email !== undefined && name !== undefined && password !== undefined){
           
            const validationEmail = await UsersModel.findEmail(email);
            console.log(validationEmail)
            if(!validationEmail){
                const resultInsert = await UsersModel.new({name,email,password});
                
                if(!resultInsert.err){
                    return res.status(200).json({
                        error: false,
                        msg:'Usuário Criado com sucesso',
                        data: req.body,
                    });
                }else{
                    return res.status(400).json({
                        error: false,
                        msg:'Erro na criação do usuário',
                        data: req.body,
                        msgErr:
                        {sqlState: resultInsert.return.sqlState,
                        sqlMessage: resultInsert.return.sqlMessage,}
                    });
                }
            }else{
                return res.status(409).json({
                    error: false,
                    msg:'Erro na criação do usuário, Email já foi cadastrato, Email Conflict',
                    data: {email:email}
                });
            }
                
          

        }else{
            return res.status(422).json({
                error: false,
                msg:'Validation Failed',
                field : ["name","email","password"]
                
            });
        }
    }
    async update(req,res){
        const {email,name,role} = req.body;
        const {id} = req.params;

        if(email !== undefined && name !== undefined ){
           
           
                const resultUpdate = await UsersModel.update({id,name,email,role});
                // console.log(resultUpdate)


                if(!resultUpdate.err){
                    return res.status(200).json({
                        error: false,
                        msg:'Update com sucesso',
                        data: req.body,
                    });
                }else{
                    return res.status(409).json({
                        error: true,
                        msg:'Erro no update',
                        msgErr:resultUpdate
                    });
                       
                }
            }else{
                return res.status(400).json({
                    error: false,
                    msg:'Erro no envio dos dados',
                });
            }
                
    }
    async delete(req,res){
        const {id} = req.params;
              
        const resultDelete = await UsersModel.delete(id);
   
        if(!resultDelete.err){
            return res.status(200).json({
                error: false,
                msg:'Delete realizado com sucesso',
                data: id,
            });
        }else{
            return res.status(400).json({
                error: false,
                msg:'Erro no delete do usuário',
                
            });
        }
    
    }
    async findById(req,res){
        const {id} = req.params;

        const resultFind = await UsersModel.findById(id);
        
        if(!resultFind.err){
            return res.status(200).json({
                error: false,
                msg:'Pesquisa pelo ID realizada com sucesso',
                data: resultFind.return,
            });
        }else{
            return res.status(404).json({
                error: false,
                msg:'Usuário Não encontrado',
                msgErr:
                {sqlState: resultFind.return.sqlState,
                sqlMessage: resultFind.return.sqlMessage,}
            });
        }
    
                
    }
}

module.exports = new UserController();