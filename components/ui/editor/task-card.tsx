import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import { Task } from "./drag-n-drop-list";
import { Checkbox } from "../checkbox";
import { Progress } from "../progress";
import { Separator } from "../separator";
// ... other necessary imports

interface TaskCardProps {
  task: Task;
  idx: number;
  updateTask: (idx: number, task: Task) => void;
  setCurrentEditableTask: (index: string | null) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  idx,
  updateTask,
  setCurrentEditableTask,
}) => {
  const handleCheckedChange = (done: boolean, subTaskIdx?: number) => {
    const updatedTask = { ...task };
    if (subTaskIdx !== undefined) {
      updatedTask.subTasks[subTaskIdx].done = done;
    } else {
      updatedTask.done = done;
    }
    updateTask(idx, updatedTask);
  };

  const progressValue =
    ([task, ...task.subTasks].filter((t) => t.done).length / task.steps) * 100;

  return (
    <Card className="rounded-md">
      <div className="w-full flex items-center p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={null}
                className="m-0 p-0 w-fit h-fit"
                onClick={() => {
                  setCurrentEditableTask(task.id);
                }}
                asChild
              >
                <DragHandleDots2Icon className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hold and drag to reorder.</p>
              <p>Click to edit.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex-grow">
          <CardHeader className="p-2">
            <CardTitle>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={task.id}
                  checked={task.done}
                  onCheckedChange={() => {
                    handleCheckedChange(!task.done);
                  }}
                />
                <label
                  htmlFor={task.id}
                  className="text-xl font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {task.name}
                </label>
              </div>
            </CardTitle>
            <CardDescription>
              {task.dueDate} - {task.workspace}
            </CardDescription>
            {task.subTasks.length > 0 && <Separator />}
          </CardHeader>

          {task.subTasks.length > 0 && (
            <CardContent>
              <ul className="ml-4 mt-2 divide-y divide-dashed">
                {task.subTasks.map((subTask, jdx) => {
                  return (
                    <li
                      key={subTask.id}
                      className="flex items-center space-x-2 py-3"
                    >
                      <Checkbox
                        id={subTask.id}
                        checked={subTask.done}
                        onCheckedChange={() => {
                          handleCheckedChange(!subTask.done, jdx);
                        }}
                      />
                      <label
                        htmlFor={subTask.id}
                        className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {subTask.name}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          )}

          <CardFooter className="p-2">
            <Progress value={progressValue} className="w-full" />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};
