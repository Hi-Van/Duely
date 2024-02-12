"use client";

import * as z from "zod";
import { useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../resizable";
import { Calendar } from "../calendar";
import { Input } from "../input";
import { Button } from "../button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Pencil2Icon } from "@radix-ui/react-icons";
import DragNDropList from "./drag-n-drop-list";
import type { Task } from "./drag-n-drop-list";
import { TaskEditor } from "./task-editor";

export default function Editor() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [stepInputValue, setStepInputValue] = useState("");
  const [currentEditableTask, setCurrentEditableTask] = useState<string | null>(
    null
  );
  const [date, setDate] = useState<Date | undefined>(undefined);
  const stepInputRef = useRef<HTMLInputElement>(null);
  const taskNameRef = useRef<HTMLInputElement>(null);

  const taskSchema = z.object({
    name: z.string().refine((val) => val.trim().length > 0, {
      message: "Task name is required",
    }),
  });

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: { name: "" },
  });

  function onSubmit(values: z.infer<typeof taskSchema>) {
    const date = new Date();

    const datestamp = date.toLocaleString(undefined, {
      dateStyle: "long",
      timeStyle: "short",
    });

    const newTask = {
      id: crypto.randomUUID(),
      name: values.name,
      workspace: "Workspace",
      dueDate: datestamp,
      done: false,
      subTasks: [],
      steps: 1,
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full max-h-screen min-h-screen p-4 rounded-lg border"
    >
      <ResizablePanel defaultSize={60} minSize={40}>
        <div className="flex w-full h-full flex-col items-center justify-between p-4">
          <DragNDropList
            tasks={tasks}
            setTasks={setTasks}
            setCurrentEditableTask={setCurrentEditableTask}
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full min-w-xl flex space-x-2 items-end"
            >
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    {form.formState.isSubmitted &&
                      form.formState.errors.name && <FormMessage />}
                    <FormControl>
                      <Input placeholder={"Enter Task..."} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button size="icon" type="submit">
                <Pencil2Icon className="w-4 h-4" />
              </Button>
            </form>
          </Form>
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
              <TaskEditor
                tasks={tasks}
                setTasks={setTasks}
                currentEditableTask={currentEditableTask}
                setCurrentEditableTask={setCurrentEditableTask}
                date={date}
                setDate={setDate}
                stepInputValue={stepInputValue}
                setStepInputValue={setStepInputValue}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
