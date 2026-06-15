const { MongoClient } = require('mongodb');

const SOURCE_URI = "mongodb+srv://sahilzinzuvadiya77_db_user:sahil79909@cluster0.bu7vx3j.mongodb.net/ProjectTour?retryWrites=true&w=majority";
// URL-encoded password: Unitedpearl@1233 -> Unitedpearl%401233
const TARGET_URI = "mongodb+srv://dgpatel:Unitedpearl%401233@cluster0.x2djgqx.mongodb.net/ProjectTour?retryWrites=true&w=majority";

async function migrate() {
  console.log("🚀 Starting database migration...");
  console.log(`Source: sahilzinzuvadiya77_db_user`);
  console.log(`Target: dgpatel`);

  let sourceClient, targetClient;

  try {
    console.log("Connecting to Source DB...");
    sourceClient = await MongoClient.connect(SOURCE_URI);
    const sourceDb = sourceClient.db();
    console.log("✅ Connected to Source DB.");

    console.log("Connecting to Target DB...");
    targetClient = await MongoClient.connect(TARGET_URI);
    const targetDb = targetClient.db();
    console.log("✅ Connected to Target DB.");

    console.log("Fetching collections from Source DB...");
    const collections = await sourceDb.listCollections().toArray();
    console.log(`Found ${collections.length} collections.`);

    for (const colInfo of collections) {
      const colName = colInfo.name;
      console.log(`\n📦 Migrating collection: ${colName}...`);

      const sourceCol = sourceDb.collection(colName);
      const targetCol = targetDb.collection(colName);

      // Fetch all documents from source
      const docs = await sourceCol.find({}).toArray();
      console.log(`- Found ${docs.length} documents in source.`);

      if (docs.length > 0) {
        // Clear target collection first
        console.log(`- Clearing target collection: ${colName}...`);
        await targetCol.deleteMany({});

        // Insert documents into target
        console.log(`- Inserting ${docs.length} documents into target...`);
        const result = await targetCol.insertMany(docs);
        console.log(`- ✅ Successfully inserted ${result.insertedCount} documents.`);
      } else {
        console.log(`- Collection is empty, skipping insert.`);
      }
    }

    console.log("\n🎉 Database migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed with error:", error);
  } finally {
    if (sourceClient) await sourceClient.close();
    if (targetClient) await targetClient.close();
  }
}

migrate();
