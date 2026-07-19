import { useQuery } from "@tanstack/react-query";
import { getContinueReading } from "../api/libraryApi";
import { useAuth } from "../context/AuthContext";

export const useContinueReading = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["continue-reading"],
    queryFn: () => getContinueReading().then((res) => res.data.progress),
    enabled: !!user,
  });
};