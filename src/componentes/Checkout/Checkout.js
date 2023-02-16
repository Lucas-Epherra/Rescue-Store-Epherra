import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, Navigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const { cart, sumarTotalCart } = useContext(CartContext);

  const [values, setValues] = useState({
    nombre: "",
    direccion: "",
    email: "",
  });

  const [error, setError] = useState({
    nombre: true,
    direccion: true,
    email: true,
  });
 
  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSumbit = (e) => {
    e.preventDefault();

    //validacion

    if (values.nombre.length < 2) {
      setError({
        nombre: false,
      });
      return;
    }

    if (values.direccion.length < 2) {
      setError({
        direccion: false,
      });
      return;
    }

    if (values.email.length < 5) {
      setError({
        email: false,
      });
      return;
    }

    console.log(error);

    const orden = {
      cliente: values,
      items: cart,
      total: sumarTotalCart(),
    };

    console.log(orden);
  }; 

  if (cart.length === 0) {
    <Navigate to="/" />;
  }

  return (
    <div className="container my-5">
      <h2>Terminar mi compra</h2>
      <hr />
      <form onSubmit={handleSumbit}>
        <label>Nombre :</label>
        <input
          className="form-control my-2"
          onChange={handleInputChange}
          type="text"
          name="nombre"
          values={values.nombre}
          placeholder="Tu nombre"
        />
        {error.nombre === false ? (
          <p className="errorMsj">Ha ocurrido un error, nombre invalido</p>
        ) : (
          ""
        )}

        <label>Direccion :</label>
        <input
          className="form-control my-2"
          onChange={handleInputChange}
          type="text"
          name="direccion"
          values={values.direccion}
          placeholder="Tu direccion"
        />
        {error.direccion === false ? (
          <p className="errorMsj">Ha ocurrido un error, direccion invalida</p>
        ) : (
          ""
        )}

        <label>Email :</label>
        <input
          className="form-control my-2"
          onChange={handleInputChange}
          type="email"
          name="email"
          values={values.email}
          placeholder="Tu email"
        />
        {error.email === false ? (
          <p className="errorMsj">Ha ocurrido un error, email invalido</p>
        ) : (
          ""
        )}

        <button className="btn btn-primary mx-3 my-3">Enviar</button>
      </form>
      <Link to="/cart" className="btn btn-danger">
        Volver al carrito
      </Link>
    </div>
  );
};

export default Checkout;
