const router = require("express").Router();
const Student = require("../db/models/student");

//res.send = sends whatever you put as the argument
//res.json = sends as javascript object notation
//await is used because you want to wait for the server to respond before sending.
router.get("/", async (req, res, next) => {
  try {
    const student = await Student.findAll(); //student model
    res.json(student);
  } catch (error) {
    next(error);
  }
});

//findbyId has been replaced by findbyPk
router.get("/:id", async (req, res, next) => {
  try {
    // const id = Number(req.params.id);
    const studentByPk = await Student.findByPk(req.params.id);
    if (studentByPk === null) res.sendStatus(404).send("Student not found");
    else res.send(studentByPk);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body); //.create is looking for an obj, with all the attributes in that instance. req.body itself is an object with first name, last name, email, etc.
    res.status(201).send(newStudent);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    // const student = await Student.findByPk(req.params.id);
    const [numOfStudents, updatedStudent] = await Student.update(req.body, {
      //when using .update
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    });
    res.send(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(204).send("you destrooyed that student!");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
