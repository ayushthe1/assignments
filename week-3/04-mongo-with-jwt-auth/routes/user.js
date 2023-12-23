const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }

  const newUser = new User({
    username: username,
    password: password,
  });

  try {
    await newUser.save();
    res.json({ success: "user created succesfully" });
  } catch (err) {
    res.status(500).json({ error: "error creating the user" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  if (!username) {
    return res
      .status(400)
      .json({ error: "username and password must be provided" });
  }

  const userExist = await User.findOne({ username: username });
  if (!userExist) {
    return res.status(400).json({ error: "user dont exist" });
  }

  const payload = {
    username: username,
  };

  const token = jwt.sign(payload, jwtPassword);

  res.json({ token: token });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find({});
    res.json({ courses: courses });
  } catch (err) {
    res.status(500).json({ error: "couldnt get courses" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic 
  // (returning the course with the course id)
  const courseId = req.params.courseId

  try{
    const course = await Course.findById(courseId)
    if(!course){
        return res.status(404).json({error : 'course dont exist'})
    }
    res.json({course : course})

  }catch(err){
    res.status(400).json({error : err})
  }
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
