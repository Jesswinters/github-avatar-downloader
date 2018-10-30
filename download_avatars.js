const secrets = require('./secrets');
const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

// Function that gets the repo owner and name, and submits the request
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

// Run function to get repo owner and name, if 2 args aren't used then don't attemp request
// If 2 args are submitted, run request to fetch the avatar URLs
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

// Create avatar images in supplied filePath in the getRepoContributors callback above
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    console.log('Errors:', err); 
  })
  .pipe(fs.createWriteStream(filePath));
}
