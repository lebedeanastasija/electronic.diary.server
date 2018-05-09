const app = require('./app');
const http = require('http');

process.title = 'electronic_diary';
const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
	console.log(`Listening on ${port}`);
});

