const dynamodb = require('aws-sdk/clients/dynamodb');                              

const params = {};                                                               

if (process.env.DYNAMODB_ENDPOINT) {                                             
  params.endpoint = process.env.DYNAMODB_ENDPOINT;                               
}

const dbClient = new dynamodb.DocumentClient(params);

const { TABLE_NAME } = process.env;

exports.rootHandler = async (event) => {
  console.info('received:', event);

  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: 'OK' }),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`,
  );
  return response;
};

exports.addMessageHandler = async (event) => {
  console.info('received:', event);

  const { id, message } = JSON.parse(event.body);

  await dbClient.put({
    TableName: TABLE_NAME,
    Item: {
      pk: id,
      sk: message,
    }
  }).promise();

  const response = {
    statusCode: 201,
    body: JSON.stringify({ id, message }),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`,
  );
  return response;
};

