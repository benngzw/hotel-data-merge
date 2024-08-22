import axios from "axios";
import {
  fetchData,
  patagoniaServiceHelpers,
  PATAGONIA_URL,
} from "./PatagoniaService";
import {
  patagoniaHotelsMock,
  expectedParsedPatagoniaHotels,
} from "./PatagoniaService.fixture";

jest.mock("axios");

describe("PatagoniaService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchData", () => {
    const downloadDataSpy = jest.spyOn(patagoniaServiceHelpers, "downloadData");
    const parseDataSpy = jest.spyOn(patagoniaServiceHelpers, "parseData");

    beforeEach(async () => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      downloadDataSpy.mockRestore();
      parseDataSpy.mockRestore();
    });

    it("should download and parse data correctly", async () => {
      downloadDataSpy.mockResolvedValue(patagoniaHotelsMock);
      parseDataSpy.mockReturnValue(expectedParsedPatagoniaHotels);

      const data = await fetchData();

      expect(downloadDataSpy).toHaveBeenCalledTimes(1);
      expect(parseDataSpy).toHaveBeenCalledWith(patagoniaHotelsMock);
      expect(data).toEqual(expectedParsedPatagoniaHotels);
    });

    it("should return null if fetching fails", async () => {
      downloadDataSpy.mockResolvedValue(null);
      parseDataSpy.mockReturnValue([]);

      const data = await fetchData();

      expect(downloadDataSpy).toHaveBeenCalledTimes(1);
      expect(parseDataSpy).not.toHaveBeenCalled();
      expect(data).toBeNull();
    });
  });

  describe("downloadData", () => {
    it("should download data successfully", async () => {
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
        data: patagoniaHotelsMock,
      });

      const data = await patagoniaServiceHelpers.downloadData();

      expect(axios.get).toHaveBeenCalledWith(PATAGONIA_URL);
      expect(data).toEqual(patagoniaHotelsMock);
    });

    it("should return null if downloading of data fails", async () => {
      (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
        new Error("Network Error")
      );

      const data = await patagoniaServiceHelpers.downloadData();

      expect(axios.get).toHaveBeenCalledWith(PATAGONIA_URL);
      expect(data).toBeNull();
    });
  });

  describe("parseData", () => {
    it("should parse data correctly", () => {
      const parsedData = patagoniaServiceHelpers.parseData(patagoniaHotelsMock);

      expect(parsedData).toEqual(expectedParsedPatagoniaHotels);
    });

    it("should handle empty input", () => {
      const result = patagoniaServiceHelpers.parseData([]);

      expect(result).toEqual([]);
    });
  });
});
