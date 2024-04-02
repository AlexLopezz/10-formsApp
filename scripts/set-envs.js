const { writeFileSync, mkdirSync } = require('fs'); 
require('dotenv').config();

const target= './src/environments/environment.ts';
const envFileContent = 
`export const environment = {
    MAPBOX: "${ process.env['MAPBOX_KEY'] }"
};
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync(target, envFileContent);