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
import { Calendar } from "./calendar";

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
      className="w-full min-h-screen rounded-lg border"
    >
      <ResizablePanel defaultSize={76}>
        <div className="flex w-full h-full items-start justify-center p-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <ul
                  className="mt-12 w-full flex flex-col space-y-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {["a", "b", "c"].map((item, index) => {
                    return (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card>
                              <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>
                                  Card Description
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p>Card Content</p>
                              </CardContent>
                              <CardFooter>
                                <p>Card Footer</p>
                              </CardFooter>
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
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={24} minSize={24}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={28} minSize={28}>
            <div className="flex w-full h-full items-center justify-center p-4">
              <Calendar className="rounded-sm border shadow" />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={72}>
            <div className="flex h-full items-center justify-center p-6">
              <Calendar className="w-fit h-fit rounded-sm border shadow" />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
