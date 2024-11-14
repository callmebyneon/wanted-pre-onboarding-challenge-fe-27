import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { TodoInput } from "./TodoListItem";

import ActionButton from "../../widgets/form/ActionButton";
import TextInput from "../../widgets/form/TextInput";
import Textarea from "../../widgets/form/Textarea";

import { createTodo } from "../../features/todo/fetch_fns";
import { appQueryClient } from "@/app/providers/query-client";

import layout from "@/pages/Layout/layout.module.css"

const TodoCreator = () => {
  const [input, setInput] = useState<TodoInput>({ title: "", content: "" })
  const [isBlank, setBlank] = useState<boolean>(false)
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isBlank) {
      setBlank(false)
    }

    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setInput((prev: TodoInput) => ({ ...prev, [name]: value}))
  }
  
  const { mutate, isPending } = useMutation({
    mutationKey: ["todos"],
    mutationFn: createTodo,
    onSuccess: () => {
      appQueryClient.invalidateQueries({ queryKey: ["todos"]})
    }
  })
  
  const onCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (input.title.trim().length === 0 || input.content.trim().length === 0) {
      setBlank(true)
      return;
    }
    
    mutate(input)
  }
  
  return (
    <form>
      {isBlank && <p className={layout.alert}>Title과 Content를 모두 입력해주세요</p>}
      <TextInput autoFocus type="text" name="title" lableName="Title" value={input.title} onChange={onChange} />
      <Textarea name="content" rows={2} lableName="Content" value={input.content} onChange={onChange} />
      <ActionButton type="submit" onClick={onCreate} disabled={isPending}>추가</ActionButton>
    </form>
  );
}

export default TodoCreator