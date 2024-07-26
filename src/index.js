const express = require("express");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");
const UserService = require("./services/user-service");
const UserRepository = require("./repository/user-repository");
const app = express();

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);
  app.listen(3001, async () => {
    console.log(`Server started on Port ${PORT}`);

    // const userRepo = new UserRepository();

    // const user = await userRepo.getByEmail("bing@gmail.com");
    // console.log(user);
    // const newToken = service.createToken({ email: "bing@gmail.com", id: "9" });
    // console.log(newToken);

    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJpbmdAZ21haWwuY29tIiwiaWQiOiI5IiwiaWF0IjoxNzIxOTg1NTA5LCJleHAiOjE3MjI1OTAzMDl9.pIpUwlLTrRTc89U7GYYf88wzTvQ-acdOZC42nkWmZNU";
    // const response = service.verifyToken(token);
    // console.log(response);
  });
};

prepareAndStartServer();
