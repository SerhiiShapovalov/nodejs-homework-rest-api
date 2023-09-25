const jwt = require("jsonwebtoken");
const { User } = require("./models/user");
const AuthController = require("./controllers/auth-controller");

jest.mock("jsonwebtoken");
jest.mock("./models/user");

describe("AuthController signup", () => {
  it("should return status code 200 and a token", async () => {
    const registrationData = {
      email: "test@example.com",
      password: "testpassword",
      subscription: "starter",
    };

    const req = {
      body: registrationData,
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    User.create.mockResolvedValue({
      email: registrationData.email,
      subscription: registrationData.subscription,
      //   avatarUrl: "mockedavatarurl",
    });

    jwt.sign.mockReturnValue("mockedtoken");

    // Вызов тестируемой функции контроллера
    await AuthController.register(req, res);

    // Проверки
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status(200).json).toHaveBeenCalledWith({
      //   avatarUrl: undefined,
      email: registrationData.email,
      subscription: registrationData.subscription,
    });
  });
});
