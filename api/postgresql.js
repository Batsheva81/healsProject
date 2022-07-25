const {Client} = require('pg')
const db = require('./db');

//SELECT timezone('America/New_York','2016-06-01 00:00');
    
      const client = new Client({
            host: "localhost",
            user: "postgres",
            port: 5432,
            password: "shlomoena",
            database: "postgres"
        })
      
    const execute = async (query) => {
        try {
            await client.connect();     // gets connection
            await client.query(query);  // sends queries
            return true;
        } catch (error) {
            console.error(error.stack);
            return false;
        } finally {
            await client.end();         // closes connection
        }
    };

    // roll true = admin, false = prvider
    const  createTableSqript = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "fullName" VARCHAR(50) NOT NULL,
         "userName" VARCHAR(15) NOT NULL,
         "pasword" VARCHAR(15) NOT NULL,
         "nameProvider" VARCHAR(25)NOT NULL ,
         "providerNumber" VARCHAR(25) NOT NULL,
        "roll" BOOLEAN NOT NULL, 
	    PRIMARY KEY ("id"));

        INSERT INTO public.users(
            id, "fullName", "userName", "pasword", "nameProvider", "providerNumber", roll)
            VALUES (11, 'Ruti','Ruti','Ruti','Ruti','Ruti',  false),
            (12, 'Haim','Haim','Haim','Haim','Haim',  true),
            (13, 'Guli','Guli','Guli','Guli','Guli',  false);
        `;
    function createTableUser () { 
        
            client.connect();
           client.query(createTableSqript, (err, res)=>{
              console.log("createUser");
              console.log(res);
             done();
          })
        }
        // SampleNumber = מספר הדגימה
    const createReportTable =`CREATE TABLE IF NOT EXISTS reports(
       "reportId" SERIAL,
       "idProvider" INT NOT NULL,
       "SampleNumber" INT NOT NULL,
       "TestResult" BOOLEAN, 
       "actualSampling" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "reportDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
       PRIMARY KEY ("reportId"),
       CONSTRAINT "fk_user"
        FOREIGN KEY("idProvider") 
         REFERENCES users("id")
    );`; 
    function createTableReport () { 
        
        //client.connect();
       client.query(createReportTable, (err, res)=>{
          console.log("createReport");
          console.log(err,res);
          client.end();
      })
  }
   
    const insertReport = (req, res) => {
      // client.connect();
       console.log("Inser report");
       const { reportId, idProvider, SampleNumber, TestResult, actualSampling } = req.body
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
        })
        // (error, results)=>{
           
        //     if (error) {
        //         res.send("Error")
        //     }
        //     //console.log(results.rowCount);
        //     res.status(201).send(`Report added with ID: ${results}`)
        //     client.end();
            
  // })
   
   }     
const selectUsersPerUserPass = (req, res) => {
    console.log("select user");
       const {username, pasword} = req.body;
       client.connect();
      console.log(username + " " + pasword); 
       client.query(`select * from users WHERE "userName" = '${username}' AND  "pasword" = '${pasword}'`,
        (error, respons)=>{
           
            if (error) {
                 console.log(error);
                // res.status(500)
                // res.render('error', { error: error })
                done();
                throw error
            }
            console.log("api :" + respons.rows);
            done();
            console.log("api 1111 :" + respons.rows);
            res.status(200).json(respons.rows);
           
           
        })
       
    }
    
    const selectCountReportsPerProvider = (req, res) => {

        const {idProvider, reportDated, untilDate} = req.body;
       client.connect();
       console.log("select");
        client.query(`select count(*) from reports 
        WHERE "idProvider" = ${idProvider} and  date("reportDate") BETWEEN  
        '${reportDated}'  and '${untilDate}'`, 
            (error, respons)=>{

                if (error) {
                    throw error
                }
                client.end();
                res.status(200).json(respons.rows)
               
            })
    }
   
 const selectreportsForManager = (req, res) => {

    const {reportDated, untilDate} = req.body;
    client.connect();
    console.log("select for manager");
    client.query(`select count(*), users."nameProvider"  from reports 
    INNER JOIN users  ON users."id" = reports."idProvider"
    WHERE  date("reportDate") BETWEEN  '${reportDated}'  and '${untilDate}'
    GROUP BY users."nameProvider"`, 
        (error, respons)=>{

            if (error) {
                throw error
            }
            client.end();
            res.status(200).json(respons.rows)
           
        })
} 
const connect = ()=>{
    client.connect();
}
   
module.exports = {createTableUser, selectUsersPerUserPass, createTableReport,
    insertReport, selectCountReportsPerProvider, selectreportsForManager, connect};















