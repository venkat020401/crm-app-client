import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [isUser, setUser] = useState([]);
  const [isCart, setcart] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getproducts();
    get_cart_items();
  }, []);

  //get all products
  const getproducts = async () => {
    try {
      const products = await axios.get("http://localhost:8000/products", {
        headers: {
          authorization: `${window.localStorage.getItem("token")}`,
        },
      });
      setUser(products.data);
    } catch (error) {
      console.log(error);
    }
  };

  //add to cart
  const AddtoCart = async (id) => {
    try {
      const user = await axios.post(`http://localhost:8000/addtocart/${id}`);
      get_cart_items();
    } catch (error) {
      console.log(error);
    }
  };

  // get cart items
  const get_cart_items = async () => {
    try {
      const cartItems = await axios.get(
        "http://localhost:8000/get_cart_items",
        {
          headers: {
            authorization: `${window.localStorage.getItem("token")}`,
          },
        }
      );
      setcart(cartItems.data);
    } catch (error) {
      console.log(error);
    }
  };

  //remove cart item
  const removeCart = async (id) => {
    try {
      setLoading(true);
      const removeitem = await axios.delete(
        `http://localhost:8000/remove_cart_item/${id}`,
        {
          headers: {
            authorization: `${window.localStorage.getItem("token")}`,
          },
        }
      );
      get_cart_items();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="bg-dark py-1 sticky-top">
        <div className="container px-4 px-lg-5 my-2">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Realme</h1>
            <p className="lead fw-normal text-white-50 mb-0">Brand Mall</p>
          </div>
        </div>
        <span className="d-flex justify-content-end">
          <button
            onClick={() => {
              window.localStorage.removeItem("token");
              navigate("/");
            }}
            className="btn btn-outline-light mr-2 mb-2 btn-sm"
          >
            Logout
          </button>
        </span>
      </header>
      <div className="row mt-3 ml-2">
        <div className="col-lg-8">
          <div className="row">
            {isUser.map((product) => {
              return (
                <div className="col-lg-4 col-md-6">
                  <div className="card mt-3" style={{ width: "18rem" }}>
                    <img src={product.img} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Rs. {product.price}</p>
                      <span className="buttonds">
                        <button
                          disabled={isCart.some(
                            (item) => item._id === product._id
                          )}
                          className="btn btn-outline-secondary btn-sm mx-2"
                          onClick={() => AddtoCart(product._id)}
                        >
                          Add to cart
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          Buy Now
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-lg-3 ml-5 mt-3">
          <h3 className="mt-2">Your Cart Items </h3>
          {isCart.length == 0 ? (
            <p className="text-center mt-4">Your cart is empty</p>
          ) : (
            <ol className="list-group list-group-numbered">
              {isCart.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      {item.product[0].name}
                      <br />
                      Rs. {item.product[0].price}
                      <br />
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => removeCart(item._id)}
                      >
                        Remove
                      </button>{" "}
                      <br></br>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
