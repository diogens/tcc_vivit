module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: "mongodb+srv://admin:vivit@cluster0.awox0.mongodb.net/vivit?retryWrites=true&w=majority"
      },
      options: {
        "ssl": true
      }
    },
  },
});
