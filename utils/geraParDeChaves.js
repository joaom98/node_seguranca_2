import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { generateKeyPairSync } from 'crypto';

const { privateKey, publicKey } = generateKeyPairSync(
  'rsa',
  {
    modulusLength: 2048,

    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  },
);

const __dirname = dirname(fileURLToPath(import.meta.url));

const caminho = join(__dirname, '..', 'src', 'chaves');

fs.writeFileSync(join(caminho, 'id_rsa_pub.pem'), publicKey);
fs.writeFileSync(join(caminho, 'id_rsa_priv.pem'), privateKey);
