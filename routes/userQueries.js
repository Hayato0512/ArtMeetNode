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
  var uid = req.body.uid
  
  console.log(`hey what up??? register user is called \n, will throw name ${name}, email ${email}, password ${password}, isArtist ${isArtist}`);

  try {
    connection.query(
      `INSERT INTO user (name, email, password, isArtist, uid) VALUES ('${name}','${email}','${password}', ${isArtist}, ${uid})`,
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

router.get("/readbookmarkedpostsbyid/:id", async (req, res) => {
  console.log(`hey the parameter is ${req.params.id}`);
  try {
    connection.query(
      `SELECT post.postid, user.name, post.title, post.price, post.setsumei, user.email FROM post
      JOIN bookmarkedpost
      on bookmarkedpost.postId = post.postId
      JOIN user
      on user.userid = post.artistid
      WHERE bookmarkedpost.userId = ${req.params.id}`,
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

router.get("/fetchotherspostsbyid/:id", async (req, res) => {
  console.log(`hey the parameter is ${req.params.id}`);
  try {
    connection.query(
      `SELECT post.postId, user.name, post.title, post.price, post.setsumei, post.desc2 
      FROM post 
      JOIN follows on post.artistid = follows.followeduserid 
      JOIN user on user.userid = post.artistid 
      where follows.userId = ${req.params.id}`,
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

router.get("/fetchspecificpostsbyid/:id", async (req, res) => {
  console.log(`hey the parameter is ${req.params.id}`);
  try {
    connection.query(
      `SELECT post.postId, user.name, post.title, post.price, post.setsumei, post.desc2 
      FROM post JOIN user ON post.artistid = user.userid 
      where post.artistid = ${req.params.id}`,
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

router.get("/fetchspecificsessionsbyid/:id", async (req, res) => {
  console.log(`hey the parameter is ${req.params.id}`);
  try {
    connection.query(
      `SELECT session.id as sessionId, session.artistId, session.studentId, user.name as artistName,session.dateAndTime, session.isBooked, session.isRequested, session.isFinished,
      session.comment
      FROM session JOIN user on session.artistId = user.userid 
      where session.artistId = ${req.params.id}`,
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

router.get("/fetchsessionbyid/:id", async (req, res) => {
  console.log(`hey the parameter is ${req.params.id}`);
  try {
    connection.query(
      `SELECT session.id as sessionId, session.artistId, session.studentId, user.name as artistName,session.dateAndTime, session.isBooked, session.isRequested, session.isFinished,
      session.comment
      FROM session JOIN user on session.artistId = user.userid 
      where session.id = ${req.params.id}`,
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

router.put("/requestsession/:studentid/:sessionid/:isRequested", async (req, res) => {
  console.log(`hey the parameter is ${req.params.id}`);
  try {
    connection.query(
      `UPDATE session
      SET isRequested = ${req.params.isRequested}, studentId = ${req.params.studentid}
      WHERE id = ${req.params.sessionid}; `,
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
router.put("/cancelsession/:sessionid", async (req, res) => {
  console.log(`hey the parameter is ${req.params.id}`);
  try {
    connection.query(
      `UPDATE session
      SET isRequested = 0, isBooked = 0, studentId = null
      WHERE id = ${req.params.sessionid}; `,
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

router.put("/approvesession/:sessionid", async (req, res) => {
  console.log(`hey the parameter is ${req.params.id}`);
  try {
    connection.query(
      `UPDATE session
      SET  isBooked = 1 
      WHERE id = ${req.params.sessionid}; `,
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

router.get("/fetchsessionsbystudentid/:studentid", async (req, res) => {
  console.log(`hey the parameter is ${req.params.id}`);
  try {
    connection.query(
      `SELECT session.id as sessionId, session.artistId, session.studentId, user.name as artistName,session.dateAndTime, session.isBooked, session.isRequested, session.isFinished,
      session.comment FROM session
JOIN user on session.artistId = user.userid
WHERE studentId = ${req.params.studentid} AND isRequested = true; `,
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

router.get("/fetchsessionsbyartistid/:artistid", async (req, res) => {
  console.log(`hey the parameter is ${req.params.id}`);
  try {
    connection.query(
      `SELECT session.id as sessionId, session.artistId, session.studentId, user.name as artistName,session.dateAndTime, session.isBooked, session.isRequested, session.isFinished,
      session.comment FROM session
JOIN user on session.artistId = user.userid
WHERE artistid = ${req.params.artistid} AND studentId != 0; `,
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
/**
 * let's modify this function so that this not only returns the id, but this also returns the user info.
 */
router.get("/readfollowings/:userid", async (req, res) => {
  console.log(`followings called`);
  try {
    connection.query(
      // `SELECT followeduserid FRfollows WHERE userId = ${req.params.userid}`,
      `SELECT * FROM user WHERE userid IN (SELECT followeduserid from follows WHERE userId = ${req.params.userid})`,
      // `SELECT user.userid, user.name, user.email, user.isArtist FROM user INNER JOIN follows ON  user.userid = follows.followeduserid`,
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

router.get("/searchuserontextchange/:text", async (req, res) => {
  console.log(`hey the parameter is ${req.params.text}`);
  try {
    connection.query(
      `SELECT * FROM user
      WHERE name LIKE '${req.params.text}%'`,
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

router.post("/followuser/:currentuserid/:userid", async (req, res) => {
  console.log(`hey the parameter is ${req.params.currentuserid}`);
  console.log(`hey the parameter is ${req.params.userid}`);
  try {
    connection.query(
      `INSERT INTO follows (userId, followeduserid) VALUES (${req.params.currentuserid},${req.params.userid})`,
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


router.delete("/unfollowuser/:currentuserid/:userid", async (req, res) => {
  console.log(`hey the parameter is ${req.params.currentuserid}`);
  console.log(`hey the parameter is ${req.params.userid}`);
  try {
    connection.query(
      `DELETE FROM follows WHERE userId = ${req.params.currentuserid} AND followeduserid = ${req.params.userid};`,
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

router.get("/checkfollowingstatus/:currentuserid/:userid", async (req, res) => {
  console.log(`hey the parameter is ${req.params.currentuserid}`);
  console.log(`hey the parameter is ${req.params.userid}`);
  try {
    connection.query(
      `SELECT EXISTS (SELECT id FROM follows WHERE userId = ${req.params.currentuserid} AND followeduserid = ${req.params.userid}) as result `,
      (error, res2) => {
        try {
        // SELECT id FROM follows WHERE userId = ${req.params.currentuserid} AND followeduserid = ${req.params.userid}
          if (error) throw error;
          else {
            // console.log(res2)
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
