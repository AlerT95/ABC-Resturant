/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { UniversalContext } from "../context/UniversalContext";
import logoDark from "../assets/default.jpg";
import Flatpickr from "react-flatpickr";
import { createCategory, updateCategory } from "../api/categoryApi";
import { createProduct, updateProduct } from "../api/productApi";
import { createOffer, updateOffer } from "../api/offerApi";
import { createService, updateService } from "../api/serviceApi";
import { updateUser } from "../api/userApi";
import { uploadImage } from "../api/imageApi";
import config from "../utils/config.json";

const ItemEditForm = ({ onClose }) => {
  const { getValue, setValue } = useContext(UniversalContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [status, setStatus] = useState(""); 
  const [selectedImage, setSelectedImage] = useState(logoDark);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageFilename, setUploadedImageFilename] = useState("");
  const apiUrl = config.API_URL;

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleAddItem = async () => {
    const pageName = getValue("PageName");
    const apiFunctions = {
      Category: createCategory,
      Product: createProduct,
      Service: createService,
      Offer: createOffer,
    };

    const data = {
      Category: { categoryName: title, description },
      Product: {
        productName: title,
        imageUrl: selectedImage,
        price,
        description,
        status,
        categoryId: category,
      },
      Service: { serviceName: title, description, price, categoryId: category },
      Offer: {
        offerName: title,
        description,
        discountPercentage,
        startDate,
        endDate,
        productId: product,
      },
    };

    const { ok, message } = await apiFunctions[pageName](data[pageName]);
    if (ok) {
      setValue("AlertType", "primary");
      setValue("AlertMessage", "item created successfully!");
      setValue("AlertVisibility", true);
      console.log(`${pageName} created successfully`);
      handleOnClose();
      setValue("updatePage", pageName);
    } else {
      setValue("AlertType", "danger");
      setValue("AlertMessage", "an error occurred!");
      setValue("AlertVisibility", true);
      console.error(message);
    }
  };

  const handleUpdateItem = async () => {
    const pageName = getValue("PageName");
    const apiFunctions = {
      Category: updateCategory,
      Product: updateProduct,
      Service: updateService,
      Offer: updateOffer,
      User: updateUser,
    };

    const id = {
      Category: getValue("SelectedCategory")?.id ?? null,
      Product: getValue("SelectedProduct")?.id ?? null,
      Service: getValue("SelectedService")?.id ?? null,
      Offer: getValue("SelectedOffer")?.id ?? null,
      User: getValue("SelectedUser")?.id ?? null,
    };

    const data = {
      Category: { categoryName: title, description },
      Product: {
        productName: title,
        imageUrl: selectedImage,
        price,
        description,
        status,
        categoryId: category,
      },
      Service: { serviceName: title, description, price, categoryId: category },
      Offer: {
        offerName: title,
        description,
        discountPercentage,
        startDate,
        endDate,
        productId: product,
      },
      User: { email, userType, status },
    };

    const { ok, message } = await apiFunctions[pageName](
      id[pageName],
      data[pageName]
    );
    if (ok) {
      setValue("AlertType", "primary");
      setValue("AlertMessage", "item updated successfully!");
      setValue("AlertVisibility", true);
      console.log(`${pageName} updated successfully`);
      handleOnClose();
      setValue("updatePage", pageName);
    } else {
      console.error(message);
      setValue("AlertType", "danger");
      setValue("AlertMessage", "an error occurred!");
      setValue("AlertVisibility", true);
    }
  };

  const handleSaveButton = () => {
    if (
      getValue("isCategoryEditMode") ||
      getValue("isUserEditMode") ||
      getValue("isProductEditMode") ||
      getValue("isOfferEditMode") ||
      getValue("isServiceEditMode")
    ) {
      handleUpdateItem();
    } else {
      handleAddItem();
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const { ok, uploadedFilename } = await uploadImage(file);
    if (ok) {
      setUploadedImageFilename(uploadedFilename);
      setSelectedImage(`images/retrieve/${uploadedFilename}`);
    } else {
      console.error("Error uploading image:", uploadedFilename);
    }
  };

  const handleOnClose = () => {
    if (getValue("PageName") === "Category") {
      setValue("isCategoryEditMode", false);
    } else if (getValue("PageName") === "User") {
      setValue("isUserEditMode", false);
    } else if (getValue("PageName") === "Product") {
      setValue("isProductEditMode", false);
    } else if (getValue("PageName") === "Offer") {
      setValue("isOfferEditMode", false);
    } else if (getValue("PageName") === "Service") {
      setValue("isServiceEditMode", false);
    }
    onClose();
  };

  const triggerImageInput = () => {
    document.getElementById("imageInput").click();
  };

  useEffect(() => {
    if (
      getValue("PageName") === "Category" &&
      getValue("isCategoryEditMode") === true
    ) {
      const selectedCategory = getValue("SelectedCategory");
      if (selectedCategory) {
        setTitle(selectedCategory.categoryName);
        setDescription(selectedCategory.description);
      }
    } else if (
      getValue("PageName") === "Product" &&
      getValue("isProductEditMode") === true
    ) {
      const selectedProduct = getValue("SelectedProduct");
      if (selectedProduct) {
        setTitle(selectedProduct.productName);
        setDescription(selectedProduct.description);
        setCategory(selectedProduct.categoryId);
        setPrice(selectedProduct.price);
        setStatus(selectedProduct.status);
        setSelectedImage(selectedProduct.imageUrl);
      }
    } else if (
      getValue("PageName") === "Service" &&
      getValue("isServiceEditMode") === true
    ) {
      const selectedService = getValue("SelectedService");
      if (selectedService) {
        setTitle(selectedService.serviceName);
        setDescription(selectedService.description);
        setPrice(selectedService.price);
        setCategory(selectedService.categoryId);
      }
    } else if (
      getValue("PageName") === "Offer" &&
      getValue("isOfferEditMode") === true
    ) {
      const selectedOffer = getValue("SelectedOffer");
      if (selectedOffer) {
        setTitle(selectedOffer.offerName);
        setDescription(selectedOffer.description);
        setDiscountPercentage(selectedOffer.discountPercentage);
        setStartDate(selectedOffer.startDate);
        setEndDate(selectedOffer.endDate);
        setProduct(selectedOffer.productId);
      }
    } else if (
      getValue("PageName") === "User" &&
      getValue("isUserEditMode") === true
    ) {
      const selectedUser = getValue("SelectedUser");
      if (selectedUser) {
        setEmail(selectedUser.email);
        setUserType(selectedUser.userType);
        setStatus(selectedUser.status);
      }
    }

    if (
      getValue("PageName") === "Product" &&
      getValue("isProductEditMode") === false
    ) {
      const categories = getValue("categories");
      if (categories && categories.length > 0) {
        setCategory(categories[0].id);
      }
      setStatus("instock");
    }
  
    if (
      getValue("PageName") === "Service" &&
      getValue("isServiceEditMode") === false
    ) {
      const categories = getValue("categories");
      if (categories && categories.length > 0) {
        setCategory(categories[0].id);
      }
    }
  
    if (
      getValue("PageName") === "Offer" &&
      getValue("isOfferEditMode") === false
    ) {
      const products = getValue("products");
      if (products && products.length > 0) {
        setProduct(products[0].id);
      }
    }
  }, [
    getValue("PageName"),
    getValue("isCategoryEditMode"),
    getValue("isProductEditMode"),
    getValue("isServiceEditMode"),
    getValue("isOfferEditMode"),
    getValue("isUserEditMode"),
    getValue("categories"),
    getValue("products"),
  ]);

  const renderFormFields = () => {
    switch (getValue("PageName")) {
      case "Product":
        return (
          <>
            <div className="mb-3 text-center position-relative">
              <img
                src={selectedImage !== logoDark ? apiUrl + selectedImage : selectedImage}
                alt="image"
                className="img-fluid rounded"
                width="200"
              />
              <input
                type="file"
                id="imageInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <button
                type="button"
                className="btn btn-primary rounded-circle position-absolute top-0 end-6 ms-1 p-1"
                style={{
                  width: "30px",
                  height: "30px",
                }}
                onClick={triggerImageInput}
              >
                <i className="ri-quill-pen-line fs-6 text-white" />
              </button>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  className="form-select"
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
                >
                  {getValue("categories") && getValue("categories").length > 0 ? (
                    getValue("categories").map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))
                  ) : (
                    <option value="">No categories available</option>
                  )}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="status-r" className="form-label">Status</label>
                <select
                  className="form-select"
                  id="status-r"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
                >
                  <option value="instock">In Stock</option>
                  <option value="outofstock">Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
              />
            </div>
          </>
        );
      case "Category":
        return (
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="title" className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter category name"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
              />
            </div>
          </div>
        );
      case "Service":
        return (
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="title" className="form-label">Service Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter service name"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
              />
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-select"
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
              >
                {getValue("categories") && getValue("categories").length > 0 ? (
                  getValue("categories").map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))
                ) : (
                  <option value="">No categories available</option>
                )}
              </select>
            </div>
          </div>
        );
      case "Offer":
        return (
          <>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="title" className="form-label">Offer Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter offer name"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="discountPercentage" className="form-label">Discount Percentage</label>
                <input
                  type="number"
                  className="form-control"
                  id="discountPercentage"
                  placeholder="Enter discount percentage"
                  value={discountPercentage}
                  onChange={(event) => setDiscountPercentage(event.target.value)}
                  style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="startDate" className="form-label">Start Date</label>
                <Flatpickr
                  id="startDate"
                  value={startDate}
                  className="form-control flatpickr-input"
                  onChange={handleStartDateChange}
                  style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="endDate" className="form-label">End Date</label>
                <Flatpickr
                  className="form-control flatpickr-input"
                  id="endDate"
                  value={endDate}
                  onChange={handleEndDateChange}
                  style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="product" className="form-label">Product</label>
              <select
                className="form-select"
                id="product"
                value={product}
                onChange={(event) => setProduct(event.target.value)}
                style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
              >
                {getValue("products") && getValue("products").length > 0 ? (
                  getValue("products").map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.productName}
                    </option>
                  ))
                ) : (
                  <option value="">No products available</option>
                )}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
              />
            </div>
          </>
        );

      case "User":
        return (
          <>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="status-r" className="form-label">Status</label>
                <select
                  className="form-select"
                  id="status-r"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
                >
                  <option value="verified">Verified</option>
                  <option value="unverified">Unverified</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="userType" className="form-label">User Type</label>
              <select
                className="form-select"
                id="userType"
                value={userType}
                onChange={(event) => setUserType(event.target.value)}
                style={{ borderRadius: '8px', boxShadow: 'inset 2px 2px 4px #d1d1d3, inset -2px -2px 4px #ffffff' }}
              >
                <option value="customer">Customer</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">Manage {getValue("PageName")}</div>
        <div className="card-body">
          <div>
            {renderFormFields()}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSaveButton}
                style={{ borderRadius: '8px', padding: '10px 20px' }}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleOnClose}
                style={{ borderRadius: '8px', padding: '10px 20px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemEditForm;
