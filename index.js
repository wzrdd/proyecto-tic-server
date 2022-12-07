// Stream to front
const server = require('http').createServer();
// https://stackoverflow.com/questions/24058157/socket-io-node-js-cross-origin-request-blocked
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

// Read from Arduino serialport
const { SerialPort, ReadlineParser } = require('serialport')

const port = new SerialPort({
  path: '/dev/ttyACM0',
  baudRate: 9600
})

const parser = new ReadlineParser()
port.pipe(parser)
parser.on('data', (data) => {
  io.emit('temp', data)
  console.log(data)
})


io.on("connection", () => {
  console.log("New client connected");
});

io.on("disconnect", () => {
  console.log("Client disconnected");
});

io.listen(8000)
