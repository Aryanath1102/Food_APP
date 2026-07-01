const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "test user API",
    });
  } catch (err) {
    console.log("error in Test API", err);
  }
};

module.exports = { testUserController };
