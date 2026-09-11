import fs from 'node:fs/promises';
import path from 'node:path';
const files=['index.html','quienes-somos.html','proyectos.html','styles.css','app.js'];
await fs.mkdir('dist',{recursive:true});
for(const file of files) await fs.copyFile(file,path.join('dist',file));
await fs.cp('assets','dist/assets',{recursive:true});
for(const file of files.filter(f=>f.endsWith('.html'))){
 const content=await fs.readFile(file,'utf8');
 if(!content.includes('<h1')||!content.includes('name="viewport"'))throw Error('Metadatos o título faltantes: '+file);
 for(const match of content.matchAll(/(?:href|src)="([^"#]+)"/g)){
  const target=match[1].split('#')[0];
  if(!/^(https?:|mailto:|tel:|data:)/.test(target)) await fs.access(target);
 }
}
console.log('Sitio estático generado. Tres páginas y recursos locales verificados.');
