// Encrypts the personal vCard so the number is NOT readable in the site's source.
// Usage: node tools/seal.mjs <personal.vcf> "<the word>"   -> writes inner.json
// The word is what Travis tells people in person. Re-run any time to change it.
import {readFileSync,writeFileSync} from 'node:fs';
import {webcrypto as c} from 'node:crypto';
const [,, file, word] = process.argv;
if(!file||!word){console.error('usage: node tools/seal.mjs personal.vcf "the word"');process.exit(1)}
const enc=new TextEncoder(), b64=u=>Buffer.from(u).toString('base64');
const norm=w=>w.trim().toLowerCase();
const salt=c.getRandomValues(new Uint8Array(16)), iv=c.getRandomValues(new Uint8Array(12));
const km=await c.subtle.importKey('raw',enc.encode(norm(word)),'PBKDF2',false,['deriveKey']);
const key=await c.subtle.deriveKey({name:'PBKDF2',salt,iterations:250000,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['encrypt']);
const ct=await c.subtle.encrypt({name:'AES-GCM',iv},key,enc.encode(readFileSync(file,'utf8')));
writeFileSync('inner.json',JSON.stringify({s:b64(salt),v:b64(iv),c:b64(new Uint8Array(ct)),n:250000}));
console.log('wrote inner.json');
