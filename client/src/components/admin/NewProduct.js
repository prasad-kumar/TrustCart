import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, newProduct } from "../../actions/productAction";
import { Button } from "@mui/material";
import Meta from "../layout/Meta";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineAccountTree } from "react-icons/md";
import { MdOutlineStorage } from "react-icons/md";
import { MdOutlineSpellcheck } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [sizes, setSizes] = useState("S M L XL XXL");
  const [quantity, setQuantity] = useState("100 100 100 100 100");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "MEN",
    "WOMEN",
    "KIDS"
  ]

  const subCategories = [
    "T-shirts",
    "Casual Shirts",
    "Formal Shirts",
    "Sweatshirts",
    "Jackets",
    "Blazers & Coats",
    "Sherwanis",
    "Suits",
    "Jeans",
    "Casual Trousers",
    "Formal Trousers",
    "Track Pants & Joggers",
    "Dresses",
    "Kurtas & Suits",
    "Tops",
    "Sarees",
    "Ethnic Wear",
    "Leggings, Salwars & Churidars",
    "Casual Shoes",
    "Sports Shoes",
    "Formal Shoes",
    "Heels",
    "Briefs",
    "Bra",
    "Vests",
  ];

  useEffect(() => {
    if (error) {
        toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });  
      dispatch(clearErrors);
    }

    if (success) {
      toast.success("Product Created Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    const slug = name.split(' ').join('-').toLocaleLowerCase();
    myForm.set("slug", slug);
    myForm.set("brand", brand);
    myForm.set("sellingPrice", sellingPrice);
    myForm.set("retailPrice", retailPrice);
    myForm.set("discount", discount);
    myForm.set("productDetails", description);
    myForm.set("category", category);
    myForm.set("subCategory", subCategory);
    myForm.set("sizes", sizes);
    myForm.set("quantity", quantity);

    images.forEach((image) => {
        myForm.append("images", image);
      });
    

    dispatch(newProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <Meta title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <MdOutlineSpellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MdOutlineSpellcheck />
              <input
                type="text"
                placeholder="Brand"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div>
              <MdAttachMoney />
              <input
                type="number"
                placeholder="Selling Price"
                required
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </div>

            <div>
              <MdAttachMoney />
              <input
                type="number"
                placeholder="Retail Price"
                required
                onChange={(e) => setRetailPrice(e.target.value)}
              />
            </div>

            <div>
              <MdAttachMoney />
              <input
                type="number"
                placeholder="Discount"
                required
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div>
              <MdOutlineDescription />

              <textarea
                placeholder="Product Details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <MdOutlineAccountTree />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <MdOutlineAccountTree />
              <select onChange={(e) => setSubCategory(e.target.value)}>
                <option value="">Choose SubCategory</option>
                {subCategories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <GiClothes />
              <input
                type="text"
                placeholder="Sizes (ex: S M L ...)"
                required
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
              />
            </div>

            <div>
              <MdOutlineStorage />
              <input
                type="text"
                placeholder="Quatity (ex: 14 41 5 ...)"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;