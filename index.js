const axios = require('axios') 
process.env.NutritionApi = 'API';

axios.get('https://api.nal.usda.gov/fdc/v1/food/2346412?api_key=sNqFb8sEeX5jXteWJFwx6vpJpeQ4Evt67s08ls6m') 

    .then(res => console.log(res.data)) 
    .catch(err => console.log(err))

    const mysql = require('mysql2');

let connection;

if (process.env.JAWSDB_URL) {
  
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'your_database',
  });
}

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = connection;