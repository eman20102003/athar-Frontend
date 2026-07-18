import { useQuery } from "@tanstack/react-query";
import { getBook } from "../api/booksApi";

export const useBook = (id) => useQuery({
  queryKey: ["book", id],
  queryFn: () => getBook(id).then((res) => res.data.book),
  enabled: !!id,
});