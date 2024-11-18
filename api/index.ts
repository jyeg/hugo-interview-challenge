import express from 'express';
import routes from './routes';
import helmet from 'helmet';
import { invalidPathHandler, errorLogger, errorResponder, morganMiddleware } from './middleware';
const PORT = process.env.API_PORT || 8000;

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morganMiddleware);

app.use(routes);

// error handling middlewares
// function defined above (which logs the error)
app.use(errorLogger);
// function defined above (which sends back the response)
app.use(errorResponder);
// function which sends back the response for invalid paths)
app.use(invalidPathHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
