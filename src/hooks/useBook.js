import { useQuery } from "@tanstack/react-query";
import { getBook } from "../api/booksApi";

export const useBook = (bookId) => {
  return useQuery({
    queryKey: ["book", bookId],

    queryFn: async () => {
      const { data } = await getBook(bookId);
      return data;
    },

    enabled: !!bookId,

    staleTime: 1000 * 60 * 5,

    retry: 1,
  });
};