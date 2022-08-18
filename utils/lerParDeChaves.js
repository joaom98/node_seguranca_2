import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const caminhoDasChaves = join(__dirname, '..', 'src', 'chaves');

const privateKey = readFileSync(join(caminhoDasChaves, 'id_rsa_priv.pem'), 'utf-8');
const publicKey = readFileSync(join(caminhoDasChaves, 'id_rsa_pub.pem'), 'utf-8');

export {
  privateKey,
  publicKey,
};
