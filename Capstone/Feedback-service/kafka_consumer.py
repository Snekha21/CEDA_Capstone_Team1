from kafka import KafkaConsumer
import json
def kafkaconsumer():
       consumer = KafkaConsumer(
        'new-product-topic',
        bootstrap_servers='localhost:9092',
        auto_offset_reset='earliest',
        group_id='feedback-group'
    )

       print("Feedback service listening...")
       for message in consumer:
          product = json.loads(message.value.decode('utf-8'))
          print("Feedback service received product:", product)
    