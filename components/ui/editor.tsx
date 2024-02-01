"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Button } from "./button";
import { Pencil2Icon, DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Progress } from "./progress";
import { Checkbox } from "./checkbox";
import { Separator } from "./separator";
import { Label } from "./label";
import { ScrollArea } from "./scroll-area";

const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

export default function Editor() {
  const [tasks, setTasks] = useState(items);

  const handleDragEnd = (result: any) => {
    // handle drag end logic here
    const copiedTasks = Array.from(tasks);
    const [reorderedTasks] = copiedTasks.splice(result.source.index, 1);
    copiedTasks.splice(result.destination.index, 0, reorderedTasks);
    setTasks(copiedTasks);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full min-h-screen p-4 pt-16 rounded-lg border"
    >
      <ResizablePanel defaultSize={60} minSize={40}>
        <div className="flex w-full h-full flex-col items-center justify-between p-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <ul
                  className="w-full flex flex-col space-y-4 mb-8"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.map((item, index) => {
                    return (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card>
                              <div className="w-full flex items-center p-4">
                                <DragHandleDots2Icon className="w-4 h-4" />
                                <div className="flex-grow">
                                  <CardHeader>
                                    <CardTitle>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id={item} />
                                        <label
                                          htmlFor={item}
                                          className="text-xl font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                          Task Name
                                        </label>
                                      </div>
                                    </CardTitle>
                                    <CardDescription>
                                      Workspace Name and Due date
                                    </CardDescription>
                                    <Separator className="h-[2px]" />
                                  </CardHeader>

                                  <CardContent>
                                    <ul className="ml-4 space-y-4">
                                      {items.map((subItem) => {
                                        return (
                                          <li className="flex items-center space-x-2">
                                            <Checkbox id={subItem} />
                                            <label
                                              htmlFor={subItem}
                                              className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                              Task Name
                                            </label>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </CardContent>

                                  <CardFooter>
                                    <Progress value={50} className="w-full" />
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
              )}
            </Droppable>
          </DragDropContext>
          <div className="w-3/4 min-w-xl flex space-x-2">
            <Input type="text" placeholder="Create new task..." />
            <Button size="icon">
              <Pencil2Icon className="w-4 h-4" />
            </Button>
          </div>
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
          <ResizablePanel defaultSize={72}>
            <div className="flex h-full items-center justify-center p-4"></div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
