const bcrypt = require('bcryptjs');
const createToken = require('../createtoken.js');
const Users = require('../Models/Users');
const MessageController = {
  async register(req, res, next) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = await Users.create({
      username: req.body.username,
      password: hashedPassword,
    }).catch((error) => {
      return res
        .status(500)
        .send('Käyttäjän rekisteröinti epäonnistui.' + error);
    });
    const token = createToken(user); // tokenin luontimetodi
    res.json({
      success: true,
      message: 'Rekisteröinti onnistui',
      token: token,
    });
  },
  async login(req, res, next) {
    const user = await Users.findOne({ username: req.body.username }).catch(
      (error) => {
        throw error;
      }
    );
    if (!user) {
      res.json({
        success: false,
        message: 'Kirjautuminen epäonnistui',
      });
    }
    if (bcrypt.compareSync(req.body.password, user.password) === false) {
      res.json({
        success: false,
        message: 'Kirjautuminen epäonnistui.',
      });
    } else {
      const token = createToken(user);
      res.json({
        success: true,
        message: 'Kirjautuminen onnistui',
        token: token,
      });
    }
  },
  createMessage(req, res, next) {
    console.log(req.params.username);
    Users.findOneAndUpdate(
      { username: req.params.username },
      { $push: { messages: req.body } },
      { new: true }
    )
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        throw error;
      });
  },
  getMessages(req, res) {
    Users.findOne({ username: req.params.username })
      .then((users) => {
        if (!users?.messages) {
          console.log('Ei viestejä');
        } else {
          res.json(users.messages);
        }
      })
      .catch((error) => {
        throw error;
      });
  },
  deleteMessage(req, res) {
    Users.findOneAndUpdate(
      { username: req.params.username },
      { $pull: { messages: { _id: req.params._id } } }
    )
      .then((users) => {
        res.json(users.messages);
      })
      .catch((error) => {
        throw error;
      });
  },
};
module.exports = MessageController;
