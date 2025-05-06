import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Change this to your project root or workspace
const ROOT_DIR = path.resolve(__dirname, '../workspace');

const getFileTree = async (dirPath) => {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    const tree = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          const children = await getFileTree(fullPath);
          return {
            label: entry.name,
            value: fullPath,
            children,
          };
        } else {
          return {
            label: entry.name,
            value: fullPath,
            children: null,
          };
        }
      })
    );

    return tree;
  } catch (err) {
    console.error('Error reading file tree:', err);
    return [];
  }
};

router.get('/api/file-tree', async (req, res) => {
  const tree = await getFileTree(ROOT_DIR);
  res.json(tree);
});

export default router;
