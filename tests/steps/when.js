const http = require("superagent-promise")(require("superagent"), Promise);
const mode = process.env.TEST_MODE;

async function viaHttp(functionPath, method) {
  const apiRoot = process.env.TEST_BASE_URL;

  const url = `${apiRoot}/${functionPath}`;

  try {
    const res = await http(method, url);

    return {
      statusCode: res.status,
      body: res.body
    };
  } catch (err) {
    if (err.status) {
      return {
        statusCode: err.status
      };
    }
    throw err;
  }
}

async function viaHandler(functionPath) {
  const handler = require(`../../src/functions/${functionPath}`);
  return await handler.handler();
}

module.exports.we_invoke_get_masters = () => {
  return mode === "http" ? viaHttp("masters", "GET") : viaHandler("getMasters");
};
