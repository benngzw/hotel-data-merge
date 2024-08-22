import axios from "axios";
import {
  fetchData,
  paperFliesServiceHelpers,
  PAPERFLIES_URL,
} from "./PaperFliesService";
import { jest } from "@jest/globals";
import {
  paperFliesHotelsMock,
  expectedParsedPaperFliesHotels,
} from "./PaperFliesService.fixture";

jest.mock("axios");

describe("PaperFliesService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchData", () => {
    const downloadDataSpy = jest.spyOn(
      paperFliesServiceHelpers,
      "downloadData"
    );
    const parseDataSpy = jest.spyOn(paperFliesServiceHelpers, "parseData");

    beforeEach(async () => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      downloadDataSpy.mockRestore();
      parseDataSpy.mockRestore();
    });

    it("should fetch and parse data correctly", async () => {
      downloadDataSpy.mockResolvedValue(paperFliesHotelsMock);
      parseDataSpy.mockReturnValue(expectedParsedPaperFliesHotels);

      const result = await fetchData();

      expect(downloadDataSpy).toHaveBeenCalledTimes(1);
      expect(parseDataSpy).toHaveBeenCalledWith(paperFliesHotelsMock);
      expect(result).toEqual(expectedParsedPaperFliesHotels);
    });

    it("should return null if data fetch fails", async () => {
      downloadDataSpy.mockResolvedValue(null);
      parseDataSpy.mockReturnValue([]);

      const result = await fetchData();

      expect(downloadDataSpy).toHaveBeenCalledTimes(1);
      expect(parseDataSpy).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe("helpers", () => {
    describe("downloadData", () => {
      it("should download data correctly", async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
          data: paperFliesHotelsMock,
        });

        const data = await paperFliesServiceHelpers.downloadData();

        expect(axios.get).toHaveBeenCalledWith(PAPERFLIES_URL);
        expect(data).toEqual(paperFliesHotelsMock);
      });

      it("should return null if data fetch fails", async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
          new Error("Network Error")
        );

        const data = await paperFliesServiceHelpers.downloadData();

        expect(axios.get).toHaveBeenCalledWith(PAPERFLIES_URL);
        expect(data).toBeNull();
      });
    });

    describe("parseData", () => {
      it("should parse data correctly", () => {
        const result = paperFliesServiceHelpers.parseData(paperFliesHotelsMock);

        expect(result).toEqual(expectedParsedPaperFliesHotels);
      });

      it("should handle empty input", () => {
        const result = paperFliesServiceHelpers.parseData([]);

        expect(result).toEqual([]);
      });
    });
  });
});
