import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import publicationsRoutes from '../src/publicaciones/publications.routes.js';
import commentsRoutes from '../src/comentarios/comments.routes.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.publicationsPath = '/blog/v1/publications';
    this.commentsPath = '/blog/v1/comments';

    this.middlewares();
    this.conectarDB();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
  }

  routes() {
    this.app.use(this.publicationsPath, publicationsRoutes);
    this.app.use(this.commentsPath, commentsRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port ', this.port);
    });
  }
}

export default Server;
