import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import usersRoute from './routes/users.js';
import router from './routes/tree.js';
import cors from 'cors';
import 'dotenv/config';


const app = express();
const port = process.env.PORT ;
const mongodbUrl = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'MyTree API',
      version: '1.0.0',
      description: 'API for MyTree genealogy application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB connection
mongoose.connect(mongodbUrl, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/users', usersRoute);
app.use('/tree', router);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
