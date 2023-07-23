import { createQueryKeyStore } from "@lukemorales/query-key-factory"; //https://tanstack.com/query/v4/docs/react/community/lukemorales-query-key-factory
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// Used on RSC / SSR pages where useState is unavailable
export const getServerQueryClient = cache(() => new QueryClient());

export const queryKeys = createQueryKeyStore({
  users: {
    list: () => ["all"],
    id: (userId: string) => [userId],
  },
  //   todos: {
  //     detail: (todoId: string) => [todoId],
  //     list: (filters: TodoFilters) => ({
  //       queryKey: [{ filters }],
  //       queryFn: (ctx) => api.getTodos({ filters, page: ctx.pageParam }),
  //     }),
  //   },
});
