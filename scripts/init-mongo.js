// Create or use a specific database
var dbName = "demo";
var db = db.getSiblingDB(dbName);
// Create a collection
var collectionName = "roles";
db.createCollection(collectionName);

// Insert test data into the collection
db.roles.insertMany([
  { name: "ROLE_USER" },
  { name: "ROLE_MODERATOR" },
  { name: "ROLE_ADMIN" },
])

print("Sample data inserted successfully.");
