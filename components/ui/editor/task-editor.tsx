import { useEffect, useRef } from "react";
import { SubTask, Task } from "./drag-n-drop-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { ScrollArea } from "../scroll-area";
import { DatePicker } from "../date-picker";
import { Button } from "../button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Label } from "../label";
import { Input } from "../input";
import { format } from "date-fns";

interface TaskEditorProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  currentEditableTask: string | null;
  setCurrentEditableTask: (index: string | null) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  stepInputValue: string;
  setStepInputValue: (value: string) => void;
}

export const TaskEditor: React.FC<TaskEditorProps> = ({
  tasks,
  setTasks,
  currentEditableTask,
  setCurrentEditableTask,
  date,
  setDate,
  stepInputValue,
  setStepInputValue,
}) => {
  const currentTask = tasks.find((task) => task.id === currentEditableTask);
  const stepInputRef = useRef<HTMLInputElement>(null);
  const taskNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    stepInputRef.current?.focus();
  }, [stepInputValue]);

  useEffect(() => {
    taskNameRef.current?.focus();
  }, [tasks.find((task) => task.id === currentEditableTask)?.name]);

  if (!currentTask) {
    return null;
  }

  const updateTask = (taskUpdate: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === currentTask.id ? { ...task, ...taskUpdate } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setCurrentEditableTask(null);
  };

  const updateSubTask = (jdx: number, subTaskUpdate: Partial<SubTask>) => {
    setTasks(
      tasks.map((task) =>
        task.id === currentTask.id
          ? {
              ...task,
              subTasks: task.subTasks.map((subTask, index) =>
                index === jdx ? { ...subTask, ...subTaskUpdate } : subTask
              ),
            }
          : task
      )
    );
  };

  const deleteSubTask = (jdx: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === currentTask.id
          ? {
              ...task,
              subTasks: task.subTasks.filter((_, index) => index !== jdx),
            }
          : task
      )
    );
  };

  return (
    <ScrollArea className="rounded-md border w-full h-full p-4">
      <div className="m-4">
        <div className="w-full space-y-2">
          <Label>Task Name</Label>
          <Input
            ref={taskNameRef}
            type="text"
            value={currentTask.name}
            onChange={(e) => updateTask({ name: e.target.value })}
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
                          updateSubTask(jdx, { done: !subTask.done });
                        }}
                      >
                        {currentTask.subTasks[jdx].done
                          ? "Mark as not done"
                          : "Mark as done"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          deleteSubTask(jdx);
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
              updateTask({ dueDate: format(newDate, "yyyy-MM-dd") });
            }}
          />
        </div>

        <Button
          className="w-full"
          onClick={() => {
            deleteTask(currentTask.id);
          }}
        >
          Delete Task
        </Button>
      </div>
    </ScrollArea>
  );
};
