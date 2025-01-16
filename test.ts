const { MongoClient } = require('mongodb');

const uri = "your_connection_url"; // Replace with your MongoDB URL

async function testConnection() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  } finally {
    await client.close();
  }
}

testConnection();