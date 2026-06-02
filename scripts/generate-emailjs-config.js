const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const serviceId = process.env.EMAILJS_SERVICE_ID || '';
const templateId = process.env.EMAILJS_TEMPLATE_ID || 'template_contact_form';
const publicKey = process.env.EMAILJS_PUBLIC_KEY || '';
const toEmail = process.env.EMAILJS_TO_EMAIL || 'vishwas2284@gmail.com';

const config = `window.EMAILJS_SERVICE_ID = ${JSON.stringify(serviceId)};
window.EMAILJS_TEMPLATE_ID = ${JSON.stringify(templateId)};
window.EMAILJS_PUBLIC_KEY = ${JSON.stringify(publicKey)};
window.EMAILJS_TO_EMAIL = ${JSON.stringify(toEmail)};
`;

fs.writeFileSync(path.resolve(process.cwd(), 'emailjs-env.js'), config, 'utf8');
console.log('Generated emailjs-env.js');
if (!serviceId || !publicKey) {
  console.warn('WARNING: EMAILJS_SERVICE_ID and/or EMAILJS_PUBLIC_KEY are missing in your .env.');
}
