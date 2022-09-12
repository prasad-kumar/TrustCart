import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct, getProductDetails } from "../../actions/productAction";
import { Button } from "@mui/material";
import Meta from "../layout/Meta";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineAccountTree } from "react-icons/md";
import { MdOutlineStorage } from "react-icons/md";
import { MdOutlineSpellcheck } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {id} = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error:updateError, isUpdated } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [sizes, setSizes] = useState();
  const [quantity, setQuantity] = useState();
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "MEN",
    "WOMEN"
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

    if(product && product._id !== id){
        dispatch(getProductDetails(id));
    }else{
        setName(product.name)
        setBrand(product.brand)
        setSellingPrice(product.sellingPrice)
        setRetailPrice(product.retailPrice)
        setDiscount(product.discount)
        setDescription(product.productDetails)
        setCategory(product.category)
        setSubCategory(product.subCategory)
        setOldImages(product.images)
    }

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

    if (updateError) {
        toast.error(updateError, {
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

    if (isUpdated) {
      toast.success("Product Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/dashboard");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, product,  id, navigate, updateError, isUpdated]);

  const updateProductSubmitHandler = (e) => {
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
    

    dispatch(updateProduct(id,myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setOldImages([]);
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
      <Meta title="Update Product - Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

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
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </div>

            <div>
              <MdAttachMoney />
              <input
                type="number"
                placeholder="Retail Price"
                required
                value={retailPrice}
                onChange={(e) => setRetailPrice(e.target.value)}
              />
            </div>

            <div>
              <MdAttachMoney />
              <input
                type="number"
                placeholder="Discount"
                required
                value={discount}
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
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
              <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
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
                onChange={(e) => setSizes(e.target.value)}
              />
            </div>

            <div>
              <MdOutlineStorage />
              <input
                type="text"
                placeholder="Quatity (ex: 14 41 5 ...)"
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;