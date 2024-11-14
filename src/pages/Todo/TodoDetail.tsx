import { useState } from "react";
import ActionButton from "../../widgets/form/ActionButton";
import { TodoInput } from "./TodoListItem";
import { useNavigate, useParams } from "react-router";
import TextInput from "../../widgets/form/TextInput";
import Textarea from "../../widgets/form/Textarea";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getCreatedBefore } from "../../shared/ui/util_fns";
import { deleteTodo, getTodoById, updateTodo } from "../../features/todo/fetch_fns";

import style from "./todo.module.css"
import { appQueryClient } from "@/app/providers/query-client";

type Mode = "read" | "update";
const TodoDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [mode, setMode] = useState<Mode>("read");
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
  
  const { data, status } = useQuery({
    queryKey: [id],
    queryFn: getTodoById(id as string)
  })
  const { mutate: updateItem, isPending: isUpdatePending } = useMutation({
    mutationKey: ["todos", id],
    mutationFn: updateTodo(id as string),
    onSuccess: () => {
      setMode("read")
      appQueryClient.invalidateQueries({ queryKey: ["todos", id]})
    },
    onSettled: () => {
      appQueryClient.invalidateQueries({ queryKey: ["todos", id]})
    }
  })
  const { mutate: deleteItem, isPending: isDeletePending } = useMutation({
    mutationKey: ["todos"],
    mutationFn: deleteTodo(id as string),
    onSuccess: () => {
      navigate("/list")
      appQueryClient.invalidateQueries({ queryKey: ["todos"]})
    },
  })

  const onUpdateStart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const confirm: boolean = window.confirm("수정하시겠습니까?")
    if (confirm) {
      // PUT /todos/:id
      updateItem(input)
      // setMode("read")
    }
  }

  const onChangeMode = () => {
    setMode(prev => {
      if (prev === "update") return "read";
      setInput(data)
      return "update"
    })
  }
  const onDeleteStart = () => {
    const confirm: boolean = window.confirm("삭제하시겠습니까?")
    if (confirm) {
      // DELETE /todos/:id
      deleteItem()
      // navigate("/list")
    }
  }
  
  if (status === 'pending' || !data) {
    return <p>Loading...</p>
  }
  if (status === 'error' || data.status >= 400) {
    return <p>Error :(</p>
  }

  return (
    <>
      <hr />
      {mode === "read" ? (
        <article className={style.detail}>
          <h3>{data.title as string}</h3>
          <span>{getCreatedBefore(data.createdAt)}</span>
          <p>{data.content as string}</p>
        </article>
      ): (
        <>
          <TextInput type="text" name="title" value={input.title} lableName="Title" onChange={onChange} />
          <Textarea name="content" rows={2} value={input.content} lableName="Content" onChange={onChange} />
          <ActionButton type="submit" onClick={onUpdateStart} disabled={isUpdatePending || isDeletePending}>수정 완료</ActionButton>
        </>
      )}

      <div>
        <ActionButton onClick={onChangeMode} variant="gray">{mode === "read" ? "수정" : "취소"}</ActionButton>
        <ActionButton onClick={onDeleteStart} variant="red">삭제</ActionButton>
      </div>
    </>
  );
}

export default TodoDetail