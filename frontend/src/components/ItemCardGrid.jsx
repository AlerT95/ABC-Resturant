import { useState, useContext } from "react";
import { UniversalContext } from "../context/UniversalContext";
import config from "../utils/config.json";
import { deleteProduct } from "../api/productApi";
import { deleteUser } from "../api/userApi";
import { deleteOffer } from "../api/offerApi";
import { deleteService } from "../api/serviceApi";
import { deleteCategory } from "../api/categoryApi";

const ItemCardGrid = () => {
  const { getValue, setValue } = useContext(UniversalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = config.API_URL;
  const itemsPerPage = 12;

  const products = getValue("products");
  const static_products = getValue("static-products");

  const categories = getValue("categories");
  const static_categories = getValue("static-categories");

  const offers = getValue("offers");

  const users = getValue("users");

  const services = getValue("services");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = [];
  let totalPages = 1;

  if (
    getValue("PageName") === "Product" &&
    products !== null &&
    products !== undefined &&
    products.length > 0
  ) {
    currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    totalPages = Math.ceil(products.length / itemsPerPage);
  } else if (
    getValue("PageName") === "Category" &&
    categories !== null &&
    categories !== undefined &&
    categories.length > 0
  ) {
    currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
    totalPages = Math.ceil(categories.length / itemsPerPage);
  } else if (
    getValue("PageName") === "Offer" &&
    offers !== null &&
    offers !== undefined &&
    offers.length > 0
  ) {
    currentItems = offers.slice(indexOfFirstItem, indexOfLastItem);
    totalPages = Math.ceil(offers.length / itemsPerPage);
  } else if (
    getValue("PageName") === "Service" &&
    services !== null &&
    services !== undefined &&
    services.length > 0
  ) {
    currentItems = services.slice(indexOfFirstItem, indexOfLastItem);
    totalPages = Math.ceil(services.length / itemsPerPage);
  } else if (
    getValue("PageName") === "User" &&
    users !== null &&
    users !== undefined &&
    users.length > 0
  ) {
    currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    totalPages = Math.ceil(users.length / itemsPerPage);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddToCart = (item) => {
    let cartKey = "";
    let existingCartItems = [];

    switch (getValue("PageName")) {
      case "Product":
        cartKey = "cartProducts";
        break;
      case "Service":
        cartKey = "cartServices";
        break;
      case "Offer":
        cartKey = "cartOffers";
        break;
      default:
        console.error("Invalid PageName for adding to cart");
        return;
    }

    existingCartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingItemIndex = existingCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex > -1) {
      existingCartItems[existingItemIndex].qty++;
    } else {
      item.qty = 1;
      existingCartItems.push(item);
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCartItems));
    setValue(cartKey, existingCartItems);
    console.log(`${getValue("PageName")} added to cart:`, item);
    setValue("AlertType", "primary");
    setValue("AlertMessage", `${getValue("PageName")} added to cart!`);
    setValue("AlertVisibility", true);
  };

  const handleDelete = async (id) => {
    try {
      let result;
      switch (getValue("PageName")) {
        case "Product":
          result = await deleteProduct(id);
          break;
        case "Category":
          result = await deleteCategory(id);
          break;
        case "Offer":
          result = await deleteOffer(id);
          break;
        case "Service":
          result = await deleteService(id);
          break;
        case "User":
          result = await deleteUser(id);
          break;
        default:
          console.error("Invalid PageName for deletion");
          return;
      }

      if (result.ok) {
        setValue("updatePage", "all");
      } else {
        console.error("Error deleting:", result.message);
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const calculateDiscountedPrice = (product, offer) => {
    const discountAmount = (product.price * offer.discountPercentage) / 100;
    return product.price - discountAmount;
  };

  const handleEditClick = (item) => {
    if (getValue("PageName") === "Category") {
      setValue("SelectedCategory", item);
      setValue("isCategoryEditMode", true);
    } else if (getValue("PageName") === "Product") {
      setValue("SelectedProduct", item);
      setValue("isProductEditMode", true);
    } else if (getValue("PageName") === "Offer") {
      setValue("SelectedOffer", item);
      setValue("isOfferEditMode", true);
    } else if (getValue("PageName") === "Service") {
      setValue("SelectedService", item);
      setValue("isServiceEditMode", true);
    } else if (getValue("PageName") === "User") {
      setValue("SelectedUser", item);
      setValue("isUserEditMode", true);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <a className="page-link" href="#" onClick={() => handlePageChange(i)}>
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  if (getValue("PageName") === "Product") {
    return (
      <div className="container">
        <div className="row">
          {currentItems.map((product) => (
            <div key={product.id} className="col-sm-6 col-lg-3">
              <div
                className="card d-block"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  marginBottom: "1.5rem",
                }}
              >
                <img
                  className="card-img-top img-fluid"
                  src={apiUrl + product.imageUrl}
                  alt="Card image cap"
                  style={{
                    height: "15rem",
                    objectFit: "cover",
                    borderBottom: "1px solid #ddd",
                  }}
                />
                <div className="card-body">
                  <div className="row">
                    <div className="col float-start">
                      <div
                        className="badge bg-info-subtle text-info rounded-pill mb-1 fs-5"
                        style={{
                          padding: "0.4rem 0.8rem",
                          borderRadius: "50px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {(static_categories || []).find(
                          (cat) => cat.id === product.categoryId
                        )?.categoryName}
                      </div>
                    </div>
                    <div className="col float-end">
                      <div
                        className={`badge bg-${
                          product.status === "instock"
                            ? "info-subtle"
                            : "pink-subtle"
                        } text-${
                          product.status === "instock" ? "info" : "pink"
                        } rounded-pill mb-1 fs-5`}
                        style={{
                          padding: "0.4rem 0.8rem",
                          borderRadius: "50px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {product.status === "instock"
                          ? "in stock"
                          : "out of stock"}
                      </div>
                    </div>
                  </div>
                  <h4
                    className="card-title"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {product.productName}
                  </h4>
                  <p
                    className="card-title"
                    style={{
                      fontSize: "1rem",
                      color: "#333",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {product.description}
                  </p>
                  <p
                    className="card-text text-primary"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#007bff",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {`RS ${product.price.toFixed(2)}`}
                  </p>
                  <div className="btn-group gap-2">
                    {getValue("userType") === "customer" ? (
                      <button
                        type="button"
                        className="btn btn-outline-success rounded-pill"
                        onClick={() => handleAddToCart(product)}
                        style={{
                          borderRadius: "20px",
                          padding: "0.5rem 1rem",
                          margin: "0.25rem",
                        }}
                      >
                        <i className="ri-shopping-cart-2-line"></i> Add to Cart
                      </button>
                    ) : getValue("userType") ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-outline-primary rounded-pill"
                          onClick={() => handleEditClick(product)}
                          style={{
                            borderRadius: "20px",
                            padding: "0.5rem 1rem",
                            margin: "0.25rem",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger rounded-pill"
                          onClick={() => handleDelete(product.id)}
                          style={{
                            borderRadius: "20px",
                            padding: "0.5rem 1rem",
                            margin: "0.25rem",
                          }}
                        >
                          Delete
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Pagination */}
          <nav>
            <ul className="pagination pagination-rounded mb-2 justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    margin: "0 0.25rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              {renderPageNumbers()}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    margin: "0 0.25rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else if (getValue("PageName") === "Category") {
    return (
      <div className="container">
        <div className="row">
          {currentItems.map((category) => (
            <div key={category.id} className="col-sm-6 col-lg-3">
              <div
                className="card d-block"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  marginBottom: "1.5rem",
                }}
              >
                <div className="card-body">
                  <h4
                    className="card-title"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {category.categoryName}
                  </h4>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "1rem",
                      color: "#333",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {category.description}
                  </p>
                  <div className="btn-group gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary rounded-pill"
                      onClick={() => handleEditClick(category)}
                      style={{
                        borderRadius: "20px",
                        padding: "0.5rem 1rem",
                        margin: "0.25rem",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger rounded-pill"
                      onClick={() => handleDelete(category.id)}
                      style={{
                        borderRadius: "20px",
                        padding: "0.5rem 1rem",
                        margin: "0.25rem",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Pagination */}
          <nav>
            <ul className="pagination pagination-rounded mb-2 justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    margin: "0 0.25rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              {renderPageNumbers()}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    margin: "0 0.25rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else if (getValue("PageName") === "Offer") {
    return (
      <div className="container">
        <div className="row">
          {currentItems.map((offer) => {
            const product = (static_products || []).find(
              (pro) => pro.id === offer.productId
            );
            if (!product) return null; // Handle case where product is not found

            const discountedPrice = calculateDiscountedPrice(product, offer);

            return (
              <div key={offer.id} className="col-sm-6 col-lg-3">
                <div
                  className="card d-block"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    marginBottom: "1.5rem",
                  }}
                >
                  <img
                    className="card-img-top img-fluid"
                    src={apiUrl + product.imageUrl}
                    alt="Card image cap"
                    style={{
                      height: "15rem",
                      objectFit: "cover",
                      borderBottom: "1px solid #ddd",
                    }}
                  />
                  <div className="card-body">
                    <h4
                      className="card-title"
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {offer.offerName}
                    </h4>
                    <p
                      className="card-text text-pink"
                      style={{
                        fontSize: "1rem",
                        color: "#333",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {product.productName}
                    </p>
                    <p
                      className="card-text"
                      style={{
                        fontSize: "1rem",
                        color: "#333",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {offer.description}
                    </p>
                    <p
                      className="card-text text-primary"
                      style={{ fontSize: "1rem", marginBottom: "0.75rem" }}
                    >
                      Discount: {`${offer.discountPercentage} %`}
                    </p>
                    <p
                      className="card-text"
                      style={{ fontSize: "1rem", marginBottom: "0.75rem" }}
                    >
                      Start Date: {new Date(offer.startDate).getFullYear()}-
                      {("0" + (new Date(offer.startDate).getMonth() + 1)).slice(
                        -2
                      )}
                      -{("0" + new Date(offer.startDate).getDate()).slice(-2)}
                    </p>
                    <p
                      className="card-text"
                      style={{ fontSize: "1rem", marginBottom: "0.75rem" }}
                    >
                      End Date: {new Date(offer.endDate).getFullYear()}-
                      {("0" + (new Date(offer.endDate).getMonth() + 1)).slice(
                        -2
                      )}
                      -{("0" + new Date(offer.endDate).getDate()).slice(-2)}
                    </p>
                    <p
                      className="card-text text-white badge bg-info-subtle rounded-pill mb-3"
                      style={{ fontSize: "1rem" }}
                    >
                      {`RS ${discountedPrice.toFixed(2)} only`}
                    </p>
                    <div className="btn-group gap-2">
                      {getValue("userType") === "customer" ? (
                        <button
                          type="button"
                          className="btn btn-outline-success rounded-pill"
                          onClick={() => handleAddToCart(offer)}
                          style={{
                            borderRadius: "20px",
                            padding: "0.5rem 1rem",
                            margin: "0.25rem",
                          }}
                        >
                          <i className="ri-shopping-cart-2-line"></i> Add to
                          Cart
                        </button>
                      ) : getValue("userType") ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-outline-primary rounded-pill"
                            onClick={() => handleEditClick(offer)}
                            style={{
                              borderRadius: "20px",
                              padding: "0.5rem 1rem",
                              margin: "0.25rem",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger rounded-pill"
                            onClick={() => handleDelete(offer.id)}
                            style={{
                              borderRadius: "20px",
                              padding: "0.5rem 1rem",
                              margin: "0.25rem",
                            }}
                          >
                            Delete
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Pagination */}
          <nav>
            <ul className="pagination pagination-rounded mb-2 justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    margin: "0 0.25rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              {renderPageNumbers()}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    margin: "0 0.25rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else if (getValue("PageName") === "Service") {
    return (
      <div className="container">
        <div className="row">
          {currentItems.map((service) => (
            <div key={service.id} className="col-sm-6 col-lg-3">
              <div
                className="card d-block"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  marginBottom: "1.5rem",
                }}
              >
                <div className="card-body">
                  <h4
                    className="card-title"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {service.serviceName}
                  </h4>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "1rem",
                      color: "#333",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {service.description}
                  </p>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#007bff",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Price: {service.price}
                  </p>
                  <div className="btn-group gap-2">
                    {getValue("userType") === "customer" ? (
                      <button
                        type="button"
                        className="btn btn-outline-success rounded-pill"
                        onClick={() => handleAddToCart(service)}
                        style={{
                          borderRadius: "20px",
                          padding: "0.5rem 1rem",
                          margin: "0.25rem",
                        }}
                      >
                        <i className="ri-shopping-cart-2-line"></i> Add to Cart
                      </button>
                    ) : getValue("userType") ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-outline-primary rounded-pill"
                          onClick={() => handleEditClick(service)}
                          style={{
                            borderRadius: "20px",
                            padding: "0.5rem 1rem",
                            margin: "0.25rem",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger rounded-pill"
                          onClick={() => handleDelete(service.id)}
                          style={{
                            borderRadius: "20px",
                            padding: "0.5rem 1rem",
                            margin: "0.25rem",
                          }}
                        >
                          Delete
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Pagination */}
          <nav>
            <ul className="pagination pagination-rounded mb-2 justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    margin: "0 0.25rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              {renderPageNumbers()}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    margin: "0 0.25rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else if (getValue("PageName") === "User") {
    return (
      <div className="container">
        <div className="row">
          {currentItems.map((user) => (
            <div key={user.id} className="col-sm-6 col-lg-3">
              <div
                className="card d-block"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  marginBottom: "1.5rem",
                }}
              >
                <div className="card-body">
                  <p
                    className="card-text"
                    style={{
                      fontSize: "1rem",
                      color: "#333",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Email: {user.email}
                  </p>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "1rem",
                      color: "#333",
                      marginBottom: "0.75rem",
                    }}
                  >
                    User Type: {user.userType}
                  </p>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "1rem",
                      color: "#333",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Status: {user.status}
                  </p>
                  <div className="btn-group gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary rounded-pill"
                      onClick={() => handleEditClick(user)}
                      style={{
                        borderRadius: "20px",
                        padding: "0.5rem 1rem",
                        margin: "0.25rem",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger rounded-pill"
                      onClick={() => handleDelete(user.id)}
                      style={{
                        borderRadius: "20px",
                        padding: "0.5rem 1rem",
                        margin: "0.25rem",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Pagination */}
          <nav>
            <ul className="pagination pagination-rounded mb-2 justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    margin: "0 0.25rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              {renderPageNumbers()}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    margin: "0 0.25rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else {
    return <div>No data found</div>;
  }
};

export default ItemCardGrid;
