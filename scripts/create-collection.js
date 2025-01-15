const { QdrantClient } = require('@qdrant/qdrant-js');

const qdrantClient = new QdrantClient({
  url: "http://localhost:6333", // Replace with your Qdrant instance URL
});

(async () => {
  try {
    await qdrantClient.createCollection("products", {
      vectors: {
        size: 1536, // Size of OpenAI embeddings
        distance: "Cosine", // Use cosine similarity for searching
      },
    });
    console.log("Collection 'products' created successfully");
  } catch (error) {
    console.error("Error creating collection:", error);
  }
})();
