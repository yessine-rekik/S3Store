import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import controllers from '../controllers';

const router = express.Router();

router.use(authenticate);

router.get('/', controllers.getUserFiles);
router.get('/download', controllers.download);
router.post('/upload', controllers.upload);
router.delete('/:id', controllers.deleteOne);
router.delete('/many', controllers.deleteMany);

export default router;
