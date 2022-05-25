const mysql = require("mysql");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const cors = require('cors');

// mysql connection
const con = mysql.createConnection({
  host: "localhost",
  user: "saravana",
  password: "password",
  database: "mydb",
});

//Create a database
// con.connect((err) => {
//     if(err) throw err;
//     console.log("Connected successfully ");
//     con.query("CREATE DATABASE mydb",(error,result)=>{
//         if(error) throw error;
//         console.log(result)
//     })
// })

//create a table  users
// con.connect((err) => {
//   if (err) throw err;
//   console.log("Connected successfully ");
//   con.query(
//     "CREATE TABLE users (id INT auto_increment NOT NULL,name varchar(100) NOT NULL,email varchar(100) NOT NULL , password varchar(250) NOT NULL,register_date DATETIME , primary key(id) )",
//     (error, result) => {
//       if (error) throw error;
//       console.log(result);
//     }
//   );
// });

// con.connect((err) => {
//   if (err) throw err;
//   console.log("Connected successfully ");
//   const sql = `INSERT INTO  users(name,email,password,register_date) values("saravana","saravana@gmail.com","password",now())`;

//   con.query(sql, (error, result) => {
//     if (error) throw error;
//     console.log(result);
//   });
// });

//database connection
con.connect((err) => {
  if (err) throw err;
  console.log("database connected ");
});

app.use(express.json());
app.use(cors());


// Register --> name ,email ,and password
app.post("/register", async (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 5);
  //check if the user exist in our database
  con.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      con.query(
        "INSERT INTO users(name,email,password,register_date) values(?,?,?,now())",
        [name, email, hashPassword],
        (err, result) => {
          if (err) throw err;
          console.log("user create successfully ");
          res.status(200).json("user created successfully ");
        }
      );
    } else {
      res.status(401).json("User exist..!");
    }
  });
});

app.post("/login", async (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { email, password } = req.body;
  con.query(
    "SELECT password from users where email = ?",
    [email],
    (err, result) => {
        if(err) throw err;
        const DbPass = result[0].password;
        const DeHash =  bcrypt.compare(password,DbPass,(err,result)=>{
            try{
                if(!result){
                    res.json("Invalid username and password").status(401)
                }
                else{
                    res.json("Login successfully ..!").status(200)
                }
            }
            catch(err){
                console.log(err)
            }
        })
      
    }
  );
});



app.listen(3001, (err) => {
  if (err) throw err;
  console.log("server is running on port 3001");
});
