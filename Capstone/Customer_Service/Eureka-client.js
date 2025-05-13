import {Eureka} from 'eureka-js-client';

const client = new Eureka({
    instance: {
        app: 'Customer-Service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        statusPageUrl: 'http://localhost:5001/',
        port: {
            '$': 5001,
            '@enabled': 'true',
        },
        vipAddress: 'customer-service',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: 'localhost',
        port: 7070,
        servicePath: '/eureka/apps/'
    }
});
// Start Eureka client
client.start(error => {
    if(error)
    console.log('Eureka client started with error:', error);
    else
    console.log('Registered with Eureka Successfully')
});