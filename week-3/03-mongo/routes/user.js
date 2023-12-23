const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  user
    .save()
    .then((ok) => {
      res.json({ message: "User created successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "some error occured" });
    });
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "cant get courses" });
      console.log(err);
    });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const id = req.params.courseId;
  try {
    const foundCourse = await Course.findById(id);

    if (!foundCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(foundCourse);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
