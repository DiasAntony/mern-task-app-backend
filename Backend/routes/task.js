const express = require("express");
const { createTask ,getAllTask,getTask, deleteTask, updateTask } = require("../controllers/task");

const router=express.Router();

// method 1


router.route("/").get(getAllTask).post(createTask)
router.route("/:taskId").get(getTask).put(updateTask).delete(deleteTask)


// methode 2

// // create task
// router.post("/", createTask);
// // get All task
// router.get("/",getAllTask)
// // get task
// router.get("/:taskId",getTask)
// // delete tAsk
// router.delete("/:taskId",deleteTask)
// // update task
// router.put("/:taskId",updateTask)



module.exports=router;

