const url = 'https://akvwqlplfkvhyvzvrjlf.supabase.co/rest/v1/';
const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrdndxbHBsZmt2aHl2enZyamxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMzgxMzIsImV4cCI6MjA4OTYxNDEzMn0.DSO3oGxQh1O8-n9_TSZkcMPdw_tacvs75zWawCuFcok';

fetch(url, {
  headers: {
    'apikey': apikey,
    'Authorization': `Bearer ${apikey}`
  }
})
.then(res => res.json())
.then(data => {
  console.log('Tables:', Object.keys(data.definitions || {}));
  // For each table, log the properties (columns)
  if (data.definitions) {
    for (const [tableName, definition] of Object.entries(data.definitions)) {
      console.log(`\nTable ${tableName}:`);
      if (definition.properties) {
        for (const [propName, propDef] of Object.entries(definition.properties)) {
          console.log(`  - ${propName} (${propDef.type}${propDef.format ? ', ' + propDef.format : ''}): ${propDef.description || ''}`);
        }
      }
    }
  }
})
.catch(err => console.error(err));
