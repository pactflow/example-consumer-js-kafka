const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'pactflow-example-consumer-js-kafka',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'products-group' })

const consumeProductStream = async (handler) => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'products', fromBeginning: false })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('received message')
      try {
        await handler(JSON.parse(message.value.toString()))
      } catch (e) {
        console.error('unable to handle incoming message', e)
      }
    },
  })
}

module.exports = consumeProductStream