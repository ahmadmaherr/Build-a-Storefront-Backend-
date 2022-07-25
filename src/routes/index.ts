import { Router } from 'express';
import usersRoutes from './api/user.routes'
const routes = Router();

routes.use('/users', usersRoutes);

export default routes;