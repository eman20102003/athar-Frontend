import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/booksApi";

export const useBooks = (filters) => {
  return useQuery({
    queryKey: ["books", filters],
    queryFn: () => getBooks(filters).then((res) => res.data),
  });
};