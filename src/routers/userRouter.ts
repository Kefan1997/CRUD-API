import { Router } from 'express';
import { getUsers, getUserById, createUser, deleteUser, updateUser} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUserById)
router.post('/', createUser);
router.delete('/:userId', deleteUser);
router.put('/:userId', updateUser);

export default router;
