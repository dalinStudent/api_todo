import * as admin from 'firebase-admin';
import { project_id as projectId } from './serviceAccount.json';
import { ValueProvider } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccountKey = require('./serviceAccount.json');

console.log('key', serviceAccountKey);
if (!serviceAccountKey) {
  console.error('Service account key is null or undefined');
  process.exit(1);
}

if (!serviceAccountKey.project_id) {
  console.error('Project ID is missing from the service account key');
  process.exit(1);
}

const serviceAccount: admin.ServiceAccount = {
  projectId,
  clientEmail: serviceAccountKey.client_email,
  privateKey: serviceAccountKey.private_key.replace(/\\n/g, '\n'),
};

const adminProvider: ValueProvider = {
  provide: 'FirebaseAdmin',
  useValue: admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-grhbi%40tododb-c10fc.iam.gserviceaccount.com',
  }),
};

export default adminProvider;
