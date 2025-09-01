const fs = require('fs');

const { dummyUsers } = require('./dummyUsers');

function handleRequest(req, res) {
  const url = req.url;

  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(`
      <body>
        <h1>Please enter the username</h1>
        <form action="/create-user" method="POST">
          <input type="text" name="username"/>
          <button type="submit">Send</button>
        </form>
      </body>
    `);
    res.write('</html>');
    return res.end();
  }

  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>Hello, Server!</title></head>');
    res.write(`<body><ul>${dummyUsers.map((item) => `<li>${item}</li>`).join('')}</ul></body>`);
    res.write('</html>');
    return res.end();
  }

  res.write('<html>');
  res.write('<head><title>Greetings</title></head>');
  res.write('<body><h1>Hello from Node.js Server</h1></body>');
  res.write('</html>');
  res.end();
}

module.exports = {
  handleRequest
}