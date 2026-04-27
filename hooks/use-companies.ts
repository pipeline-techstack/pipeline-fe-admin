import { getAllCompanies } from "@/services/sender-apis";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanies = ({
  search = "",
}: {
  search?: string;

} = {}) => {
  const companiesQuery = useQuery({
    queryKey: ["companies", search],
    queryFn: () => getAllCompanies(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
   return { companiesQuery };
}

