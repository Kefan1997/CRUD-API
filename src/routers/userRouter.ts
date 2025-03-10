import { Router } from 'express';
import UserController from '../controllers/userController';
import { validateUser, validateUserId } from '../middlewares/validateUser';

const router = Router();

router.get('/', UserController.fetchUsers);
router.get('/:userId', validateUserId, UserController.fetchUserById);
router.post('/', validateUser, UserController.createUser);
router.put('/:userId', validateUserId, UserController.updateUser);
router.delete('/:userId', validateUserId, UserController.deleteUser);

export default router;
