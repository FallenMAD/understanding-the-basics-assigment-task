const { dummyUsers } = require('./dummyUsers');

function handleRequest(req, res) {
  const url = req.url;

  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>Hello, Server!</title></head>')
    res.write(`<body><ul>${dummyUsers.map((item) => `<li>${item}</li>`).join('')}</ul></body>`);
    res.write('</html>');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
  res.end();
}

module.exports = {
  handleRequest
}