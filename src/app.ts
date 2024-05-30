import cors from 'cors';
import express, {
  Application,
  Request,
  Response,
} from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import router from './app/routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/', router)

const test = (req: Request, res: Response) => {
  const a = 10;
  res.status(200).json(a);
};

app.get('/', test);


// Global error handler
app.use(globalErrorHandler)

// Not found route
app.use(notFoundRoute)

export default app;
