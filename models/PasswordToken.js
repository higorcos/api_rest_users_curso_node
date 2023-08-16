const knex = require('../database/connection');
const UsersModel = require('./User');
const { v4: uuid } = require('uuid');
const dateFormat = require('../utils/date')

class TokenUsers{
    async create(email){
        
        const resultUser = await UsersModel.findByEmail(email)
        console.log(resultUser)
        if(!resultUser.err){
           
            await this.deleteTokenExpiration(resultUser.return.idUser)
            const token = uuid()
            try{
                await knex.insert({
                    token : token,
                    idUser: resultUser.return.idUser,
                    expiration: dateFormat.generateExpiration()
                }).table('tokenusers')
                
                return {err: false, return: token};
            }catch(err){
                return {err: true, return: `Erro na Criação`};
            }
        }else{
            return {err: true, return: `Email inválido`};
        }
    }
    async deleteTokenExpiration(idUser){
        try{
            const  dateNow = dateFormat.now()

            await knex('tokenusers').where(function(){
                this.where({idUser}).andWhere('expiration', '<', dateNow)
            }).orWhere(function(){
                this.where({idUser}).andWhere('useSituation', 1);
            }).delete()

            return {err: true, return: []};

        }catch(err){
            console.log(err)
            return {err: true, return: err};
        }
    }
    async deleteTokenSituation(idUser){
        try{

            await knex('tokenusers').where(function(){
                this.where({idUser}).andWhere('useSituation', 1);
            }).delete()

            return {err: true, return: []};

        }catch(err){
            console.log(err)
            return {err: true, return: err};
        }
    }
    async validate(token){
        try{
            const resultSelect = await knex.select()
            .where(function(){
                this.where({token}).andWhere('useSituation', 0);
            }) 
            .table('tokenusers');


            if(resultSelect.length > 0){
                return {err: false, return: resultSelect[0]};
            }else{
                return {err: true, return: []};
            }
           
        }catch(err){
            return {err: true, return: err};
        }
    }
    async setTokenSituation(token){
        try{
            await knex.update({
                useSituation: 1
            }).where({
                token
            }).table('tokenusers')

            return {err: true, return: []};
        }catch(err){
            console.log(err)
            return {err: true, return: err};
        }
    }
}

module.exports = new TokenUsers();