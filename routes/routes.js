const express = require("express")
const app = express();
const router = express.Router();
const AdminAuth = require('../middleware/AdminAuth');
const UserController = require('../controllers/UserController')
const HomeController = require('../controllers/HomeController')


router.post('/login', UserController.login);
router.get('/user',AdminAuth, UserController.index);
router.post('/user', UserController.create);
router.get('/user/:id', UserController.findById);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

router.post('/recovery-password', UserController.recoveryPassword);
router.put('/recovery-password/:token', UserController.changePassword);
router.get('/recovery-password/:token', (req,res)=>{
return res.send("Redirect para rota de formulário para nova senha");
});


router.get('/', HomeController.index);

module.exports = router;