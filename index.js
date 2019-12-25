const isUrl = require("is-url");

function sendMessage(config) {
  const { iframParentNode, targetPath, payload } = config;
  let valid = true;

  for (let v of [iframParentNode, targetPath, payload]) {
    valid = isvalid(v);
  }

  console.log(isUrl(targetPath));
  if (!valid) return;
  if (!isUrl(targetPath)) return;
  let originUrl = stripUrl(targetPath);
  console.log(originUrl);
  if (originUrl !== "") {
    handleIframeAndToken(config);
  }
}

function handleIframeAndToken({ iframParentNode, targetPath, payload, cb }) {
  let iframe = document.createElement("iframe");
  iframe.setAttribute("src", targetPath);
  iframe.setAttribute("id", "iframsrc");
  iframe.setAttribute("height", "0");
  iframe.setAttribute("width", "0");
  let loader = document.querySelector(iframParentNode);
  loader.appendChild(iframe);
  iframe.addEventListener("load", function() {
    if (ifram) {
      console.log(ifram);
      iframe.contentWindow.postMessage(JSON.stringify(payload), targetPath);
      cb && cb();
    }
  });
}

function isvalid(data) {
  if (typeof data === "object") {
    let keys = Object.keys(data);
    return keys.length > 0;
  }

  return ![undefined, null, ""].includes(data);
}

function stripUrl(targetPath) {
  let SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  return targetPath.replace(SCRIPT_REGEX, "");
}

// sendMessage({
//   iframParentNode: "test",
//   targetPath: "http://testing.com/",
//   payload: { key: "val" }
// });

module.exports = sendMessage;
