module.exports.handler = async () => {
  const res = {
    statusCode: 200,
    body: JSON.stringify(`Hello`)
  };

  return res;
};
