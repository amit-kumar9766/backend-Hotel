const express= require('express')

const { getUsers, createUser, getUser, deleteUser, updateUser ,signup,payment,checkPayment
} =require('../controllers/users.js');

const router = express.Router();

router.get('/data', getUsers);

router.post('/data/add', createUser);

router.get('/data/:id', getUser);

router.delete('/delete/:id', deleteUser);

router.put('/update/:id', updateUser);

//router.post('/signup',signup)

router.post('/payment',payment)

router.post('/payment/checkout',checkPayment)

module.exports = router;
// export default router;