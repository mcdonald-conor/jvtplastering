const fs = require('fs');
const path = require('path');

// Areas to generate pages for
const areas = [
    'Liverpool City Centre',
    'Allerton',
    'Aigburth',
    'Mossley Hill',
    'Woolton',
    'Childwall',
    'Wavertree',
    'Crosby',
    'Waterloo',
    'Bootle',
    'Aintree',
    'Walton',
    'Anfield',
    'Thornton',
    'Formby',
    'Maghull',
    'Litherland'
];

// Create areas directory if it doesn't exist
const areasDir = path.join(__dirname, 'areas');
if (!fs.existsSync(areasDir)) {
    fs.mkdirSync(areasDir);
}

// Read the template
const template = fs.readFileSync(path.join(__dirname, 'area-template.html'), 'utf8');

// Generate pages for each area
areas.forEach(area => {
    // Create URL-friendly slug
    const slug = area.toLowerCase().replace(/\s+/g, '-');

    // Replace placeholders in template
    let pageContent = template
        .replace(/{AREA_NAME}/g, area)
        .replace(/{AREA_SLUG}/g, slug);

    // Write the file
    fs.writeFileSync(path.join(areasDir, `${slug}.html`), pageContent);
    console.log(`Generated page for ${area}`);
});

console.log('All area pages generated successfully!');
