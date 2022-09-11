const Grade = require("../models/Grade");
const fs = require("fs");
const { rootPath } = require("../config");

module.exports = {
  postGradeHandler: async (req, res) => {
    try {
      const { name, thumbnail = "" } = req.body;
      const file = req.file;

      if (file) {
        const newGrade = await Grade.create({
          name,
          thumbnail: file.filename,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new grade with thumbnail",
          data: newGrade,
          method: req.method,
        });
      } else {
        const newGrade = await Grade.create({
          name,
          thumbnail,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new grade",
          data: newGrade,
          method: req.method,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  },
  getAllGradeHandler: async (req, res) => {
    try {
      const grades = await Grade.find();

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get grades data",
        data: grades,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  },
  getGradeByIdHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const grade = await Grade.findById(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get selected grade data",
        data: grade,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  },
  putGradeHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const file = req.file;

      if (file) {
        const { thumbnail } = await Grade.findById(id, "thumbnail");

        if (thumbnail) {
          const currentThumbnailPath = `${rootPath}/public/uploads/grades/${thumbnail}`;

          if (fs.existsSync(currentThumbnailPath)) {
            fs.unlinkSync(currentThumbnailPath);
          }
        }

        await Grade.findByIdAndUpdate(id, { name, thumbnail: file.filename });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully update selected grade data with new thumbnail",
          method: req.method,
          data: {
            name,
            thumbnail: file.filename,
          },
        });
      } else {
        await Grade.findByIdAndUpdate(id, { name });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully update selected grade data",
          method: req.method,
          data: {
            name,
          },
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  },
  deleteGradeHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { thumbnail } = await Grade.findById(id, "thumbnail");

      if (thumbnail) {
        const currentThumbnailPath = `${rootPath}/public/uploads/grades/${thumbnail}`;

        if (fs.existsSync(currentThumbnailPath)) {
          fs.unlinkSync(currentThumbnailPath);
        }
      }

      await Grade.findByIdAndRemove(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully remove selected grade data",
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  },
};
