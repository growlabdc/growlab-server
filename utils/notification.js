const config = require('../config')

const apn  = require('apn')

const THROTTLE_INTERVAL = 15 * 60 * 1000

let provider

let notifications = {}

const initialize = () => {
  let provider = new apn.Provider(config.notification)

  provider.on('error', function(err) {
    console.log(err)
  })
}

const sendNotification = (opts) => {
  if (!config.notification.device_tokens.length)
    return

  const throttle_cutoff = new Date(new Date().getTime() - THROTTLE_INTERVAL)

  if (notifications[opts.title] && notifications[opts.title] > throttle_cutoff)
    return

  let notification = new apn.Notification({
    alert: {
      title: opts.title,
      body: opts.body,
    },
    sound: 'chime.caf',
    topic: 'org.reactjs.native.example.growlab',
    payload: {
      'sender': 'node-apn',
    },
  })

  notifications[opts.title] = new Date()

  provider.send(notification, config.notification.device_tokens).then( (response) => {
    console.log(resposne)
  })
}

module.exports = {
  initialize: initialize,
  sendNotification: sendNotification
}