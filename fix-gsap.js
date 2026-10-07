const fs = require('fs');
['Shop.html', 'About.html', 'Contact.html'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('gsap.min.js')) {
    content = content.replace('</body>', '  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n</body>');
    fs.writeFileSync(file, content);
    console.log('Added GSAP to ' + file);
  }
});
