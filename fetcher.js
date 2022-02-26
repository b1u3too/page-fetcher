const request = require('request');
const fs = require('fs');

const [downloadFromPath, writeToPath] = process.argv.slice(2);

const fetcher = function (downloadFromPath, writeToPath) {
  request(downloadFromPath, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      console.log("Error in request: ", error);
      console.log("Error encountered trying to access requested site! Now exiting program.");
      process.exit();
    } else{
      fs.writeFile(writeToPath, body, (error) => {
        if (error) {
          console.log("Error in writefile: ", error);
        } else {
          printFileConfirmation(body, writeToPath);
        }
      });
    }
  });
}

const printFileConfirmation = function (fileBody, filepath) {
  console.log(`Downloaded and saved ${fileBody.length} bytes to ${filepath}`);
};

fetcher(downloadFromPath, writeToPath);