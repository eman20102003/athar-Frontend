import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/booksApi";

export const useBooks = (filters = {}) => {
  return useQuery({
    queryKey: ["books", filters],

    queryFn: async () => {
      const { data } = await getBooks(filters);
      return data;
    },

    staleTime: 1000 * 60 * 5, // 5 دقائق
    retry: 1,
  });
};