import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function EditProduct() {
  const [isLoading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductData();
  }, []);

  let getProductData = async () => {
    try {
      const product = await axios.get(
        `http://localhost:8000/get-product/${params.id}`
      );
      MyFormik.setValues(product.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const MyFormik = useFormik({
    initialValues: {
      name: "",
      vendor: "",
      price: "",
      selling_price: "",
      product_added_on: "",
      img: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Please enter the product name";
      }
      if (!values.vendor) {
        errors.vendor = "Please enter vendor name";
      }
      if (!values.price) {
        errors.price = "Please enter the price";
      }
      if (!values.selling_price) {
        errors.selling_price = "Please enter the selling price";
      }
      if (!values.product_added_on) {
        errors.product_added_on = "Please select the date ( Today date )";
      }
      if (!values.img) {
        errors.img = "Please enter the product image URL ";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(`http://localhost:8000/update-product/${params.id}`, {
          name: values.name,
          vendor: values.vendor,
          price: values.price,
          selling_price: values.selling_price,
          product_added_on: values.product_added_on,
          img: values.img,
        });
        setLoading(false);
        navigate("/admin-dashboard");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container mt-5">
      <form onSubmit={MyFormik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6 mb-3">
            <label>Product Name</label>
            <input
              name="name"
              value={MyFormik.values.name}
              onChange={MyFormik.handleChange}
              type="text"
              className={`form-control ${
                MyFormik.errors.name ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "crimson" }}>{MyFormik.errors.name}</span>
          </div>

          <div className="col-lg-6">
            <label>Vendor</label>
            <input
              name="vendor"
              value={MyFormik.values.vendor}
              onChange={MyFormik.handleChange}
              type="text"
              className={`form-control ${
                MyFormik.errors.vendor ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "crimson" }}>{MyFormik.errors.vendor}</span>
          </div>

          <div className="col-lg-4 mt-3">
            <label>Price in INR</label>
            <input
              name="price"
              value={MyFormik.values.price}
              onChange={MyFormik.handleChange}
              type="number"
              className={`form-control ${
                MyFormik.errors.price ? "is-invalid" : ""
              }`}
            />

            <span style={{ color: "crimson" }}>{MyFormik.errors.price}</span>
          </div>
          <div className="col-lg-4 mt-3">
            <label>Selling Price in INR</label>
            <input
              name="selling_price"
              value={MyFormik.values.selling_price}
              onChange={MyFormik.handleChange}
              type="number"
              className={`form-control ${
                MyFormik.errors.selling_price ? "is-invalid" : ""
              }`}
            />

            <span style={{ color: "crimson" }}>
              {MyFormik.errors.selling_price}
            </span>
          </div>
          <div className="col-lg-4 mt-3">
            <label>Product Added On</label>
            <input
              name="product_added_on"
              value={MyFormik.values.product_added_on}
              onChange={MyFormik.handleChange}
              type="date"
              className={`form-control ${
                MyFormik.errors.product_added_on ? "is-invalid" : ""
              }`}
            />

            <span style={{ color: "crimson" }}>
              {MyFormik.errors.product_added_on}
            </span>
          </div>
          <div className="col-lg-12 mt-3">
            <label>Image URL</label>
            <input
              name="img"
              value={MyFormik.values.img}
              onChange={MyFormik.handleChange}
              type="url"
              className={`form-control ${
                MyFormik.errors.img ? "is-invalid" : ""
              }`}
            />

            <span style={{ color: "crimson" }}>{MyFormik.errors.img}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mt-2">
            <input
              type={"submit"}
              value={isLoading ? "Updating..." : "Update Product"}
              className="btn btn-dark mt-2"
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
