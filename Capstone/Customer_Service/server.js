import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes.js'
import connectDB from './config/db.js'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import './Eureka-client.js'
import startKafkaConsumer from './services/kafkaConsumerService.js'

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

//Swagger
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// Routes
app.use('/api/customers', customerRoutes);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
  
startKafkaConsumer();
// Start the server
const PORT = process.env.PORT || 5001;

app.listen(5001, () => {
  console.log("Server is running");
});
console.log("Customer Service Started in "+ PORT)
export default app;



