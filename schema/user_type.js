const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const users = mongoose.model("users");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    // projects: {
    //   type: new GraphQLList(LyricType),
    //   resolve(parentValue) {
    //     return users.findProject(parentValue.id);
    //   }
    // }
  }),
});

module.exports = UserType;
