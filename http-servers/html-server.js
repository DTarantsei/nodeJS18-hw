const http = require('http');
const fs = require('fs');


http
  .createServer()
  .on('request', (req, res) => {
    fs.readFile('index.html', function (error, data) {
      if (error) {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.end('Some error');
      }

      res.writeHead(200, {
        'Content-Type': 'html'
      });
      res.write(data
        .toString()
        .replace('{message}', 'Hello world'));

      res.end();
    });
  })
  .listen(3000);
