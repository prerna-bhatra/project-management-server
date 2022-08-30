const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
  }

  type Project {
    id: String!
    name: String!
    users: [User]!
    lead: User!
    tasks: [Task]!
  }

  type Task {
    id: String!
    name: String!
    status: String
    category: String
    description: String
    start: String
    end: String
    project: Project!
    assignee: User!
    assigneedBy: User!
  }

  type Login {
    message: String
    data: User
    token: String
  }

  type Query {
    
    getAllUsers: [User]!
    getAllProjects: [Project!]
    getAllTasks: [Task]!
    getUserById(id: String!): User!
    getProjectById(id: String): Project!
    getTaskById(id: String): Task!
  }

  input UserInput {
    name: String!
    email: String!
  }

  type Signup {
    message: String
    data: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Signup
    
    login(email: String!, password: String!): Login

    addProject(
      name: String!
      users: [String]
      lead: String!
      category: String!
      start: String
      end: String
    ): Project

    addTask(
      name: String!
      assignee: String!
      assigneedBy: String!
      project: String!
      category: String!
      description: String!
      end: String
      start: String
    ): Task
  }
`;

module.exports = typeDefs;
