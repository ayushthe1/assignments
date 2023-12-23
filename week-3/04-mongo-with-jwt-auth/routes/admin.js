const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const newAdmin = new Admin({
    username: username,
    password: password,
  });

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    await newAdmin.save();
    res.json({ success: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ error: "cant create admin" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signin logic

  const userExist = await Admin.findOne({ username: req.body.username });
  if (!userExist) {
    return res.status(400).json({ error: "This user doesn't exist" });
  }

  const payload = {
    username: req.body.username,
  };
  const token = jwt.sign(payload, jwtPassword);
  res.json({ token: token });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    price: parseInt(req.body.price),
    imageLink: req.body.imageLink,
  });

  course.save().then((ok) => {
    res.json({ message: "Course created successfully", courseId: course._id });
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find({});
    res.json({ courses: courses });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
