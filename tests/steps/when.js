const http = require("superagent-promise")(require("superagent"), Promise);

const mode = process.env.TEST_MODE;

async function viaHttp(functionPath, method, idToken) {
  const apiRoot = process.env.TEST_BASE_URL;

  const url = `${apiRoot}/${functionPath}`;

  try {
    const httpReq = http(method, url);
    if (idToken) {
      httpReq.set("Authorization", idToken);
    }

    const res = await httpReq;

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

async function viaHandler(functionPath, event) {
  // eslint-disable-next-line global-require
  const handler = require(`../../src/functions/${functionPath}`);
  const response = await handler.handler(event);
  response.body = JSON.parse(response.body);
  return response;
}

module.exports.we_invoke_get_masters = () =>
  mode === "http" ? viaHttp("masters", "GET") : viaHandler("getMasters");

module.exports.we_invoke_get_master_details = (user, masterId) => {
  const event = { pathParameters: { id: masterId } };

  return mode === "http"
    ? viaHttp(`master/${masterId}`, "GET", user.idToken)
    : viaHandler("getMaster", event);
};
