const router = require("express").Router();
const Test = require("../db/models/test");
const Student = require("../db/models/student");

router.get("/", async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.send(tests);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const testId = req.params.id;
    const testByPk = await Test.findByPk(testId);
    res.send(testByPk);
  } catch (err) {
    next(err);
  }
});
//sequelize will make associations between two tables for you when you use the .belongsTo, .hasMany, etc.
router.post("/student/:studentId", async (req, res, next) => {
  try {
    // METHOD 1:
    const student = await Student.findById(req.params.studentId);
    const test = await Test.create(req.body);
    const studentTest = await test.setStudent(student);

    //METHOD 2:
    // const student = await Student.findById(req.params.studentId);
    // const test = await Test.create(req.body);
    // await test.update({ studentId: Number(req.params.studentId) });

    // METHOD 3:
    // const { subject, grade } = req.body;
    // const studentPk = req.params.studentId;
    // const studentTest = await Test.create({ subject, grade, studentPk });
    res.status(201).send(studentTest);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Test.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
