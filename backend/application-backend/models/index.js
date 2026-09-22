//imports
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

//import sequelize instance
import sequelize from '../config/database/database.config.js';

// Get the current files location and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize an empty object to hold the models
const db = {};

// Read all files in the current directory, filter out 'index.js' and non-JS files, and import each model
const files = fs.readdirSync(__dirname)
    .filter(file =>
        file !== 'index.js' &&
        file.endsWith('.js')
    );

for (const file of files) {
    const { default: defineModel } = await import(
        pathToFileURL(path.join(__dirname, file)).href
    );

    const model = defineModel(sequelize);
    db[model.name] = model;
}

// Set up associations between models if they exist
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Attach the Sequelize instance to the db object for easy access
db.sequelize = sequelize;

export default db;