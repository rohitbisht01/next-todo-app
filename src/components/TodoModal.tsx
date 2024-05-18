"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "@/lib/constants";

interface TodoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  todo: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
  };
}

export default function TodoModal({ open, setOpen, todo }: TodoModalProps) {
  const cancelButtonRef = useRef(null);
  const queryClient = useQueryClient();

  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description);
  const [isCompleted, setIsCompleted] = useState<boolean>(todo.completed);

  const taskMutatation = useMutation({
    mutationFn: async (todoId: string) => {
      const response = await axios.patch(`${BASE_API_URL}api/todo/${todoId}`, {
        title,
        description,
        completed: isCompleted,
      });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo-list"],
      });
      setOpen(false);
    },
    onError: () => {
      console.log("error updating todo");
    },
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="font-semibold leading-6 text-gray-900 text-xl"
                      >
                        Update Your Task
                      </Dialog.Title>
                      <div className="mt-5">
                        <div className="flex flex-col">
                          <div className="font-bold">Title</div>

                          <input
                            type="text"
                            className="border-black border-2 p-1 my-2 rounded-md w-[430px]"
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                          />
                        </div>

                        <div className="flex flex-col ">
                          <div className="font-bold">Description </div>

                          <textarea
                            className="border-black border-2 p-1 my-2 rounded-md w-[430px]"
                            value={description}
                            rows={10}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          />
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            checked={isCompleted}
                            onChange={() =>
                              setIsCompleted((prev: boolean) => !prev)
                            }
                          />
                          Mark as completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      taskMutatation.mutate(todo._id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
