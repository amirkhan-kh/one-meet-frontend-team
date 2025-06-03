export default function validateEmail(email) {
  // Simple regex to check for business domain (not Gmail, Yahoo, etc.)
  const publicDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const domain = email.split('@')[1];
  return !publicDomains.includes(domain);
}
