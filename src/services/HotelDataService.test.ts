import { Image } from "../interfaces";
import * as DatabaseService from "./DatabaseService";
import { hotelDataHelpers, updateHotelsData } from "./HotelDataService";
import { PatagoniaService, PaperFliesService, AcmeService } from "./suppliers";
import { expectedMergedHotels } from "./HotelDataService.fixture";
import { expectedParsedAcmeHotels } from "./suppliers/acme/AcmeService.fixture";
import { expectedParsedPaperFliesHotels } from "./suppliers/paperFlies/PaperFliesService.fixture";
import { expectedParsedPatagoniaHotels } from "./suppliers/patagonia/PatagoniaService.fixture";

describe("HotelDataService", () => {
  describe("updateHotelsData", () => {
    const downloadHotelDataSpy = jest.spyOn(
      hotelDataHelpers,
      "downloadHotelData"
    );
    const mergeHotelDataSpy = jest.spyOn(hotelDataHelpers, "mergeHotelData");
    const addHotelBatchSpy = jest.spyOn(DatabaseService, "addHotelsBatch");

    beforeEach(async () => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      downloadHotelDataSpy.mockRestore();
      mergeHotelDataSpy.mockRestore();
      addHotelBatchSpy.mockRestore();
    });

    it("should call downloadHotelData, mergeHotelData and addHotelsBatch", async () => {
      downloadHotelDataSpy.mockResolvedValue([
        ...expectedParsedAcmeHotels,
        ...expectedParsedPaperFliesHotels,
        ...expectedParsedPatagoniaHotels,
      ]);
      mergeHotelDataSpy.mockReturnValue(expectedMergedHotels);
      addHotelBatchSpy.mockResolvedValue();

      await updateHotelsData();

      expect(downloadHotelDataSpy).toHaveBeenCalledTimes(1);
      expect(mergeHotelDataSpy).toHaveBeenCalledWith([
        ...expectedParsedAcmeHotels,
        ...expectedParsedPaperFliesHotels,
        ...expectedParsedPatagoniaHotels,
      ]);
      expect(addHotelBatchSpy).toHaveBeenCalledWith(expectedMergedHotels);
    });
  });

  describe("hotelDataHelpers", () => {
    describe("downloadHotelData", () => {
      let acmeFetchDataSpy = jest.spyOn(AcmeService, "fetchData");
      let paperFliesFetchDataSpy = jest.spyOn(PaperFliesService, "fetchData");
      let patagoniaFetchDataSpy = jest.spyOn(PatagoniaService, "fetchData");

      beforeEach(() => {
        jest.resetAllMocks();
      });

      afterAll(() => {
        acmeFetchDataSpy.mockRestore();
        paperFliesFetchDataSpy.mockRestore();
        patagoniaFetchDataSpy.mockRestore();
      });

      it("should fetch hotel data from all providers and return a combined list", async () => {
        acmeFetchDataSpy.mockResolvedValue(expectedParsedAcmeHotels);
        paperFliesFetchDataSpy.mockResolvedValue(
          expectedParsedPaperFliesHotels
        );
        patagoniaFetchDataSpy.mockResolvedValue(expectedParsedPatagoniaHotels);

        const result = await hotelDataHelpers.downloadHotelData();

        expect(acmeFetchDataSpy).toHaveBeenCalledTimes(1);
        expect(paperFliesFetchDataSpy).toHaveBeenCalledTimes(1);
        expect(patagoniaFetchDataSpy).toHaveBeenCalledTimes(1);

        expect(result).toEqual([
          ...expectedParsedAcmeHotels,
          ...expectedParsedPaperFliesHotels,
          ...expectedParsedPatagoniaHotels,
        ]);
      });

      it("should handle cases where some providers return null or undefined", async () => {
        acmeFetchDataSpy.mockResolvedValue(expectedParsedAcmeHotels);
        paperFliesFetchDataSpy.mockResolvedValue(null);
        patagoniaFetchDataSpy.mockResolvedValue(null);

        const result = await hotelDataHelpers.downloadHotelData();

        expect(acmeFetchDataSpy).toHaveBeenCalledTimes(1);
        expect(paperFliesFetchDataSpy).toHaveBeenCalledTimes(3);
        expect(patagoniaFetchDataSpy).toHaveBeenCalledTimes(3);
        expect(result).toEqual(expectedParsedAcmeHotels);
      });

      it("should handle cases where all providers return null or undefined", async () => {
        acmeFetchDataSpy.mockResolvedValue(null);
        paperFliesFetchDataSpy.mockResolvedValue(null);
        patagoniaFetchDataSpy.mockResolvedValue(null);

        const result = await hotelDataHelpers.downloadHotelData();

        expect(acmeFetchDataSpy).toHaveBeenCalledTimes(3);
        expect(paperFliesFetchDataSpy).toHaveBeenCalledTimes(3);
        expect(patagoniaFetchDataSpy).toHaveBeenCalledTimes(3);
        expect(result).toEqual([]);
      });
    });

    describe("fetchDataWithRetry", () => {
      it("should return data if fetchFunction returns data on the first attempt", async () => {
        const mockFetchFunction = jest
          .fn()
          .mockResolvedValue(expectedParsedAcmeHotels);
        const result = await hotelDataHelpers.fetchDataWithRetry(
          mockFetchFunction,
          3
        );
        expect(result).toEqual(expectedParsedAcmeHotels);
        expect(mockFetchFunction).toHaveBeenCalledTimes(1);
      });

      it("should retry if fetchFunction returns null and eventually return data", async () => {
        const mockFetchFunction = jest
          .fn()
          .mockResolvedValueOnce(null)
          .mockResolvedValueOnce(expectedParsedAcmeHotels);
        const result = await hotelDataHelpers.fetchDataWithRetry(
          mockFetchFunction,
          3
        );
        expect(result).toEqual(expectedParsedAcmeHotels);
        expect(mockFetchFunction).toHaveBeenCalledTimes(2);
      });

      it("should retry the specified number of times and return an empty array if fetchFunction always returns null", async () => {
        const mockFetchFunction = jest.fn().mockResolvedValue(null);
        const result = await hotelDataHelpers.fetchDataWithRetry(
          mockFetchFunction,
          3
        );
        expect(result).toEqual([]);
        expect(mockFetchFunction).toHaveBeenCalledTimes(3);
      });
    });

    describe("mergeHotelData", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it("should merge hotel data correctly", () => {
        const result = hotelDataHelpers.mergeHotelData([
          ...expectedParsedAcmeHotels,
          ...expectedParsedPaperFliesHotels,
          ...expectedParsedPatagoniaHotels,
        ]);

        expect(result).toEqual(expectedMergedHotels);
      });

      it("should return an empty array if input is empty", () => {
        const result = hotelDataHelpers.mergeHotelData([]);
        expect(result).toEqual([]);
      });
    });

    describe("mergeAmenities", () => {
      it("should merge two arrays of amenities without duplicates", () => {
        const result = hotelDataHelpers.mergeAmenities(
          ["WiFi", "Pool"],
          ["Pool", "Gym"]
        );

        expect(result).toEqual(["WiFi", "Pool", "Gym"]);
      });

      it("should return an empty array if both inputs are empty", () => {
        const result = hotelDataHelpers.mergeAmenities([], []);

        expect(result).toEqual([]);
      });

      it("should return the first array if the second is empty", () => {
        const result = hotelDataHelpers.mergeAmenities(["WiFi", "Pool"], []);

        expect(result).toEqual(["WiFi", "Pool"]);
      });

      it("should return the second array if the first is empty", () => {
        const result = hotelDataHelpers.mergeAmenities([], ["Pool", "Gym"]);

        expect(result).toEqual(["Pool", "Gym"]);
      });
    });

    describe("mergeImages", () => {
      it("should merge two arrays of images without duplicates based on link", () => {
        const firstImages: Image[] = [
          { link: "https://test.com/1.jpg", description: "Image 1" },
          { link: "https://test.com/2.jpg", description: "Image 2" },
        ];
        const secondImages: Image[] = [
          { link: "https://test.com/2.jpg", description: "Image 2" },
          { link: "https://test.com/3.jpg", description: "Image 3" },
        ];
        const result = hotelDataHelpers.mergeImages(firstImages, secondImages);

        expect(result).toEqual([
          { link: "https://test.com/1.jpg", description: "Image 1" },
          { link: "https://test.com/2.jpg", description: "Image 2" },
          { link: "https://test.com/3.jpg", description: "Image 3" },
        ]);
      });

      it("should return an empty array if both inputs are empty", () => {
        const result = hotelDataHelpers.mergeImages([], []);

        expect(result).toEqual([]);
      });

      it("should return the first array if the second is empty", () => {
        const firstImages: Image[] = [
          { link: "https://test.com/1.jpg", description: "Image 1" },
          { link: "https://test.com/2.jpg", description: "Image 2" },
        ];
        const result = hotelDataHelpers.mergeImages(firstImages, []);

        expect(result).toEqual(firstImages);
      });

      it("should return the second array if the first is empty", () => {
        const secondImages: Image[] = [
          { link: "https://test.com/2.jpg", description: "Image 2" },
          { link: "https://test.com/3.jpg", description: "Image 3" },
        ];
        const result = hotelDataHelpers.mergeImages([], secondImages);

        expect(result).toEqual(secondImages);
      });
    });

    describe("mergeBookingConditions", () => {
      it("should merge two arrays of booking conditions without duplicates", () => {
        const firstBookingConditions = ["Condition 1", "Condition 2"];
        const secondBookingConditions = ["Condition 2", "Condition 3"];
        const result = hotelDataHelpers.mergeBookingConditions(
          firstBookingConditions,
          secondBookingConditions
        );

        expect(result).toEqual(["Condition 1", "Condition 2", "Condition 3"]);
      });

      it("should return an empty array if both inputs are empty", () => {
        const result = hotelDataHelpers.mergeBookingConditions([], []);

        expect(result).toEqual([]);
      });

      it("should return the first array if the second is empty", () => {
        const firstBookingConditions = ["Condition 1", "Condition 2"];
        const result = hotelDataHelpers.mergeBookingConditions(
          firstBookingConditions,
          []
        );

        expect(result).toEqual(firstBookingConditions);
      });

      it("should return the second array if the first is empty", () => {
        const secondBookingConditions = ["Condition 2", "Condition 3"];
        const result = hotelDataHelpers.mergeBookingConditions(
          [],
          secondBookingConditions
        );
        expect(result).toEqual(secondBookingConditions);
      });
    });
  });
});
