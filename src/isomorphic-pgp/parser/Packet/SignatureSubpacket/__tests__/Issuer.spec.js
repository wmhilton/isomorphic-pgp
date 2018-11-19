import * as Issuer from "../Issuer.js";

let input = {
  issuer: "lgm4pZKLprk"
};

let output = {
  issuer: "lgm4pZKLprk",
  issuer_s: "9609b8a5928ba6b9"
};

describe("Issuer", () => {
  test("parse -> serialize", () => {
    let result = Issuer.parse(Issuer.serialize(input));
    expect(result).toEqual(output);
  });
});
