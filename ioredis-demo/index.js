const Redis = require('ioredis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const cluster = new Redis.Cluster(
  [
    {
      port: 7000,
      host: '192.168.100.253'
    },
    {
      port: 7001,
      host: '192.168.100.253'
    },
    {
      port: 7002,
      host: '192.168.100.253'
    }
  ]
)

cluster.set('hello', 'world')

cluster.get('hello', (err, result) => {
  console.log(result);
})

const sessionStore = new RedisStore({
  client: cluster
})
