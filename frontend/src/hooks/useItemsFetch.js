/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { getAllCategories } from '../api/categoryApi';
import { getAllOffers } from '../api/offerApi';
import { getAllProducts } from '../api/productApi';
import { getAllServices } from '../api/serviceApi';
import { getAllUsers } from '../api/userApi';
import { getAllOrders } from '../api/orderApi'; // new import
import { UniversalContext } from '../context/UniversalContext';

const useItemsFetch = () => {
  const { setValue, getValue } = useContext(UniversalContext);
  useEffect(() => {
    const fetchItems = async () => {
      setValue("fetchLoading", true);
      try {
        const categoriesResponse = await getAllCategories();
        const offersResponse = await getAllOffers();
        const productsResponse = await getAllProducts();
        const servicesResponse = await getAllServices();
        const usersResponse = await getAllUsers();
        const ordersResponse = await getAllOrders(); // new API call

        if (categoriesResponse.ok) {
          setValue("categories", categoriesResponse.categories);
          setValue("static-categories", categoriesResponse.categories);
        } else {
          setValue("AlertType", "danger");
          setValue("AlertMessage", categoriesResponse.message);
          setValue("AlertVisibility", true);
        }

        if (offersResponse.ok) {
          setValue("offers", offersResponse.offers);
          setValue("static-offers", offersResponse.offers);
        } else {
          setValue("AlertType", "danger");
          setValue("AlertMessage", offersResponse.message);
          setValue("AlertVisibility", true);
        }

        if (productsResponse.ok) {
          setValue("products", productsResponse.products);
          setValue("static-products", productsResponse.products);
        } else {
          setValue("AlertType", "danger");
          setValue("AlertMessage", productsResponse.message);
          setValue("AlertVisibility", true);
        }

        if (servicesResponse.ok) {
          setValue("services", servicesResponse.services);
          setValue("static-services", servicesResponse.services);
        } else {
          setValue("AlertType", "danger");
          setValue("AlertMessage", servicesResponse.message);
          setValue("AlertVisibility", true);
        }

        if (usersResponse.ok) {
          setValue("users", usersResponse.users);
        } else {
          setValue("AlertType", "danger");
          setValue("AlertMessage", usersResponse.message);
          setValue("AlertVisibility", true);
        }

        if (ordersResponse.ok) {
          setValue("orders", ordersResponse.orders); // new state update
        } else {
          setValue("AlertType", "danger");
          setValue("AlertMessage", ordersResponse.message);
          setValue("AlertVisibility", true);
        }

        setValue("fetchLoading", false);
      } catch (error) {
        setValue("AlertType", "danger");
        setValue("AlertMessage", error.message);
        setValue("AlertVisibility", true);
        setValue("fetchLoading", false);
      }
    };

    if (getValue("updatePage") !== "done") {
      fetchItems();
      setValue("updatePage", "done");
    }
  }, [getValue("updatePage")]);
};

export default useItemsFetch;