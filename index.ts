import { Endpoint } from "./utils/types";
import { serve, readableStreamToJSON } from "bun";

const endpoints: Endpoint[] = [
  {
    name: "Revo",
    url: "/website/lead",
    log: async (body) => {
      console.log("Received request for Revo");
      let res = await readableStreamToJSON(body);
      console.log(res)
    },
  }
];

console.log("API Tester Listening on port 1521");
serve({
  port: 1521,
  async fetch(req: Request) {
    const url = new URL(req.url);
    const endpoint = endpoints.find((e) => e.url === url.pathname);

    if ( endpoint ) {
      await endpoint.log(req.body);
      return new Response(`Reached ${endpoint.name}!`);
    }

    if ( url.pathname === "/") {
      return new Response("Hello from Titus' Awesome API Tester!");
    }

    return new Response(`Not found for path ${url.pathname}`, { status: 404 });
  }
});
