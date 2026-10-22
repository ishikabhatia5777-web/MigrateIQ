import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { MongoClient } from 'mongodb'

function mongoApiPlugin(mongoUri: string): Plugin {
  let client: MongoClient | null = null;

  async function getCollection() {
    if (!client) {
      client = new MongoClient(mongoUri);
      await client.connect();
    }
    return client.db('MigrateIQ_contactus').collection('Contact_Us');
  }

  const handler = async (req: any, res: any, next: any) => {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk: any) => {
        body += chunk;
      });
      req.on('end', async () => {
        try {
          const data = JSON.parse(body || '{}');
          if (!data.name || !data.email) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Name and email are required.' }));
            return;
          }

          const collection = await getCollection();
          const doc = {
            name: data.name,
            email: data.email,
            company: data.company || '',
            platform: data.platform || 'Tableau',
            message: data.message || '',
            submittedAt: new Date()
          };

          const result = await collection.insertOne(doc);
          console.log(`[MongoDB] New submission saved to MigrateIQ_contactus.Contact_Us (ID: ${result.insertedId})`);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, id: result.insertedId }));
        } catch (err: any) {
          console.error('[MongoDB] Error saving contact request:', err);
          // Reset client in case of connection drop
          client = null;
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: err.message || 'Database error' }));
        }
      });
    } else {
      next();
    }
  };

  return {
    name: 'mongo-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/contact', handler);
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const mongoUri = env.VITE_MONGODB_URI || env.MONGODB_URI || '';

  return {
    plugins: [
      react(),
      tailwindcss(),
      mongoApiPlugin(mongoUri),
    ],
  };
});
