const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "please add a task"],
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model("Task",taskSchema)


// const Task =mongoose.model("Task",taskSchema)

// module.export=Task
