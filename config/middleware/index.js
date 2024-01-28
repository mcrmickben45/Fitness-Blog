// const axios = require('axios');
// const mysql = require('mysql2');
// require('dotenv').config(); 

// const {
//   DB_HOST,
//   DB_USER,
//   DB_PASSWORD,
//   DB_DATABASE,
// } = process.env;

// const connectionString = process.env.JAWSDB_URL || {
//   host: DB_HOST || 'i0rgccmrx3at3wv3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   user: DB_USER || 'an0g5pgtn7w5p08t',
//   password: DB_PASSWORD || 'mbfoxq1aic0i8kdv',
//   database: DB_DATABASE || 'kmi9hbmemcetxpb7',
// };


// const pool = mysql.createPool(connection.config);

// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//   } else {
//     console.log('Connected to MySQL database');

 
//     connection.release();
//   }
// });


// pool.on('error', (err) => {
//   console.error('MySQL pool error:', err);
// });


// axios.get('https://api.nal.usda.gov/fdc/v1/food/2346412?api_key=sNqFb8sEeX5jXteWJFwx6vpJpeQ4Evt67s08ls6m', {
//   params: {
//     api_key: process.env.NutritionApi,
//   },
// })
//   .then(res => console.log(res.data))
//   .catch(err => console.error('Error making API request:', err));
