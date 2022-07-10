const socket = require('socket.io');
// const chalk = require('chalk');
const { promisify } = require('util');
const { User, Room } = require('../models');

const users = [];

const createWSEvents = async (io) => {
  io.on = promisify(io.on);
  try {
    //this runs when the user connects to the server
    io.on('connection', (socket) => {
      // console.log(chalk.green(`Client Connected`, socket.id));
      socket.emit('message', `Welcome to DÜDLE!`);
      socket.on('createRoom', ({ room_name }, user) => {
        // const newUser = {
        //     user_id: user.id,
        //     socket_id: socket.id,
        // }
        //check to see if someone already made a room with the same id
        if (room_name === Room.findOne({ where: { room_name } })) {
          //   console.log(chalk.red('Room already exists'));
          socket.emit('Room Exists: ', room_name);
        } else {
          //   console.log(chalk.yellow('Creating Room: ', room_name));
        }
      });

      socket.on('Disconnect', () => {
        //removing the user from the array of users connected to the server
        users = users.filter((user) => user.id !== socket.id);
        //broadcasting the user to all other users. letting them know that a user has left and there's only that many users left
        io.emit('New User', users);
      });
    });
  } catch (err) {
    console.log(
      //   chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, JSON.stringify(err))
      err
    );
  }
};
const initSocket = (server) => {
  const io = socket(server);
  createWSEvents(io);
};

module.exports = initSocket;
