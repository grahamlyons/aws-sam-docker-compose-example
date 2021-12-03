const Dynamodb = require('aws-sdk/clients/dynamodb');

const dynClient = new Dynamodb({ endpoint: process.env.DYNAMODB_ENDPOINT });

createDb = async (tableName) => {
  const params = {
    TableName: tableName,
    KeySchema: [
      { AttributeName: 'pk', KeyType: 'HASH' },
      { AttributeName: 'sk', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'pk', AttributeType: 'S' },
      { AttributeName: 'sk', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
  await dynClient.createTable(params).promise();
};

createDb(process.env.TABLE_NAME)
    .then(() => { console.log('Created table: ', process.env.TABLE_NAME); })
    .catch(console.error);
