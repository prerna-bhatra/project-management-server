const mongoose = require("mongoose");
const User = require("../models/user");
const Project = require("../models/project");
const Task = require("../models/task");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// console.log(process.env.APP_SECRET)

const resolvers = {
  Query: {
   
    getAllUsers: async () => {
      const allUsers = await User.find();
      return allUsers;
    },
    getAllProjects: async () => {
      const allProjects = await Project.find().populate("users lead");
      return allProjects;
    },
    getUserById: async (parent, args) => {
      const userById = await User.findOne({ _id: args.id });
      return userById;
    },
    getProjectById: async (parent, args) => {
      const projectById = await Project.findOne({ _id: args.id }).populate(
        "users"
      );

      return projectById;
    },
    getTaskById: async (parent, args) => {
      const taskById = await Task.findOne({ _id: args.id }).populate(
        "assignee assigneedBy"
      );

      return taskById;
    },
  },

  Mutation: {
    login: async (_, args) => {
      const { password, email } = args;
      const user = await User.findOne({ email: email });
      console.log("user", user);

      if (!user)
        return {
          message: "User does not exists",
        };

      const valid = await bcrypt.compare(password, user.password);
      console.log("valid", valid);
      if (!valid) {
        return {
          message: "Invalid password",
        };
      }

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      console.log("token", token);

      return {
        message: "login success",
        data: user,
        token: token,
      };
    },
    
    addUser: async (_, args) => {
      const { name, email, password } = args;

      const isExists = await User.findOne({ email: email });

      // if (isExists) return isExists;
      if (isExists)
        return {
          message: "User already exixts",
          data: null,
        };

      let hashPassword;
      const salt = await bcrypt.genSalt(10);

      hashPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ name, email, password: hashPassword });
      const saveUser = await newUser.save();

      // return saveUser;
      return {
        message: "success",
        data: saveUser,
      };
    },
    addProject: async (parent, args) => {
      const newProject = new Project(args);
      const saveProject = await newProject.save();

      return saveProject;
    },
    addTask: async (parent, args) => {
      const newTask = new Task(args);
      const saveTask = await newTask.save();

      return saveTask;
    },
  },

  Project: {
    users: async (parent) => {
      return parent.users;
    },
    tasks: async (parent) => {
      const projectTasks = await Task.find({ project: parent._id }).populate(
        "assignee assigneedBy"
      );

      return projectTasks;
    },
  },
};

module.exports = resolvers;
