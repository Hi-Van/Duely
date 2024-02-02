"use client";

import { useEffect, useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Button } from "./button";
import { DotsVerticalIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Label } from "./label";
import { format } from "date-fns";
import DragNDropList from "./drag-n-drop-list";
import type { Task } from "./drag-n-drop-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ScrollArea } from "./scroll-area";
import { DatePicker } from "./date-picker";

export default function Editor() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [stepInputValue, setStepInputValue] = useState("");
  const [currentEditableTask, setCurrentEditableTask] = useState<string | null>(
    null
  );
  const [date, setDate] = useState();
  const stepInputRef = useRef<HTMLInputElement>(null);
  const taskNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    stepInputRef.current?.focus();
  }, [stepInputValue]);

  useEffect(() => {
    taskNameRef.current?.focus();
  }, [tasks.find((task) => task.id === currentEditableTask)?.name]);

  const TaskEditor = () => {
    const currentTask = tasks.find((task) => task.id === currentEditableTask);

    if (!currentTask) {
      return null;
    }

    return (
      <ScrollArea className="rounded-md border w-full h-full p-4">
        <div className="m-4">
          <div className="w-full space-y-2">
            <Label>Task Name</Label>
            <Input
              ref={taskNameRef}
              type="text"
              value={currentTask.name}
              onChange={(e) => {
                const copiedTasks = tasks.map((task) => {
                  const newTask = { ...task };
                  if (task.id === currentTask.id) {
                    newTask.name = e.target.value;
                  }
                  return newTask;
                });
                setTasks(copiedTasks);
              }}
            />
          </div>
          <div className="w-full space-y-2 my-8">
            <Label>Steps</Label>
            <ul className=" divide-y divide-dashed">
              {currentTask.subTasks.map((subTask, jdx) => {
                return (
                  <li
                    key={subTask.id}
                    className="flex items-center justify-between py-2"
                  >
                    <p className=" text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {subTask.name}
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="h-fit w-fit p-1" variant={null}>
                          <DotsVerticalIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            const copiedTasks = [...tasks];
                            currentTask.subTasks[jdx].done =
                              !currentTask.subTasks[jdx].done;
                            setTasks(copiedTasks);
                          }}
                        >
                          {currentTask.subTasks[jdx].done
                            ? "Mark as not done"
                            : "Mark as done"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            const copiedTasks = [...tasks];
                            currentTask.subTasks.splice(jdx, 1);
                            currentTask.steps -= 1;
                            setTasks(copiedTasks);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                );
              })}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const copiedTasks = [...tasks];
                currentTask.subTasks.push({
                  id: crypto.randomUUID(),
                  name: stepInputValue,
                  done: false,
                });
                currentTask.steps += 1;

                setStepInputValue("");
                setTasks(copiedTasks);
              }}
            >
              <Input
                type="text"
                placeholder="Add a step..."
                ref={stepInputRef}
                value={stepInputValue}
                onChange={(e) => setStepInputValue(e.target.value)}
              />
            </form>
          </div>
          <div className="w-full space-y-2 my-8">
            <Label>Due Date</Label> <br />
            <DatePicker
              date={date}
              setDate={(newDate: any) => {
                setDate(newDate);
                const copiedTasks = tasks.map((task) => {
                  const newTask = { ...task };
                  if (task.id === currentTask.id) {
                    newTask.dueDate = format(newDate, "PPP");
                  }
                  return newTask;
                });
                setTasks(copiedTasks);
              }}
            />
          </div>

          <Button
            className="w-full"
            onClick={() => {
              const copiedTasks = tasks.filter(
                (task) => task.id !== currentTask.id
              );
              setTasks(copiedTasks);
              setCurrentEditableTask(null);
            }}
          >
            Delete Task
          </Button>
        </div>
      </ScrollArea>
    );
  };
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full max-h-screen min-h-screen p-4 pt-16 rounded-lg border"
    >
      <ResizablePanel defaultSize={60} minSize={40}>
        <div className="flex w-full h-full flex-col items-center justify-between p-4">
          <DragNDropList
            tasks={tasks}
            setTasks={setTasks}
            setCurrentEditableTask={setCurrentEditableTask}
          />
          <form
            className="w-full min-w-xl flex space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              const date = new Date();

              const datestamp = date.toLocaleString(undefined, {
                dateStyle: "long",
                timeStyle: "short",
              });

              const newTask = {
                id: crypto.randomUUID(),
                name: inputValue,
                workspace: "Workspace",
                dueDate: datestamp,
                done: false,
                subTasks: [],
                steps: 1,
              };

              setTasks([...tasks, newTask]);
              setInputValue("");
            }}
          >
            <Input
              type="text"
              placeholder="Create new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button size="icon" type="submit">
              <Pencil2Icon className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40} minSize={24}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={28} minSize={28}>
            <div className="flex w-full h-full items-center justify-center p-4">
              <Calendar className="rounded-sm border shadow" />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={72} minSize={40}>
            <div className="flex w-full h-full items-center justify-center p-4">
              <TaskEditor />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
