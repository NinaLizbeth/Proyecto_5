/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure,
  Spinner
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon.jsx";
import { LockIcon } from "./LockIcon.jsx";
import { GoogleSvg } from "./GoogleSvg.jsx";
import { regionesData } from "../helpers/regiones";
import { toast } from 'react-toastify';
import { UserLoginSvg } from "./UserLoginSvg.jsx";
import { IdentificationSvg } from "./IdentificationSvg.jsx";
import { UserContext } from "../context/user/userContext.js"


export function RegisterModal({closeLogin}) {

  //name, lastname,email,password,identification, country, age, gender, region, commune, address, phone
  const initialRegisterForm = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    identification: "",
    country: "Chile",
    age: "18",
    gender: "Not specified",
    region: "",
    commune: "",
    address: "",
    phone: "",
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [state, dispatch] = useContext(UserContext)
  const [comunas, setComunas] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [contrasena2, setContrasena2] = useState("");
  const [isValidForm, setIsValidForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitRegister = async(e, onClose) => {
    e.preventDefault();
    if(!isValidForm){
      toast('Debes llenar todos los campos antes de registrarte')
      return
    }
    const rutaBackend = 'https://proyecto5-backend-ten.vercel.app/'
    const first = registerForm.name.slice(0,4)
    const second = registerForm.lastname.slice(0,4)
    const fecha = JSON.stringify(Date.now())
    const third = fecha.slice(8,13)
    const username = first+second+third
    if (registerForm.password !== contrasena2) {
      toast("tus contraseñas no son iguales");
      return;
    }
    const finalForm = {
      ...registerForm,
      username,
      phone:'+569'+ registerForm.phone,

    }
    try {
      setIsLoading(true)
      const {data} = await axios.post(rutaBackend+'user/create', finalForm, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
      })
      dispatch({
        type: 'LOGIN',
        payload: data.token
      })
      setRegisterForm(initialRegisterForm)
      setIsLoading(false)
      toast('Usuario registrado con éxito')
      closeLogin()
      onClose()
    } catch (error) {
      console.log(error)
      toast('Algo salió mal, inténtalo nuevamente')
      setIsLoading(false)
    }
  };

  const onChangeRegion = (e) => {
    const region = e.currentKey;
    console.log(region)
    setRegisterForm({
      ...registerForm,
      region: [region]
    });
    const comunas = regionesData.find((reg) => reg.region === region);
    setComunas(comunas.comunas);
  };

  const onChangeComuna = (e) => {
    setRegisterForm({
      ...registerForm,
      commune: [e.currentKey]
    })
  }

  const onChangeForm = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const valores = Object.values(registerForm)
    const response = valores.some((x) => x === '')
    setIsValidForm(!response)
    return !response
  }

  useEffect(() => {
    setRegiones(
      regionesData.map((region) => {
        return region.region;
      })
    );
  }, []);

  useEffect(() => {
    validateForm()
  }, [registerForm])

  return (
    <>
      <Button
        className="text-slate-600 hover:text-violet-600 font-semibold border border-violet-500 hover:scale-110"
        variant="flat"
        onClick={onOpen}
      >
        Registrarme
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Regístrate
              </ModalHeader>
              <ModalBody>
                {/* Nombre */}
                <Input
                  endContent={
                    <UserLoginSvg className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Nombre"
                  name="name"
                  value={registerForm.name}
                  onChange={onChangeForm}
                  placeholder="Ingresa tu nombre"
                  variant="bordered"
                  style={{
                    outline: "none",
                    border: "none",
                  }}
                />
                {/* Apellido */}
                <Input
                  endContent={
                    <UserLoginSvg className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Apellidos"
                  name="lastname"
                  value={registerForm.lastname}
                  onChange={onChangeForm}
                  placeholder="Ingresa tus apellidos"
                  variant="bordered"
                  style={{
                    outline: "none",
                    border: "none",
                  }}
                />
                {/* RUT */}
                <Input
                  endContent={
                    <IdentificationSvg className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="RUT"
                  name="identification"
                  value={registerForm.identification}
                  onChange={onChangeForm}
                  placeholder="Ingresa tu RUT"
                  variant="bordered"
                  style={{
                    outline: "none",
                    border: "none",
                  }}
                />
                {/* Correo */}
                <Input
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  name="email"
                  value={registerForm.email}
                  onChange={onChangeForm}
                  label="Email"
                  placeholder="Ingresa tu email"
                  variant="bordered"
                  style={{
                    outline: "none",
                    border: "none",
                  }}
                />
                {/* Contraseña */}
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  name="password"
                  value={registerForm.password}
                  onChange={onChangeForm}
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  variant="bordered"
                  className="outline-none focus:border-none focus:outline-none"
                  style={{
                    outline: "none",
                    border: "none",
                  }}
                />
                {/* Contraseña 2 */}
                {registerForm.password === "" ? (
                  <></>
                ) : (
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    name="contrasena2"
                    value={contrasena2}
                    onChange={(e) => setContrasena2(e.target.value)}
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña nuevamente"
                    type="password"
                    variant="bordered"
                    className="outline-none focus:border-none focus:outline-none"
                    style={{
                      outline: "none",
                      border: "none",
                    }}
                  />
                )}

                {/* Región */}
                <div className="flex w-full max-w-xs flex-col gap-2">
                  <Select
                    label="Selecciona tu región"
                    variant="bordered"
                    placeholder=""

                    selectedKeys={registerForm.region}
                    // className="max-w-xs"
                    onSelectionChange={onChangeRegion}
                  >
                    {regiones.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Comuna */}
                {comunas.length === 0 ? (
                  <></>
                ) : (
                  <div className="flex w-full max-w-xs flex-col gap-2">
                    <Select
                      label="Selecciona tu comuna"
                      variant="bordered"
                      placeholder=""
                      selectedKeys={registerForm.commune}
                      // className="max-w-xs"
                      onSelectionChange={onChangeComuna}
                    >
                      {comunas.map((commune) => (
                        <SelectItem key={commune} value={commune}>
                          {commune}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}

                {/* Dirección */}
                {registerForm.commune === "" ? (
                  <></>
                ) : (
                  <Input
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Dirección"
                    name="address"
                    value={registerForm.address}
                    onChange={onChangeForm}
                    placeholder="Ingresa tu dirección"
                    variant="bordered"
                    style={{
                      outline: "none",
                      border: "none",
                    }}
                  />
                )}

                {/* Teléfono */}
                {registerForm.address === "" ? (
                  <></>
                ) : (
                  <Input
                    type="phone"
                    name="phone"
                    value={registerForm.phone}
                    onChange={onChangeForm}
                    label="N° de Teléfono"
                    placeholder="87654321"
                    labelPlacement="outside"
                    startContent={
                      <div className="pointer-events-none flex items-center w-14">
                        <span className="text-default-400 text-small">
                          +56 9{" "}
                        </span>
                      </div>
                    }
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={!isValidForm}
                  onClick={(e) => onSubmitRegister(e, onClose)}
                  className="text-slate-600 hover:text-violet-600 font-semibold border border-violet-500 hover:scale-110 disabled:bg-gray-300 disabled:border-gray-700"
                  variant="flat"
                >
                  {
                    (isLoading)
                    ? <Spinner color='secondary'/>
                    : 'Registrarme'
                  } 
                </Button>
                <Button
                  onClick={onSubmitRegister}
                  className="text-white font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:scale-110"
                  onPress={onClose}
                >
                  Ingresar
                </Button>
              </ModalFooter>
              <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 my-6 bg-gray-400 rounded dark:bg-gray-700"/>
              <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
                <p className="text-slate-500">o</p>
                </div>
              </div>
              <Button className="mx-16 mb-6 bg-default/40 text-slate-600 hover:text-violet-600 font-semibold border border-violet-500">
                {" "}
                <GoogleSvg />
                Inicia sesión con Google
              </Button>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
