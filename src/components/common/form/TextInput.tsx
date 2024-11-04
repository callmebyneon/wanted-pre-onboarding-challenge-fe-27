import style from "./input.module.css";

type InputElementProps = React.ComponentProps<"input">
const TextInput = ({ lableName, ...props }: InputElementProps & { lableName?: string }) => {
  return (
    <label className={style.inputLabel}>
      <input {...props} />
      {typeof lableName === "string" && <span>{lableName as string}</span>}
    </label>
  );
}

export default TextInput