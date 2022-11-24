import mysql from 'mysql2';

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'myApp'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
	if (err) throw err

	console.log('The solution is: ', rows)
})

connection.end()