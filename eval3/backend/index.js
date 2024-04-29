const express = require("express");
const { connectionToDb } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const { taskRouter } = require("./routes/taskRouter");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 8080;

app.get("/", (req,res)=>{
    res.send("get data")
})

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Learn Node.JS',
        version: '1.0.0',
      },
      servers: [
        {
          url: "http://localhost:8080/",
        },
        {
          url: "http://www.example.com",
        },
      ],
    },
    apis: ['./routes*.js'], // files containing annotations as above
  };
  
  const openapiSpecification = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());
app.use("/user", userRouter);
app.use("/task", taskRouter);

app.listen(port,async(req,res)=>{
    await connectionToDb();
    console.log(`Server is running at ${port}`);
})