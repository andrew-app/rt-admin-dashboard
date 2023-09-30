import { useQuery, useQueryClient, QueryKey } from '@tanstack/react-query'


export const useEventSourceQuery = (queryKey: QueryKey, url: string) => {
  const queryClient = useQueryClient()
  

  const fetchData = () => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      queryClient.setQueryData(queryKey, event.data)
    }
  }

  return useQuery({
    queryKey: queryKey, 
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}