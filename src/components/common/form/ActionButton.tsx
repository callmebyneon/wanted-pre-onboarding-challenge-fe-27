import style from "./button.module.css"

type CustomButtonProps = Omit<React.ComponentProps<"button">, "className">
type ActionButtonProps = { variant?: string } & CustomButtonProps
const ActionButton = ({ variant: color = "", ...props }: ActionButtonProps) => {
  return (
    <button {...props} className={style?.[color] ?? undefined} />
  );
}

export default ActionButton