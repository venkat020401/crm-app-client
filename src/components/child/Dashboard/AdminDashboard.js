import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [isList, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  let handleDelete = async (id) => {
    try {
      const confirmdata = window.confirm(`Are you sure want to delete`);
      if (confirmdata) {
        await axios.delete(`https://crm-app-vm7p.onrender.com/remove-product/${id}`, {
          headers: {
            authorization: `${window.localStorage.getItem("token")}`,
          },
        });
        getProducts();
      }
    } catch (error) {}
  };

  let getProducts = async () => {
    try {
      const products = await axios.get("https://crm-app-vm7p.onrender.com/products", {
        headers: {
          authorization: `${window.localStorage.getItem("token")}`,
        },
      });
      setList(products.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="container-fluid">
        <div class="card shadow mb-4 mt-5">
          <div class="card-header d-sm-flex align-items-center justify-content-between mb-4 ">
            <h6 class="m-0 font-weight-bold text-dark">Welcome you..!</h6>
            <button
              onClick={() => {
                window.localStorage.removeItem("token");
                navigate("/");
              }}
              class="d-none d-sm-inline-block btn btn-sm btn-dark shadow-sm float-center"
            >
              <i class="fas fa-download fa-sm text-white-50"></i> Logout
            </button>
          </div>

          <div class="card-body">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <span>
                  <b>Product List</b>
                </span>
                <Link
                  to={"/add-product"}
                  class="d-none d-sm-inline-block btn btn-sm btn-outline-dark shadow-sm float-end"
                >
                  <i class="fas fa-download fa-sm text-white-50"></i> Add new
                  Product
                </Link>
              </div>

              <div class=" table-responsive">
                {isLoading ? (
                  <h1>Loading...</h1>
                ) : (
                  <table
                    class="table table-bordered"
                    id="dataTable"
                    cellspacing="0"
                  >
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isList.map((product, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>

                            <td>
                              <Link
                                to={`/view-product/${product._id}`}
                                className="btn btn-light btn-sm mx-1"
                              >
                                View
                              </Link>
                              <Link
                                to={`/update-product/${product._id}`}
                                className="btn btn-outline-secondary btn-sm mx-1"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(product._id)}
                                className="btn btn-secondary  btn-sm mx-1"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
