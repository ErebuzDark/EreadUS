import api from "../lib/axios";

export const getMangaList = async (page = 1) => {
  try {
    const response = await api.get(`manga-list/${page}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch manga list:", error);
    throw error; // Optional: rethrow for caller to handle
  }
};
