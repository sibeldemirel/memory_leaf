import fs from 'fs';
import path from 'path';
import { swaggerSpec } from '../utils/swagger';

const outputPath = path.resolve(__dirname, '../swagger.json');

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), 'utf-8');

console.log('✅ swagger.json généré avec succès à la racine du projet.');
