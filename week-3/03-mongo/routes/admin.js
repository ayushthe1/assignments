const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const admin = new Admin({
    username: req.body.username,
    password: req.body.password,
  });
  admin.save().then((ok) => {
    res.json({success : "Admin created successfully"});
    console.log(ok);
  }).catch(error => {
    res.status(501).json("Some error occured")
    console.log(error)
  });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    price: parseInt(req.body.price),
    imageLink: req.body.imageLink,
  })

  course.save().then((ok) => {
    res.json({ message: 'Course created successfully', courseId: course._id })
  })
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try{
    const courses = await Course.find({})
    res.json(courses)
  }catch(error){
    res.status(500).json({error: "Can't get courses"})
  }
  
});

module.exports = router;
