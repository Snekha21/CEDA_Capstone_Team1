import { Kafka }  from 'kafkajs';

var kafka = new Kafka({ brokers: ['localhost:9092'] });
var consumer = kafka.consumer({ groupId: 'customer-group' });

export default function startKafkaConsumer() {
    consumer.connect().then(function () {
        return consumer.subscribe({ topic: 'new-product-topic', fromBeginning: true });
    }).then(function () {
        return consumer.run({
            eachMessage: function (payload) {
                var message = payload.message.value.toString();
                console.log("📦 Customer service received product:", message);

                // Optional: Require controller here and pass data
                // var customerController = require('../controllers/customerController');
                // customerController.saveProduct(JSON.parse(message));
            }
        });
    }).catch(console.error);
}
