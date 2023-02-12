import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function ViewProduct() {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isList, setList] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  let getProduct = async () => {
    try {
      const product = await axios.get(
        `http://localhost:8000/get-product/${params.id}`
      );
      setList(product.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mx-5 mt-5">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          <div className="col-lg-5 col-sm-5">
            <h2 className="mx-2">{isList[0].name}</h2> <br />
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <th>Product ID</th>
                  <td>{isList[0]._id}</td>
                </tr>
                <tr>
                  <th>Vendor</th>
                  <td>{isList[0].vendor}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>{isList[0].price}</td>
                </tr>
                <tr>
                  <th>Selling Price</th>
                  <td>{isList[0].selling_price}</td>
                </tr>
                <tr>
                  <th>Added on</th>
                  <td>{isList[0].product_added_on}</td>
                </tr>
                <tr>
                  <th>Image URL</th>
                  <td>{isList[0].img}</td>
                </tr>
                <tr>
                  <th>
                    <Link
                      to={`/admin-dashboard`}
                      className="btn btn-dark btn-sm mt-2"
                    >
                      Back
                    </Link>
                  </th>
                  <td>
                    <Link
                      to={`/update-product/${isList[0]._id}`}
                      className="btn btn-secondary btn-sm mt-2"
                    >
                      Edit Details
                    </Link>
                  </td>
                </tr>
                {/* <img src={isList[0].img} /> */}
              </tbody>
            </table>
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-5 col-sm-5 view-image">
            <img src={isList[0].img} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProduct;
