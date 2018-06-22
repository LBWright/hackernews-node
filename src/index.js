const { GraphQLServer } = require('graphql-yoga')


let links = [{
	id: 'link-0',
	url: 'www.howtographql.com',
	description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

// 2
const resolvers = {
  Query: {
	info: () => "This is the API for a hackernews clone",
	feed: () => links,
  },
  Mutation: {
	  post: (root, args) => {
		  const link = {
			  id: `link-${idCount++}`,
			  description: args.description,
			  url: args.url
		  }
		  links.push(link)
		  return link
	  },
	  updatePost: (root, args) => {
			root.description = args.description,
			root.url = args.url
		}
  }

}



// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))