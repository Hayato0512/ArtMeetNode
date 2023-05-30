const router = require("express").Router();
const connection = require("../db");
const jsonParser = require("../app"); 
router.get("/post", (req, res) => {
  console.log("hey what up???");
  try {
    connection.query(
      "INSERT INTO post (artistId, title,price,setsumei,desc2) VALUES (2, 'testClass2',50,'this is setsumei','desc2')",
      (error, res2) => {
        if (error) throw error;
  
        if (!error) {
          console.log("succeed");
          res.send("succeed");
        }
      }
    );
  } catch (error) {
    
  }
 
});

router.post("/registeruser", (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password
  var isArtist = req.body.isArtist
  
  console.log(`hey what up??? register user is called \n, will throw name ${name}, email ${email}, password ${password}, isArtist ${isArtist}`);

  try {
    connection.query(
      `INSERT INTO user (name, email, password, isArtist) VALUES ('${name}','${email}','${password}', ${isArtist})`,
      (error, res2) => {
        if (error) throw error;
  
        if (!error) {
          console.log("succeed");
          res.send("succeed");
        }
      }
    );
  } catch (error) {
    
  }
 
});

router.delete("/deletefirst", async (req, res) => {
  console.log("delete query called");
  try {
    connection.query("DELETE FROM post LIMIT 1", (error) => {
      if (error) throw error;
      else {
        res.send("hey");
      }
    });
  } catch (error) {
    
  }
 
});
router.delete("/deletebyid/:id", async (req, res) => {
  console.log("delete query called");
  const result = req.params.id;
  console.log(`req is like this ${result}`);
  try {
    connection.query(`DELETE FROM user WHERE userid = ${result}`, (error) => {
      if (error) throw error;
      else {
        res.send("hey");
      }
    });
  } catch (error) {
    
  }
  
});

router.get("/readusers/", async (req, res) => {
  console.log("read users query called");
  try {
    connection.query(`SELECT * FROM user`, (error, res2) => {
      if (error) throw error;
      else {
        console.log(res2);
        res.send(res2);
      }
    });
  } catch (error) {
    
  }
  
});

router.get("/readuserbyemail/:email", async (req, res) => {
  console.log("read users byemail query called");
  console.log("read users byemail query called");
  console.log(`req.body.email is ${req.params.email}`);
  try {
    connection.query(
      `SELECT * FROM user WHERE email = '${req.params.email}'`,
      (error, res2) => {
        if (error) console.log("hey got some error but don't throw")
        else {
          console.log(res2);
          res.send(res2);
        }
      }
    );
  } catch (error) {
    console.log(error)
  }


});
router.get("/readuserbyid/:id", async (req, res) => {
  console.log("read users byid query called");
  try {
    connection.query(
      `SELECT * FROM user WHERE userid = ${req.params.id}`,
      (error, res2) => {
        if (error) throw error;
        else {
          console.log(res2);
          res.send(res2);
        }
      }
    );
  } catch (error) {
    
  }

});

router.put("/update", async (req, res) => {
  console.log("update query called");
  console.log(`the passed req.body is ${req.body.userid}`);
  try {
    connection.query(
      `UPDATE user SET name = 'Takuya1', email='takuya1@gmail.com' WHERE userid = 104`,
      (error) => {
        if (error) throw error;
        else {
          res.send("successful update");
        }
      }
    );
  } catch (error) {
    
  }

});

router.get("/readpostsbyid/:id", async (req, res) => {
  console.log(`hey the parameter is ${req.params.id}`);
  try {
    connection.query(
      `SELECT * FROM post WHERE artistid = ${req.params.id}`,
      (error, res2) => {
        try {
          if (error) throw error;
          else {
            res.send(res2);
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  } catch (error) {
    
  }
 
});

router.post("/follows/:userid/:useridtofollow", async (req, res) => {
  console.log(`follows called`);
  try {
    connection.query(
      `INSERT INTO follows (userId, followeduserid) VALUES ('${req.params.userid}','${req.params.useridtofollow}')`,
      (error, res2) => {
        try {
          if (error) throw error;
          else {
            res.send(res2);
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  } catch (error) { 
  }
});
router.get("/readfollowings/:userid", async (req, res) => {
  console.log(`followings called`);
  try {
    connection.query(
      `SELECT followeduserid FROM follows WHERE userId = ${req.params.userid}`,
      (error, res2) => {
        try {
          if (error) throw error;
          else {
            res.send(res2);
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  } catch (error) {
    
  }

});
// console.log(res);
// connection.query("DELETE FROM user LIMIT 1", (error) => {
//   if (error) throw error;
//   else {
//     res.send("hey");
//   }
// });
// });
// router.get("/a", async (req, res) => {
//   console.log(`hey, this `);
// });
module.exports = router;
