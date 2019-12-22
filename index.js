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
}

sendMessage({
  iframParentNode: "test",
  targetPath:
    "http://testing.com/book.html?default=<script>alert(document.cookie)</script>",
  payload: { key: "val" }
});

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
