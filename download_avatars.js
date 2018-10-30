
const secrets = require('./secrets');
const request = require('request');
const https = require('https');
const fs = require('fs');
const args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${secrets.GITHUB_TOKEN}`
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors('jquery', 'jquery', function(err, result) {
  const contributors = JSON.parse(result);

  contributors.forEach((contributor) => {
    console.log(contributor.avatar_url);
  });
});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      console.log('Errors:', err); 
    })
    .on('response', function (response) {
      // console.log('Result:', response);
      console.log(url, filePath);
    });
    // .pipe(fs.createWriteStream('./downloaded.html'));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");
