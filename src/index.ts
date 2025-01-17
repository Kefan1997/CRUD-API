import express from 'express';
// import userRouter from './routers/userRouter';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
