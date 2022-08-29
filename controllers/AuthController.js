const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        email: email,
      });

      if (user) {
        const checkPassword = bcrypt.compareSync(password, user.password);

        console.log(checkPassword);

        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                phone_number: user.phone_number,
                wishlists: user.wishlists,
              },
            },
            "SECRET"
          );

          res.status(200).send({
            status: "success",
            data: { token },
          });
        } else {
          res.status(401).send({
            status: "fail",
            message: "Password yang anda masukkan salah",
          });
        }
      } else {
        res.status(401).send({
          status: "fail",
          message: "User tidak terdaftar",
        });
      }
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: err.message,
      });
    }
  },
};
