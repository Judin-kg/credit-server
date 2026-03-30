const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient({
  keyFilename: "./credit-recovery-90683-9c9229e81316.json",
});

module.exports = client;