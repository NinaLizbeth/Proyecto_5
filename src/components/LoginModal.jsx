/* eslint-disable react/prop-types */

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';
import { GoogleSvg } from './GoogleSvg.jsx';
import { FacebookSvg } from "./FacebookSvg.jsx";
import { RegisterModal } from "./RegisterModal.jsx";
import { auth, googleProvider, facebookProvider} from "../firebase/firebase.js";
import { signInWithPopup } from "firebase/auth";


export  function LoginModal({isOpen, onOpenChange}) {
  const onLoginGoogle = () => {
    signInWithPopup(auth, googleProvider).then(({user})=>{
      console.log(user)
      alert("Inicio de sesión exitoso")
    }).catch((error)=>{
      console.log(error)
    alert("No se pudo iniciar sesión")
  })
  }
  const onLoginFacebook = () => {
    signInWithPopup(auth, facebookProvider).then(({user})=>{
      console.log(user)
      alert("Inicio de sesión exitoso")
    }).catch((error)=>{
      console.log(error)
    alert("No se pudo iniciar sesión")
  })
  }
  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Iniciar sesión</ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Ingresa tu email"
                  variant="bordered"
                  style={{
                    outline: 'none',
                    border: 'none'
                  }}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  variant="bordered"
                  className="outline-none focus:border-none focus:outline-none"
                  style={{
                    outline: 'none',
                    border: 'none'
                  }}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                  color="secondary"
                    classNames={{
                      label: "text-small" ,
                      checkbox:"bg-purple-600"
                      
                    }}
                  >
                    Recuérdame
                  </Checkbox>
                  <Link color="secondary" href="#" size="sm">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                {/* <Button className="text-slate-600 hover:text-violet-600 font-semibold border border-violet-500 hover:scale-110" variant="flat" onPress={onClose}>
                  Registrarme
                </Button> */}
                
                <RegisterModal closeLogin={onClose} />
               
                <Button className="text-white font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:scale-110" onPress={onClose}>
                  Ingresar
                </Button>
              </ModalFooter>
              <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 my-8 bg-gray-400 rounded dark:bg-gray-700"/>
              <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
                <p className="text-slate-500">o</p>
                </div>
              </div>
              <Button onClick={onLoginGoogle} className="mx-16 mb-6 bg-default/40 text-slate-600 hover:text-violet-600 font-semibold border border-violet-500"> <GoogleSvg/>Inicia sesión con Google</Button>
              {/* <Button onClick={onLoginFacebook} className="mx-16 mb-6 bg-default/40 text-slate-600 hover:text-violet-600 font-semibold border border-violet-500"> <FacebookSvg/>Inicia sesión con Facebook</Button> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
