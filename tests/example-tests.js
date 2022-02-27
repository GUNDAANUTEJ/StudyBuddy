//This is example testing using Mocha framework as we are working on backend.

var assert = require("assert");

describe("BasicTest", function () {
  describe("Multiplication", function () {
    it("should equal 15 and 5 is multiplied by 3", function () {
      var result = 5 * 3;
      assert.equal(result, 15);
    });
  });
  describe("Divide", function () {
    it("should not equal 2 when 15 is divided by 5", function () {
      var value = 4;
      var result = 15 / 5;
      assert.notEqual(result, value);
    });
  });
});