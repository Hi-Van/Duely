import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { ScrollArea } from "./scroll-area";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Progress } from "./progress";
import { Checkbox } from "./checkbox";
import { Separator } from "./separator";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Task {
  id: string;
  name: string;
  workspace: string;
  dueDate: string;
  done: boolean;
  subTasks: SubTask[];
  steps: number;
}

export interface SubTask {
  id: string;
  name: string;
  done: boolean;
}

export default function DragNDropList({
  tasks,
  setTasks,
  setCurrentEditableTask,
}: {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  setCurrentEditableTask: (index: string | null) => void;
}) {
  const handleDragEnd = (result: any) => {
    // handle drag end logic here
    const copiedTasks = [...tasks];

    const [reorderedTasks] = copiedTasks.splice(result.source.index, 1);
    copiedTasks.splice(result.destination?.index ?? 0, 0, reorderedTasks);

    setTasks(copiedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ScrollArea className="w-full h-full overflow-y-auto rounded-md border p-8 mb-8">
            <ul
              className="w-full flex flex-col space-y-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, idx) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={idx}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
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
                                        const copiedTasks = [...tasks];
                                        copiedTasks[idx].done =
                                          !copiedTasks[idx].done;
                                        setTasks(copiedTasks);
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
                                              const copiedTasks = [...tasks];
                                              copiedTasks[idx].subTasks[
                                                jdx
                                              ].done =
                                                !copiedTasks[idx].subTasks[jdx]
                                                  .done;
                                              setTasks(copiedTasks);
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
                                <Progress
                                  value={
                                    ([task, ...task.subTasks].filter(
                                      (t) => t.done
                                    ).length /
                                      task.steps) *
                                    100
                                  }
                                  className="w-full"
                                />
                              </CardFooter>
                            </div>
                          </div>
                        </Card>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          </ScrollArea>
        )}
      </Droppable>
    </DragDropContext>
  );
}
