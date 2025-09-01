const fs = require('fs');

const { dummyUsers } = require('./dummyUsers');

const newUsers = [...dummyUsers];

function handleRequest(req, res) {
  const url = req.url;
  const method = req.method;

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

  if (url === '/create-user' && method === 'POST') {
    const bodyMessage = [];

    req.on('data', (chunk) => {
      bodyMessage.push(chunk);
    });

    return req.on('end', () => {
      const parsedMessage = Buffer.concat(bodyMessage).toString();
      console.log(parsedMessage);
      const message = parsedMessage.split('=')[1];
      newUsers.push(message);

      fs.writeFile('username.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/users');

        return res.end();
      })
    });
  }

  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>Hello, Server!</title></head>');
    res.write(`<body><ul>${newUsers.map((item) => `<li>${item}</li>`).join('')}</ul></body>`);
    res.write('</html>');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Greetings</title></head>');
  res.write('<body><h1>Hello from Node.js Server</h1></body>');
  res.write('</html>');
  res.end();
}

module.exports = {
  handleRequest
}