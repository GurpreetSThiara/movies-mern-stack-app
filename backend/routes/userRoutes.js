
import express from 'express';
import { authenticate, authorizedAdmin } from '../middlewares/authMiddleware.js';

import { createUser,loginUser ,logoutUser,getAllUsers,getUserProfile,updateUserProfile } from '../controllers/userController.js';


const router = express.Router();

router.route("/").post(createUser).get(authenticate,authorizedAdmin,getAllUsers);

router.post("/auth", loginUser);

router.post("/logout",logoutUser);

router.route('/profile').get(authenticate,getUserProfile).put(authenticate, updateUserProfile)

export default router;