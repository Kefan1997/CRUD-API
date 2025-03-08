import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.get('/', UserController.fetchUsers);
router.get('/:userId', UserController.fetchUserById);
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

export default router;
