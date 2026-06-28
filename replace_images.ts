import * as fs from 'fs';

let content = fs.readFileSync('src/components/LandingPage.tsx', 'utf8');

const images = [
  '/Brasil.webp',
  '/172403491980562162.jpg',
  '/African_Inspirations_by_Humble_Homage.jpg',
  '/download_2026.jpg',
  '/Best_15_Cultural_Festivals_Around_the_World_1.jpg',
  '/Cultural_Unity_Celebration.jpg',
  '/Best_7_ways_to_experience_local_culture_while_traveling.jpg',
  '/Best_15_Cultural_Festivals_Around_the_World.jpg',
  '/335658978506167940.jpg'
];

let i = 0;
content = content.replace(/https:\/\/images\.unsplash\.com\/[^'"]+/g, () => {
  const img = images[i % images.length];
  i++;
  return img;
});

fs.writeFileSync('src/components/LandingPage.tsx', content);
console.log('Images replaced!');
