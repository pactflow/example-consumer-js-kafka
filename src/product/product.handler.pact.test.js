const {
  Matchers,
  MessageConsumerPact,
  asynchronousBodyHandler,
} = require("@pact-foundation/pact");
const productEventHandler = require('./product.handler')
const { like, term } = Matchers;

const path = require("path");

describe("Kafka handler", () => {
  const messagePact = new MessageConsumerPact({
    consumer: "pactflow-example-consumer-js-kafka",
    dir: path.resolve(process.cwd(), "pacts"),
    pactfileWriteMode: "update",
    provider: "pactflow-example-provider-java-kafka",
    logLevel: "info",
  });

  describe("receive a product update", () => {
    it("accepts a product event", () => {
      return messagePact
        .expectsToReceive("a product event update")
        .withContent({
          id: like("some-uuid-1234-5678"),
          type: like("Product Range"),
          name: like("Some Product"),
          version: like("v1"),
          event: term({ generate: "UPDATED", matcher: "^(CREATED|UPDATED|DELETED)$" }),
        })
        .withMetadata({
          "content-type": "application/json",
          "kafka_topic": "products",
        })
        .verify(asynchronousBodyHandler(productEventHandler));
    });
  });
});
