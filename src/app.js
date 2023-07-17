import express from "express";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes.js";
import entryRoutes from "./routes/entryJournalRoutes.js";

const app = express(); 

// Enable Cors middleware for frontend access
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173/', 'https://wonderful-paletas-0c1299.netlify.app', 'https://deploy-preview-67--wonderful-paletas-0c1299.netlify.app/'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','token'],
  }));

app.use(express.json());

app.use(usersRoutes, entryRoutes);
export default app;
