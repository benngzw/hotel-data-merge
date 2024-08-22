db.getSiblingDB('admin').createUser({
  user: process.env.MONGODB_USERNAME,
  pwd: process.env.MONGODB_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: process.env.MONGODB_DBNAME
    }
  ]
})

db = db.getSiblingDB('local');

db.createCollection('hotels');

db.hotels.createIndex({ id: 1 }, { unique: true });
db.hotels.createIndex({ destination_id: 1 });
db.hotels.createIndex({ updatedAt: 1 });