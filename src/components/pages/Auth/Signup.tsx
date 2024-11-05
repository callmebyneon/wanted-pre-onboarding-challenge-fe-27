import ActionButton from "../../common/form/ActionButton";
import TextInput from "../../common/form/TextInput"
import style from "./auth.module.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants/base_url";
import { useNavigate } from "react-router";
import { validateEmail, validatePassword } from "./validation";

export type UserInput = {
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/")
    }
  }, [])

  const [input, setInput] = useState<UserInput>({ email: "", password: "" })
  const [message, setMessage] = useState<string>("")

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setInput(prev => ({...prev, [name]: value}))
  }
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const result = await fetch(BASE_URL + "/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then(res => res.json())
    
    if (result?.token) {
      navigate("/login")
    }
    setMessage(result?.details ?? result?.message)
  }
  
  return (
    <div className={style.formBox}>
      <form>
        <h1>회원가입</h1>
        <div className={style.formAlign}>
          <TextInput 
            type="email" 
            lableName="Email" 
            name="email" 
            placeholder="example@email.com"
            value={input.email}
            onChange={onChangeValue}
            />
          <TextInput 
            type="password" 
            lableName="Password" 
            name="password" 
            minLength={8} 
            placeholder="******** (equal or over than 8 characters)"
            value={input.password}
            onChange={onChangeValue}
          />
          {message.trim() !== "" && <p>{message}</p>}
          <ActionButton 
            type="submit" 
            onClick={onSubmit} 
            disabled={!validateEmail(input.email) || !validatePassword(input.password)}
          >Sign up</ActionButton>
        </div>
      </form>
    </div>
  );
}

export default Signup