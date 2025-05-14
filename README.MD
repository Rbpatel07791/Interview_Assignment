## Purpose
You're tasked with two tickets this sprint:
> Ticket 1:
- Update the address schema to include a "state" field.
  - Update typescript types to mirror schema types


> Ticket 2:
- Create a mutation that accepts a username and address and saves it to the addresses.json file.
  - Follow the same pattern already in place in the "address" resolver
  - Add types where appropriate (graph and ts)
  - This is a create, not an update or delete. Don't smash existing records.
  - You can use any library or tool to modify the addresses.json file. If you use a library and it has a "get" or "read" function update the "address" resolver to use the same toolset to retrieve records.

### Things to think about
* How can you ensure graph schema types and typescript types match?
* How can you return a consistent user friendly error message for all resolvers?
* How would you nest this address object inside a larger schema object containing other elements specific to a user?

### Resources
* GraphQL Yoga (v5) documentation: https://the-guild.dev/graphql/yoga-server/docs
* Typescript: https://www.typescriptlang.org/docs/

### Expectations and notes

We're not expecting something that's highly polished and production ready. The purpose here is to see if you can meet the goals outlined and to evaluate the choices you've made to achieve those goals. To that end, feel free to use AI to **explain** sections of code to you, but don't use it to actually write the code. It's important that you understand what's going on in the code and can explain your choices.

### Note
Create a new repo in your github profile. Commit and push your completed code and share the url to the repo.