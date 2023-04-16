import React from 'react'
import '../App.css'
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [active, setActive] = useState(null);
    const [display, setDisplay] = useState("products");


    const user = localStorage.getItem("user");

    useEffect(() => {
        if (!user) {
            window.location.href = "/login";
        }
    }, [user])

    const [supplierName, setSupplierName] = useState("");
    const url = `https://aws-server-uk80.onrender.com/api/v1/products`;

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(url);
            console.log("Axios data", response.data);
            setData(response.data);
        }
        fetchData();
    }, [url]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `https://aws-server-uk80.onrender.com/api/v1/suppliers`
            );
            console.log("Axios Suppliers data", response.data);
            setSuppliers(response.data);
            setSupplierName(response.data[0]?.supplier_name);
            setActive(response.data[0]?.supplier_name);
        }
        fetchData();
    }, [url]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `https://aws-server-uk80.onrender.com/api/v1/customers`
            );
            console.log("Axios Customers data", response.data);
            setCustomers(response.data);
        }
        fetchData();
    }, [url]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `https://aws-server-uk80.onrender.com/api/v1/employees`
            );
            console.log("Axios Employees Data", response.data);
            setEmployees(response.data);
        }
        fetchData();
    }, [url]);

    const findSupplierProducts = data.filter((item) => {
        return item.supplier_name === supplierName;
    });

    const handleProductsDisplay = (supplier) => {
        setDisplay("products");
        setSupplierName(supplier.supplier_name);
        setActive(supplier.supplier_name);
    };

    const handleDisplayCustomers = () => {
        setDisplay("customers");
        setActive("customers");
    };

    function getItemNamefromId(id) {
        const items = data.filter((item) => {
            return item.item_id === id;
        });
        return items[0].item_name;
    }

    console.log("Supplier Name", supplierName);
    console.log("Find Supplier Products", findSupplierProducts);
    return (
        <div className="App">
            <header>
                <nav className="nav">
                    <div className="log0">
                        {/* Logo */}
                        <h1>ASR</h1>
                    </div>
                    <div className="items">
                        {/* Links */}
                        <ul className="">
                            {suppliers?.map((supplier) => {
                                return (
                                    <li
                                        className={
                                            active === supplier.supplier_name ? "active" : ""
                                        }
                                        onClick={() => handleProductsDisplay(supplier)}
                                        key={supplier.supplier_id}
                                    >
                                        {supplier.supplier_name}
                                    </li>
                                );
                            })}
                            <li
                                onClick={() => handleDisplayCustomers()}
                                className={
                                    active === "customers" ? "extra-link active" : "extra-link"
                                }
                            >
                                CUSTOMERS
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            {display === "products" && (
                <div>
                    {/* Body */}
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Item_Name</th>
                                <th scope="col">Item_Price</th>
                                <th scope="col">Item_Supplier</th>
                                <th scope="col">Item_Inventory</th>
                                <th scope="col">Item_Qty</th>
                            </tr>
                        </thead>
                        {findSupplierProducts && (
                            <tbody>
                                {findSupplierProducts.map((products) => {
                                    return (
                                        <tr key={products.item_id}>
                                            <th scope="row">{products.item_name}</th>
                                            <td>{products.item_price}</td>
                                            <td>{products.supplier_name}</td>
                                            <td>{products.inventory_address}</td>
                                            <td>{products.item_quantity}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        )}
                    </table>
                </div>
            )}
            {display === "customers" && (
                <div>
                    {/* Customers Body */}
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Number</th>
                                <th scope="col">Customer_Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">Item_Bought</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Purchase_Date</th>
                            </tr>
                        </thead>
                        {customers && (
                            <tbody>
                                {customers.map((customer, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{customer.customer_name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.address}</td>
                                            <td>{getItemNamefromId(customer.item_id)}</td>
                                            <td>{customer.purchase_quantity}</td>
                                            <td>{customer.purchase_date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        )}
                    </table>
                </div>
            )}
        </div>
    )
}

export default Home