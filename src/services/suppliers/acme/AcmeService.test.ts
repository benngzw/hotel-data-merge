import axios from "axios";
import { acmeServiceHelpers, fetchData, ACME_URL } from "./AcmeService";
import { jest } from "@jest/globals";
import {
  acmeHotelsMock,
  expectedParsedAcmeHotels,
} from "./AcmeService.fixture";

jest.mock("axios");

describe("AcmeService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchData", () => {
    const downloadDataSpy = jest.spyOn(acmeServiceHelpers, "downloadData");
    const parseDataSpy = jest.spyOn(acmeServiceHelpers, "parseData");

    beforeEach(async () => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      downloadDataSpy.mockRestore();
      parseDataSpy.mockRestore();
    });

    it("should fetch and parse data correctly", async () => {
      downloadDataSpy.mockResolvedValue(acmeHotelsMock);
      parseDataSpy.mockReturnValue(expectedParsedAcmeHotels);

      const result = await fetchData();

      expect(downloadDataSpy).toHaveBeenCalledTimes(1);
      expect(parseDataSpy).toHaveBeenCalledWith(acmeHotelsMock);
      expect(result).toEqual(expectedParsedAcmeHotels);
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
      it("should download data successfully", async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
          data: acmeHotelsMock,
        });

        const result = await acmeServiceHelpers.downloadData();

        expect(axios.get).toHaveBeenCalledWith(ACME_URL);
        expect(result).toEqual(acmeHotelsMock);
      });

      it("should return null if download fails", async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
          new Error("Network Error")
        );

        const result = await acmeServiceHelpers.downloadData();

        expect(axios.get).toHaveBeenCalledWith(ACME_URL);
        expect(result).toBeNull();
      });
    });

    describe("parseData", () => {
      it("should parse data correctly", () => {
        const result = acmeServiceHelpers.parseData(acmeHotelsMock);

        expect(result).toEqual(expectedParsedAcmeHotels);
      });

      it("should handle empty input", () => {
        const result = acmeServiceHelpers.parseData([]);

        expect(result).toEqual([]);
      });
    });
  });
});
