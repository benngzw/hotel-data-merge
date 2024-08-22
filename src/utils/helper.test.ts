import { trimValue, convertLatitude, convertLongitude } from "./helper";

describe("Helper Functions", () => {
  describe("trimValue", () => {
    test("should return null for null input", () => {
      expect(trimValue(null)).toBeNull();
    });

    test("should return null for undefined input", () => {
      expect(trimValue(undefined)).toBeNull();
    });

    test("should return empty string for empty string input", () => {
      expect(trimValue("")).toBe("");
    });

    test("should return trimmed string for string with leading and trailing spaces", () => {
      expect(trimValue("  hello  ")).toBe("hello");
    });

    test("should return the same string if there are no leading or trailing spaces", () => {
      expect(trimValue("hello")).toBe("hello");
    });

    test("should return trimmed string for string with only spaces", () => {
      expect(trimValue("   ")).toBe("");
    });
  });

  describe("convertLatitude", () => {
    test("should return null for null input", () => {
      expect(convertLatitude(null)).toBeNull();
    });

    test("should return null for undefined input", () => {
      expect(convertLatitude(undefined)).toBeNull();
    });

    test("should return the number if input is a valid number within range", () => {
      expect(convertLatitude(45)).toBe(45);
      expect(convertLatitude(-45)).toBe(-45);
      expect(convertLatitude(90)).toBe(90);
      expect(convertLatitude(-90)).toBe(-90);
    });

    test("should return the number if input is a valid string number within range", () => {
      expect(convertLatitude("45")).toBe(45);
      expect(convertLatitude("-45")).toBe(-45);
      expect(convertLatitude("90")).toBe(90);
      expect(convertLatitude("-90")).toBe(-90);
    });

    test("should return null for invalid number strings", () => {
      expect(convertLatitude("100")).toBeNull();
      expect(convertLatitude("-100")).toBeNull();
    });

    test("should return null for invalid non-number strings", () => {
      expect(convertLatitude("abc")).toBeNull();
      expect(convertLatitude("N45")).toBeNull();
    });

    test("should return null for numbers out of range", () => {
      expect(convertLatitude(100)).toBeNull();
      expect(convertLatitude(-100)).toBeNull();
    });

    test("should return null for string numbers out of range", () => {
      expect(convertLatitude("100")).toBeNull();
      expect(convertLatitude("-100")).toBeNull();
    });
  });

  describe("convertLongitude", () => {
    test("should return null for null input", () => {
      expect(convertLongitude(null)).toBeNull();
    });

    test("should return null for undefined input", () => {
      expect(convertLongitude(undefined)).toBeNull();
    });

    test("should return the number if input is a valid number within range", () => {
      expect(convertLongitude(45)).toBe(45);
      expect(convertLongitude(-45)).toBe(-45);
      expect(convertLongitude(180)).toBe(180);
      expect(convertLongitude(-180)).toBe(-180);
    });

    test("should return the number if input is a valid string number within range", () => {
      expect(convertLongitude("45")).toBe(45);
      expect(convertLongitude("-45")).toBe(-45);
      expect(convertLongitude("180")).toBe(180);
      expect(convertLongitude("-180")).toBe(-180);
    });

    test("should return null for invalid number strings", () => {
      expect(convertLongitude("200")).toBeNull();
      expect(convertLongitude("-200")).toBeNull();
    });

    test("should return null for invalid non-number strings", () => {
      expect(convertLongitude("abc")).toBeNull();
      expect(convertLongitude("E45")).toBeNull();
    });

    test("should return null for numbers out of range", () => {
      expect(convertLongitude(200)).toBeNull();
      expect(convertLongitude(-200)).toBeNull();
    });

    test("should return null for string numbers out of range", () => {
      expect(convertLongitude("200")).toBeNull();
      expect(convertLongitude("-200")).toBeNull();
    });
  });
});
