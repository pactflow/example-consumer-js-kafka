const app = require('express')();
const cors = require('cors');
const routes = require('./src/product/product.routes');
const consumeProductStream = require('./src/service/kafka')
const streamHandler = require('./src/product/product.handler')
const port = 8080;

const init = () => {
    app.use(cors());
    app.use(routes);

    // Start streaming in products
    consumeProductStream(streamHandler)

    return app.listen(port, () => console.log(`Provider API listening on port ${port}...`));
};

init();