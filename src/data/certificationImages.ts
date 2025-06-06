import { certifications } from './skills';

// Map your certification data to image URLs
// Replace these placeholder URLs with your actual certification image URLs
export const certificationImages = certifications.map((cert) => ({
  imageUrl: `/images/certifications/${cert.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`,
  title: cert.title,
  altText: `${cert.title} - ${cert.issuer}`,
})); 