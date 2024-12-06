import React, { useState,useEffect } from 'react';
import "./Menu.css";
import axios from 'axios';
const Menu = () => {

   
    const userid = localStorage.getItem('login_id');
    const login_user = localStorage.getItem('login_user');

    const [menu,setMenu] = useState([]);
    const [cart,setCart] = useState([]);
    const [categories,setCategories] = useState([]);
    

    const [name,setName] = useState([]);
    const [price,setPrice] = useState([]);
    const [description,setDescription] = useState([]);
    const [image,setImage] = useState([]);
    const [category,setCategory] = useState([]);
    const [menuid,setMenuid] = useState([]);


    const [qty,setQty] = useState(1);
    const [spiceness,setSpiceness] = useState('Mild');
    
    const [showProfile, setShowProfile] = useState(false);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    
    useEffect(() => {
        // Fetch the menu items from a server or API
        fetchMenuItems();
        fetchCartItems();
        fetchMenuCategories();
    }, []);

    const fetchMenuCategories = async () =>{
        const res = await  axios.get('http://localhost:8080/menu/categories');
        setCategories(res.data);
    }

    const fetchMenuItems = async () =>{
        const res = await  axios.get('http://localhost:8080/menu/get');
        setMenu(res.data);
    }

    const filterMenu = async (category) =>{
        const res = await  axios.get('http://localhost:8080/menu/categories/'+category);
        setMenu(res.data);
    }

    const filterSearch = async (keyword) =>{

        if(keyword == '')
            return;

        const res = await axios.get('http://localhost:8080/menu/search/'+keyword);
        setMenu(res.data);
    }

    const fetchCartItems = async () =>{
        const res = await  axios.get('http://localhost:8080/cart/get/'+userid);
        setCart(res.data);
        // console.log(res.data);
    }

    const getMenuItem  =  async (id) =>{
        const res = await  axios.get('http://localhost:8080/menu/get/'+id);
        // console.log(res);
        setName(res.data.name);
        setPrice(res.data.price);
        setDescription(res.data.description);
        setImage(res.data.image);
        setCategory(res.data.category);
        setMenuid(res.data.id);
    }


    const addToCart = async () => {
        const data = {
            name: name,
            price: price,
            description: description,
            img: image,
            qty: qty,
            spicy: spiceness,
            userid: userid
        };
        // console.log(data);
        // return;

        await axios.post('http://localhost:8080/cart/add', data);
        alert('Item added to cart');
        fetchCartItems();
        
    }

    const deleteCartItem = async (id) => {
        await axios.delete('http://localhost:8080/cart/delete/'+id);
        // alert('Cart Item Removed Successfully!');
        fetchCartItems();
    }



    return (
        <div className="menu">
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                <div className="container">
                    <a className="nav-link text-white me-4 category-icon"  data-bs-toggle="offcanvas" href="#categoryCanvas">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </a>
                    <a className="navbar-brand" href="/">Log out</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        
                    <li className="nav-item">
    <a 
        className="nav-link active me-3" 
        aria-current="page" 
        href="#" 
        onClick={() => setShowProfile(true)} 
    >
        Welcome, {login_user}
    </a>
</li>

                        <li className="nav-item">
                        <a className="nav-link text-white" href="#" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                            <span>Cart </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                            </svg>
                            <span className="badge bg-danger ms-1">{cart.length}</span>
                        </a>
                        </li>
                        
                    </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12 mb-4">
                        <input type="search" onChange={(e) => filterSearch(e.target.value)} placeholder="Search By Name, Category...." className="form-control form-control-lg" />
                    </div>
                    {
                        menu.map((item,index) => (
                            <div className="col-lg-4 mb-4" key={index}>
                                <div className="card menu-card h-100">
                                    <img src={item.image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <h4>${ item.price }</h4>
                                        <a href="#" onClick={() => getMenuItem(item.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                   
                </div>
            </div>
            {showProfile && (
    <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">User Profile</h5>
                    <button type="button" className="btn-close" onClick={() => setShowProfile(false)}></button>
                </div>
                <div className="modal-body">
                    <p><strong>Username:</strong> {login_user}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowProfile(false)}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
)}




            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Menu</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body menu-modal">
                        <div className="row">
                        <div className="col-lg-5">
                    <img 
                        src={image} 
                        alt={name} 
                        className="img-fluid" 
                        style={{ maxHeight: "280px",maxWidth:"300px", borderRadius: "10px", objectFit: "cover" }} 
                    />
                     </div>
                            <div className="col-lg-7">
                                <h2>{name}</h2>
                                <h6>{category}</h6>
                                <p>{description}</p>
                                <h4>${price}</h4>
                                <div className='row'>
                                    <div className="col-lg-5">
                                        <label>Qty</label>
                                        <input type="number" value={qty} className="form-control"  min="1" max="10" onChange={(e) => setQty(e.target.value)}  />
                                    </div>
                                    <div className="col-lg-7">
                                        <label>Spiciness</label>
                                        <select  className="form-control form-select" value={spiceness} onChange={(e) => setSpiceness(e.target.value)} >
                                            <option value="Mild">Mild</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hot">Hot</option>    
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


            <div className="offcanvas offcanvas-end" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="staticBackdropLabel">Cart</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                <hr />
            </div>
            <div className="offcanvas-body" style={{position: "relative"}}>
                <ul className="list-group">
                    {
                        cart.length > 0 ?(

                      
                        cart.map((item, index) => (

                            <li className="list-group-item cart-list" key={index} >
                                <div className="row">
                                    <div className="col-lg-3">
                                        <img src={item.img} className="w-100" />
                                    </div>
                                    <div className="col-lg-8">
                                        <h6 className="mb-0">{item.name}</h6>
                                        <small>Spicy: {item.spicy}</small><br />
                                        <small>${item.price} x {item.qty}</small>
                                    </div>
                                    <div className="col-lg-1 d-flex align-items-center">
                                        <a onClick={() => deleteCartItem(item.id)} href="#" className="btn btn-sm btn-danger p-2 ">
                                            x
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="text-center">
                            <h2>Cart is Empty</h2>
                        </div>
                    )
                    }
                </ul>
                {
                     cart.length > 0 ?(
                        <div className="pt-5"  style={{position: "absolute",bottom: "0",left:0,padding:"20px",width:"100%",background:"#fff"}}>
                            <hr />
                            <h4 className="d-flex justify-content-between align-items-center">
                                <span>Total Amount:</span>
                                <b>${ cartTotal }</b>
                            </h4>
                            <button className="btn btn-warning" onClick={() => alert('Proceeding to checkout...')}>
                                Proceed to Checkout
                            </button>
                        </div>
                     ): null
                }
                
            </div>
            </div>
            {showProfile && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">User Profile</h5>
                                <button type="button" className="btn-close" onClick={() => setShowProfile(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Username:</strong> {login_user}</p>
                               
                                
                               
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowProfile(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


    
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="categoryCanvas" aria-labelledby="categoryCanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu Categories</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        {
                            categories.map((category, index) => (
                                <button key={index} onClick={() => filterMenu(category)} className="btn btn-primary mb-3">{category}</button>
                            ))
                        }
                        
                    </div>
                </div>
            </div>


        </div>
    );  
};

export default Menu;
