const Task = require("../models/task");


// create task

exports.createTask=async (req, res) => {

    // -----method 1------------------
  
    // try {
    //   const task = await Task.create(req.body);
    // // why res if it success get information from that that's why
    //   res.status(200).json(task);
    // } catch (error) {
    //   res.status(500).json({ msg: error.message });
    // }
  
    // -----method 2------------------
  
  
    const newTask = new Task(req.body)
  
    try {
      const savedTask = await newTask.save();
      res.status(200).json(savedTask);
    } catch (err) {
      res.status(500).json(err);
    }
    
  };

//   get all tasks

exports.getAllTask=async(req,res)=>{
    try {
      const tasks =await Task.find()
  
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({msg:error.message})
      
    }
  }

// get a task

exports.getTask=async(req,res)=>{
  // taskId come from route path(means-> dynamic path)
  const {taskId}=req.params
    console.log(taskId);

    try {
      const task= await Task.findById(taskId);
      if(!task){
        return res.status(404).json('no task found with this ID')
      }
      res.status(200).json(task)
    } catch (error) {
      res.status(500).json({msg:error.message})
      
    }


}

// delete task

exports.deleteTask=async(req,res)=>{
  const {taskId}=req.params

  try {
    const deletedTask= await Task.findByIdAndDelete(taskId)

    if(!deletedTask){
      return res.status(404).json('no task found with this ID:'+taskId)
    }

    res.status(200).json('task deleted')
    
  } catch (error) {
    res.status(500).json({msg:error.message})

    
  }
}

// update task
exports.updateTask=async(req,res)=>{
  const {taskId}=req.params
try {
  const update=await Task.findByIdAndUpdate(
    {_id:taskId},req.body,{new:true,runValidators:true}
  )
  if(!update){
    return res.status(404).json('no task found with this ID:'+taskId)
  }

  res.status(200).json('task Updated')
} catch (error) {
  res.status(500).json({msg:error.message})

  
}
}




// ==========method=======



//   const getAllTask=async(req,res)=>{
//     try {
//       const tasks =await Task.find()
  
//       res.status(200).json(tasks)
//     } catch (error) {
//       res.status(500).json({msg:error.message})
      
//     }
//   }

//   module.exports={
//     createTask,
//     getAllTask
//   }
