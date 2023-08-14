const express = require("express")
const app = express();
const router = express.Router();
const UserController = require('../controllers/UserController')
const HomeController = require('../controllers/HomeController')


router.post('/user', UserController.create);
router.get('/user', UserController.index);
router.get('/user/:id', UserController.findById);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

router.get('/', HomeController.index);

module.exports = router;