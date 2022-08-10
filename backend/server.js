/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: true,
});

// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

fastify.register(require("@fastify/cors"), {
  origin: "*",
})

// Formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// View is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */

const Stripe = require('stripe');
const SAMPLE = 'sk_test_51LNdp3Aj9oy2Dkr01RVS5dcVirIblEMEkm3wZipToLIGzZA5niah9uCtZOaK0HXyfkNlQ6Wg3CvXq5ZIvAmFI1l300VVQBhvOt';
const stripe = new Stripe.Stripe(SAMPLE);


fastify.get("/products", async function (request, reply) {

  const category = request.query.category || 'Video Games';

  // const products = await stripe.products.list({
  const products = await stripe.products.search(
    {
      query: `metadata[\'category\']:\'${category}\'`,
      limit: 30,
      page: request.query.page || undefined,
      expand: ['data.default_price']
    }
  );

  const accts = await stripe.accounts.update('acct_1LNdp3Aj9oy2Dkr0', { business_profile: { name: 'AADJ Gaming'}});
  return reply.send(accts);
});


fastify.post("/checkout", async function (request, reply) {
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000',
    line_items: request.body.data.items
      .map(lineItem => ({price: lineItem.product.default_price.id, quantity: lineItem.quantity})),
    mode: 'payment',
    currency: 'usd'
  });

  return reply.redirect(session.url);
  // return reply.send({});
});

// Run the server and report out to the logs
fastify.listen(
  { port: 3000, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
  }
);
