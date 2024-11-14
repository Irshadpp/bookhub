import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchBooks = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/book`, { params: { page, limit } });
  return response.data;
};

export const searchBooks = async (query: string) => {
  const response = await axios.get(`${API_URL}/book/search`, { params: { query } });
  return response.data;
};

export const createBook = async (bookData: any) => {
  try {
    const response = await axios.post(`${API_URL}/book`, bookData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.errors[0] || "Failed to create the book.");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("Error creating the book. Please try again.");
    }
  }
};

export const fetchBookDetails = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/book/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.errors[0] || "Failed to create the book.");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("Error creating the book. Please try again.");
    }
  }
};

export const updateBook = async (bookId: string, updatedData: any) => {
  try {
  const response = await axios.patch(`${API_URL}/book/${bookId}`, updatedData);
  return response.data;
} catch (error: any) {
  if (error.response) {
    throw new Error(error.response.data.errors[0] || "Failed to update the book.");
  } else if (error.request) {
    throw new Error("No response from server. Please try again later.");
  } else {
    throw new Error("Error update the book. Please try again.");
  }
}
};

export const deleteBook = async (bookId: string) => {
  const response = await axios.delete(`${API_URL}/book/${bookId}`);
  return response.data;
};
