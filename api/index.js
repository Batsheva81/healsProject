const express = require('express');
const bodyParser=require('body-parser');
const postgresql = require('./postgresql');
const cors = require('cors');
/// hjkjkjkj
const db = require('./db');

const app = express();
app.use(cors())

app.use('/',bodyParser.json())

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  
// creale tables
 
// app.get('/', (req, res) => {
//   db.any(`CREATE TABLE IF NOT EXISTS reports(
//     "reportId" SERIAL,
//     "idProvider" INT NOT NULL,
//     "SampleNumber" INT NOT NULL,
//     "TestResult" BOOLEAN, 
//     "actualSampling" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//      "reportDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY ("reportId"),
//     CONSTRAINT "fk_user"
//      FOREIGN KEY("idProvider") 
//       REFERENCES users("id")
//  );
//  CREATE TABLE IF NOT EXISTS "users" (
//   "id" SERIAL,
//   "fullName" VARCHAR(50) NOT NULL,
//      "userName" VARCHAR(15) NOT NULL,
//      "pasword" VARCHAR(15) NOT NULL,
//      "nameProvider" VARCHAR(25)NOT NULL ,
//      "providerNumber" VARCHAR(25) NOT NULL,
//     "roll" BOOLEAN NOT NULL, 
//   PRIMARY KEY ("id"));

//     INSERT INTO public.users(
//         id, "fullName", "userName", "pasword", "nameProvider", "providerNumber", roll)
//         VALUES (11, 'Ruti','Ruti','Ruti','Ruti','Ruti',  false),
//         (12, 'Haim','Haim','Haim','Haim','Haim',  true),
//         (13, 'Guli','Guli','Guli','Guli','Guli',  false);`)
//   .then(rows => {
//     console.log(rows);
//     res.status(201).json(rows)
//   })
//   .catch(error => {
//     console.log("error");
//   })
// })
app.post('/userExist', (req, res) => {
  console.log("in api exist user")
  const {username, pasword} = req.body;
  console.log(req.body);
  db.any(`select * from users WHERE "userName" = '${username}' AND  "pasword" = '${pasword}'`)
  .then(rows => {
    console.log(rows);
    res.status(201).json(rows)
})
.catch(error => {
    console.log("error");
});
});
//app.post('selectUsersPerUserPass', postgresql.app.post)
app.post('/insertReport', (req, res) => {
  // client.connect();
  //const {username, pasword} = req.body;
   const {idProvider, SampleNumber, TestResult, actualSampling } = req.body
   db.any(`INSERT INTO public.reports( "idProvider", "SampleNumber", 
        "TestResult", "actualSampling")
        VALUES ( ${idProvider}, ${SampleNumber}, ${TestResult}, 
        '${actualSampling}'::timestamptz)`)
    .then(rows => {
        console.log(rows);
        res.status(201).json(rows)
    })
    .catch(error => {
        console.log("error");
    });
  })
app.post('/selectReportsPerProvider', (req, res) => {
  const {idProvider, reportDated, untilDate} = req.body;
  db.any(`select count(*) from reports 
  WHERE "idProvider" = ${idProvider} and  date("reportDate") BETWEEN  
  '${reportDated}'  and '${untilDate}'`)
  .then(rows => {
    console.log(rows);
    res.status(201).json(rows)
})
.catch(error => {
    console.log("error");
});
})
app.post('/selectCountReportsPerManager',(req, res) => {
  const {reportDated, untilDate} = req.body;
  db.any(`select count(*), users."nameProvider"  from reports 
  INNER JOIN users  ON users."id" = reports."idProvider"
  WHERE  date("reportDate") BETWEEN  '${reportDated}'  and '${untilDate}'
  GROUP BY users."nameProvider"`)
  .then(rows => {
    console.log(rows);
    res.status(201).json(rows)
})
.catch(error => {
    console.log("error");
});
}  )

app.listen(3000,()=>{
    console.log('App running at http://localhost:3000');
})