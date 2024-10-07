import { Button, Form } from "react-bootstrap";
import styles from "./Login.module.css";
import { FormEvent, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useAppDispatch } from "../../../hooks/redux";
import { setLogin } from "../../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const { values, handleChange } = useForm({
    user: "",
    password: ""
  });

  const { user, password } = values;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/user.json");
    const usersData = await response.json();
    const userFound = usersData.users.find(
      (u: { username: string; password: string }) =>
        u.username === user && u.password === password
    );

    if (userFound) {
      dispatch(setLogin(user));
      navigate('/');
    }else{
      alert("Usuario o contraseña no encontrados")
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <span style={{ fontSize: "10vh" }} className="material-symbols-outlined">
          group
        </span>
        <Form onSubmit={handleSubmitForm}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              value={user}
              name="user"
              placeholder="Ingrese su nombre de usuario"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              value={password}
              onChange={handleChange}
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Ingrese su contraseña"
            />
          </Form.Group>
          <Form.Check
            type="switch"
            onChange={() => {
              setShowPass(!showPass);
            }}
            id="custom-switch"
            label="Mostrar Contraseña"
          />
          <div className="d-flex justify-content-center align-items-center mt-2">
            <Button variant="outline-primary" type="submit">
              Ingresar
            </Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
