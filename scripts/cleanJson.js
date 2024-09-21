const fs = require('fs');

// Path to the input JSON file
const inputFilePath = '../components/tokens1.json';
// Path to the output JSON file
const outputFilePath = '../components/tokens11.json';

// Fields to keep (excluding 'decimals')
const fieldsToKeep = ['address', 'logoURI', 'symbol'];

// Read the JSON file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Parse the JSON data
  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
    return;
  }

  // Remove unnecessary fields
  const cleanedData = jsonData.map(item => {
    const cleanedItem = {};
    fieldsToKeep.forEach(field => {
      if (item.hasOwnProperty(field)) {
        cleanedItem[field] = item[field];
      }
    });
    return cleanedItem;
  });

  // Minify the JSON data
  const minifiedData = JSON.stringify(cleanedData);

  // Write the cleaned and minified JSON data to a new file
  fs.writeFile(outputFilePath, minifiedData, 'utf8', writeErr => {
    if (writeErr) {
      console.error('Error writing the file:', writeErr);
      return;
    }
    console.log('Cleaned and minified JSON data has been written to', outputFilePath);
  });
});