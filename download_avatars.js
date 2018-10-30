const secrets = require('./secrets');
const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${secrets.GITHUB_TOKEN}`
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors(args[0], args[1], function(err, result) {
  if (args.length !== 2) {
    console.log('Please specify <repoOwner> and <repoName> to download GitHub avatars. e.g. jquery jquery');
  } else {
    const contributors = JSON.parse(result);

    contributors.forEach((contributor) => {
      downloadImageByURL(contributor.avatar_url, `avatars/${contributor.login}.jpg`);
    });

    console.log('Finished downloading avatars from specified GitHub repo!');
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    console.log('Errors:', err); 
  })
  .pipe(fs.createWriteStream(filePath));
}
