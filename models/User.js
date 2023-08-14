const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User{

    async new(user){
        try{
            const hash = await bcrypt.hash(user.password,saltRounds); //Criptografia

            const resultInset = await knex.insert({name:user.name,email:user.email,password:hash,role:0}).table("users");
            return {err: false, return: {id: resultInset}}

        }catch(err){
            // console.log("\n\n\n - Error: \n",err,"\n\n\n")
            return {err: true, return: err}
        }
    }

    async findEmail(email){
        try{
            const resultSelect = await knex.select("*").from('users').where({email});

            if(resultSelect.length > 0){
                return true; //Já existe
            }else{
                return false;
            }
        }catch(err){
            console.log("\n\n\n - Error: \n",err,"\n\n\n");
            return false;
        }
    }

    async findAll(){
        try{
            const resultSelect = await knex.select(['idUser','name','email','role']).table('users');
            return {err: false, return: resultSelect};

        }catch(err){
            //console.log(err);
            return {err: true, return: err};
        }
    }

    async findById(idUser){
        try{
            const resultSelect = await knex.select(['idUser','name','email','role']).where({idUser}).table('users');
            
            if(resultSelect.length > 0){
                return {err: false, return: resultSelect[0]};

            }else{
                return {err: true, return: []};
            }

        }catch(err){
            //console.log(err);
            return {err: true, return: err};
        }
    }

    async update(user){
        
            //verificar se usuário existe 
            const checkingExistsUser = await this.findById(user.id);
            
            if(!checkingExistsUser.err){
                let editUser = {}
                if(user.email != undefined){
                    if(user.email != checkingExistsUser.return.email){
                            //verificar de Email já existe
                            const existsEmail = await this.findEmail(user.email);
                            if(!existsEmail){
                                editUser.email = user.email;
                            }else{
                                return {err:true, return:[], msgErr:'Email já existe' }
                            }
                        }
                    }

                    if(user.name != undefined){
                        editUser.name = user.name;
                    }
                    if(user.role != undefined){
                        editUser.role = user.role;
                    }
                    
                   
                    
                    try{
                        const resultUpdate = await knex.where({idUser:user.id}).update(editUser).table('users');
                        return {err: false, return: resultUpdate};
            
                    }catch(err){
                        // //console.log(err);
                        return {err: true, return: err};
                    }
            }else{
                return  {err:true, return:[], msgErr:'Usuário não existe' }
            }
    }

    async delete(idUser){
        try{
            const resultDelete = await knex.where({idUser}).delete().table('users');
            console.log(resultDelete)

            if(resultDelete == 1){
                return {err: false, return: resultDelete};
            }else{
                return {err: true, return: []};
            }
        }catch(err){
            //console.log(err);
            return {err: true, return: err};
        }
    }
}
module.exports = new User();