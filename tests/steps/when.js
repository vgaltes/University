const http = require("superagent-promise")(require("superagent"), Promise);

module.exports.we_invoke_get_masters = async () => {
  const apiRoot = "https://6rf3v00hv9.execute-api.eu-west-1.amazonaws.com/dev";
  const functionPath = "masters";

  const url = `${apiRoot}/${functionPath}`;

  try {
    const res = await http("GET", url);

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
};
