import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { ScrollArea } from "../scroll-area";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Progress } from "../progress";
import { Checkbox } from "../checkbox";
import { Separator } from "../separator";
import { Button } from "../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TaskCard } from "./task-card";

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

  const updateTask = (idx: number, task: Task) => {
    const copiedTasks = [...tasks];
    copiedTasks[idx] = task;
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
              {tasks.map((task, idx) => (
                <Draggable key={task.id} draggableId={task.id} index={idx}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard
                        task={task}
                        idx={idx}
                        updateTask={updateTask}
                        setCurrentEditableTask={setCurrentEditableTask}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          </ScrollArea>
        )}
      </Droppable>
    </DragDropContext>
  );
}
