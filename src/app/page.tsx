"use client";
import { queryKeys } from "@/db/query/tanstack-query";
import { User } from "@/db/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUser, deleteUser, getUsers } from "./actions";

export const revalidate = 0;

export default function Home() {
  const { data: usersData } = useQuery({
    queryKey: queryKeys.users.list().queryKey,
    queryFn: async () => getUsers(),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (props: Omit<User, "id">) => {
      await queryClient.cancelQueries(queryKeys.users.list());
      return addUser(props);
    },
    onSettled(data, error, variables, context) {
      console.log("data: ", data);
      console.log("error: ", error);
      console.log("variables: ", variables);
      console.log("context: ", context);
      queryClient.invalidateQueries(queryKeys.users.list());
      queryClient.refetchQueries();
    },
  });

  function onSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries()) as Omit<User, "id">;
    mutation.mutate(entries);
  }

  const deleteMutation = useMutation({
    mutationFn: async (userId: UserId) => {
      await queryClient.cancelQueries(queryKeys.users.list());
      return deleteUser(userId);
    },
    onSettled(data, error, variables, context) {
      console.log("data: ", data);
      console.log("error: ", error);
      console.log("variables: ", variables);
      console.log("context: ", context);
      queryClient.invalidateQueries(queryKeys.users.list());
      queryClient.refetchQueries();
    },
  });

  async function onDelete(userId: UserId) {
    await deleteMutation.mutateAsync(userId);
  }

  const easyTable = "border-1 flex w-full justify-center border";

  return (
    <>
      <div className="mt-20 flex flex-col items-center gap-4">
        <h1>Add User</h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <label>Name:</label>
            <input name="name" defaultValue="Buster" />

            <label>Age:</label>
            <input name="age" defaultValue="23" />

            <button type="submit">Add User</button>
          </div>
        </form>
        <div>
          {Array.isArray(usersData) && usersData.length > 0 && (
            <>
              <div className="grid grid-cols-4 justify-center">
                <div className={easyTable}>ID</div>
                <div className={easyTable}>NAME</div>
                <div className={easyTable}>AGE</div>
                <div className={easyTable}>&lt;DELETE&gt;</div>
              </div>
              {usersData.map((user) => {
                return (
                  <div className="grid grid-cols-4" key={user.id}>
                    <div className={easyTable}>{user.id}</div>
                    <div className={easyTable}>{user.name}</div>
                    <div className={easyTable}>{user.age}</div>
                    <div className={easyTable}>
                      <button onClick={() => onDelete(user.id)}>X</button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

type UserId = number;
