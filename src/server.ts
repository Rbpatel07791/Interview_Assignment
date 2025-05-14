import { createServer } from "node:http";
import { genSchema } from "./schema";
import { createYoga } from "graphql-yoga";

const yogaPort = 4000;

(async () => {
  const schema = await genSchema();
  const yoga = createYoga({ schema });
  const server = createServer(yoga);

  server.listen(yogaPort, () => {
    console.log(`Server is listening at http://localhost:${yogaPort}/graphql`);
  });
})();
