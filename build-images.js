import fs from 'fs';
import path from 'path';

const publicDir = 'e:/React js new/Bday/public';
const lav1 = fs.readFileSync(path.join(publicDir, 'lav1.jpg')).toString('base64');
const lav2 = fs.readFileSync(path.join(publicDir, 'lav2.jpg')).toString('base64');
const lav3 = fs.readFileSync(path.join(publicDir, 'lav3.jpg')).toString('base64');
const venk = fs.readFileSync(path.join(publicDir, 'venkateswara.jpg')).toString('base64');

const code = `// Inline Base64 Data URIs for 100% zero-fail image rendering on mobile & PC
export const lav1Img = 'data:image/jpeg;base64,${lav1}';
export const lav2Img = 'data:image/jpeg;base64,${lav2}';
export const lav3Img = 'data:image/jpeg;base64,${lav3}';
export const venkateswaraImg = 'data:image/jpeg;base64,${venk}';
`;

fs.writeFileSync('e:/React js new/Bday/src/assets/images.js', code);
console.log('Successfully created src/assets/images.js!');
