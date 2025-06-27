const server = Bun.serve({
  routes: {
    "/": new Response("OK"),
  },
  fetch() {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server listening on ${server.url}`);
