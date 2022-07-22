import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import db from "./database"

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan("short"))

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})

// test db

db.connect().then((client) => {
  return client.query('SELECT NOW()').then((res) => {
    client.release();
    console.log(res.rows);
  }).catch((err) => {
    client.release();
    console.log(err.stack);
  });
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app