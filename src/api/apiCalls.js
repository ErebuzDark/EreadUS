import api from "../lib/axios";

export const getGenre = async () => {
  try {
    const response = await api.get(`/genre`);
    return response;
  } catch (error) {
    console.error("Failed to fetch manga list:", error);
    throw error;
  }
};

export const getMangaList = async (page = 1) => {
  try {
    const response = await api.get(`/manga-list/${page}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch manga list:", error);
    throw error;
  }
};

export const getCategorizedManga = async (category, page = 1) => {
  try {
    const response = await api.get(`/genre/${category}/${page}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch manga list:", error);
    throw error;
  }
};

export const getMangaDetails = async (id) => {
  try {
    const response = await api.get(`/manga/${id}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch manga details:", error);
    throw error;
  }
};

export const getMangaChapter = async (id, chapter) => {
  try {
    const response = await api.get(`/manga/${id}/${chapter}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch manga chapter:", error);
    throw error;
  }
};

export const searchManga = async (query) => {
  try {
    const response = await api.get(`/search/${query}`);
    return response;
  } catch (error) {
    console.error("Failed to search manga:", error);
    throw error;
  }
};
