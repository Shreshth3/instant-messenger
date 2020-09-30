// const mongoose = require('mongoose');

// const MONGO_URI =
//   'postgres://ulfqesuf:E-MZtgOqdt7cbKEedNp3C9BWF9bJMSOg@lallah.db.elephantsql.com:5432/ulfqesuf';

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'instant-messenger-users',
//   })
//   .then(() => console.log('Successfully connected to MongoDB.'))
//   .catch((err) => console.log(`ERROR connecting to MongoDB: ${err}`));

// const { Schema } = mongoose;

// const userSchema = new Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
// });

// const Users = mongoose.model('users', userSchema);

// module.exports = Users;

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
