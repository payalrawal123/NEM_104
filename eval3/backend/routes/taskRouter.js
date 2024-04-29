const express = require("express");
const { auth } = require("../middleware/authMiddleWare");
const { taskModel } = require("../models/taskModel");
const { access } = require("../middleware/access");
const { userModel } = require("../models/userModel");
const taskRouter = express.Router();

/**
 * @swagger
 * components:
 *    schemas:
 *       Task:
 *          type:object
 *          properties:
 *              id:
 *                 type:string
 *                 description: id is auto-generated
 *              task:
 *                 type:string
 *                 description: the task name
 *              descripton:
 *                 type:string
 *                 description: write about task
 *               status:
 *                 type:string
 *                 description: task complete or not
 *
 */

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: All api routes relates to Tasks
 *
 */

/**
 * @swagger
 * /task:
 *  get:
 *      summary:This will get all taskdata
 *      tags:[Tasks];
 *      resposes:
 *          200:
 *              description: list of all users
 *              content:
 *                 application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                               $ref: "#/components/schemas/Task"
 */

taskRouter.get("/", auth, access("admin", "manager"), async (req, res) => {
  try {
    const getTsk = await taskModel.find();
    return res.status(200).json({ error: true, item: getTsk });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
});

/**
 * @swagger
 * /task:
 *  post:
 *      summary: to post the task
 *      tags:[Tasks];
 *      requestBody:
 *         required:true
 *          content:
 *             application/json:
 *                 schema:
 *                   $ref: "#/components/schemas/Task"
 *      resposes:
 *          200:
 *              description: the task was succesfully created
 *              content:
 *                 application/json:
 *                      schema:
 *                            $ref: "#/components/schemas/Task"
 *          400:
 *             description: getting some error  
 */

taskRouter.post("/", auth, access("member"), async (req, res) => {
  try {
    const createTask = new taskModel(req.body);
    await createTask.save();
    return res.status(200).json({ error: false, item: createTask });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
});

/**
 * @swagger
 * /task/{id}:
 *  patch:
 *      summary: to update the task
 *      tags:[Tasks];
 *      parameters:
 *          in: path
 *          task: id
 *          schema:
 *              type: string
 *             required:true
 *             description: the task id
 *      requestBody:
 *         required:true
 *          content:
 *             application/json:
 *                 schema:
 *                   $ref: "#/components/schemas/Task"
 *      resposes:
 *          200:
 *              description: the task was succesfully updated
 *              content:
 *                 application/json:
 *                      schema:
 *                            $ref: "#/components/schemas/Task"
 *            
 *          400:
 *             description: getting some error  
 */
taskRouter.patch("/:id", auth, access("member"), async (req, res) => {
  const { id } = req.params;
  try {
    const updateTask = await taskModel.findByIdAndUpdate({ _id: id }, req.body);

    return res.status(200).json({ error: false, item: updateTask });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
});



/**
 * @swagger
 * /task/{id}:
 *  delete:
 *      summary: to remove the task by id
 *      tags:[Tasks];
 *      parameters:
 *          in: path
 *          task: id
 *          schema:
 *              type: string
 *             required:true
 *             description: the task id
 *      
 *      resposes:
 *          200:
 *              description: the task was deleted
 *          400:
 *              description: getting some error  
 */

taskRouter.delete("/:id", auth, access("member"), async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await taskModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({ error: false, item: deleteTask });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
});
module.exports = {
  taskRouter,
};
