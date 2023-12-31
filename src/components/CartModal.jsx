
import { useContext } from "react"
import { CartContext } from "../context/cart/cartContext"
import { CartItem } from "./CartItem"
import { agregarPuntoAlPrecio } from "../helpers/precioConPunto"

import { useNavigate } from "react-router-dom"
import { DeleteFav } from "./DeleteFav"


export const CartModal = () => {
    const navegar = useNavigate()
    const [state, dispatch] = useContext(CartContext);/* Obtiene el estado del carrito y la función lanzadora (burrito)*/
    console.log(state)/* imprime en consola el estado actual del carrito */
    const closeModal = () => {
        dispatch({ type: 'CLOSE' });/* Constante que usaremos para cerrar el modal */
    }


    // cartItem que es el que contiene los productos del carrito es el arreglo sobre el que iteramos
    const subtotal = state.cartItems.reduce((acumulador, valorActual) => { /* la funcion reduce toma dos argumentos (acumulador y valor actual) acumulador es la funcion que reduce y valor actual la que da el valor inical. En cada iteracion el acumulador  va tomando el valor que acumula */
        return acumulador + (valorActual.valor * valorActual.cantidad);
    }, 0);

    const precioFormateado = agregarPuntoAlPrecio(subtotal)

    const removeAllCart = () => {
        dispatch({
            type: 'EMPTY'
        });
    }

    const checkout = () => {
        navegar("/checkout")
        dispatch({
            type: 'CLOSE'
        })
    }



    return (
        <>
            <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                {/* <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  --> */}

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            {/* <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        --> */}
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 className="text-xl font-mooli text-gray-900" id="slide-over-title">Carrito de compras</h2>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button onClick={closeModal} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                                    <span className="absolute -inset-0.5"></span>
                                                    <span className="sr-only">Close panel</span>
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            {state.cartItems.length === 0 ? (
                                                <div className="text-center p-4">
                                                    <img src="https://res.cloudinary.com/dt7h6qci4/image/upload/v1696105765/preview-removebg-preview_uv18qk.png" alt="Carrito vacío" className="mx-auto" />
                                                    <p className="font-mooli text-xl text-violet-600">Oh no...!!! Tu carrito se encuentra vacío. </p>
                                                </div>
                                            ) : (
                                                <div className="flow-root font-mooli">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">

                                                        {state.cartItems.map((item, index) => (

                                                            <CartItem imagen={item.imagenes.principal} nombre={item.nombre} valor={item.valor} categoria={item.categoria} id={item._id} qty={item.cantidad} key={index} />
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div onClick={removeAllCart} className="font-mooli ml-auto flex items-end text-violet-500 cursor-pointer pb-3 pr-3">
                                        <span className="text-sm text-gray-500">Vaciar carrito</span>
                                        <DeleteFav className="ml-auto w-8" />
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6 font-mooli">
                                        <div className="flex justify-between text-lg font-semibold text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${precioFormateado}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Envío e impuestos calculados al finalizar la compra.</p>
                                        <div className="mt-6">
                                            <button onClick={checkout} disabled={state.cartItems.length <= 0} className="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:from-gray-500 disabled:to-gray-600 mx-auto hover:scale-110">Continuar con mi compra</button>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                <button onClick={closeModal} type="button" className="font-medium text-violet-600 hover:text-violet-500">Seguir mirando
                                                    <span aria-hidden="true"> &rarr;</span></button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}