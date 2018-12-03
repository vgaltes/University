const when = require("../steps/when");

describe(`When we invoke the GET /masters endpoint`, () => {
  process.env.TEST_MODE = "handler";

  test(`Should return an array of 8 masters`, async () => {
    const res = await when.we_invoke_get_masters();

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.lengthOf(8);

    for (let i = 0; i < res.body.length; i += 1) {
      const master = res.body[i];
      expect(master).to.have.property("name");
      expect(master).to.have.property("image");
    }
  });
});
