const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.mastersTable;

async function findMasterById(id) {
  const idAsInteger = parseInt(id, 10);
  const params = {
    TableName: tableName,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": idAsInteger
    }
  };

  const masters = await dynamodb.query(params).promise();
  return masters.Items[0];
}

module.exports.handler = async event => {
  const { id } = event.pathParameters;

  const master = await findMasterById(id);

  const res = { statusCode: 200, body: JSON.stringify(master) };

  return res;
};
