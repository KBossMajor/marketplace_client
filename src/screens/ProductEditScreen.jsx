import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/loadingBox/LoadingBox';
import MessageBox from '../components/messageBox/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { categoryItems, regionItems } from '../data';

export default function ProductEditScreen() {
  const {id: productId} = useParams();
  const history = useHistory();
//   const productId = props.match.params.id;
  let categoryoption = useRef([]);
  let regionoption = useRef([]);
  categoryoption.current = categoryItems.categories.map((Item) => {
    let {id, name,} = Item
    return {id, name}
  })

  regionoption.current = regionItems.regions.filter((Item) => Item.parent_id === null)
  // console.log(regionoption.current)
  // let [categorystate, setCategorystate]=useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;


  const dispatch = useDispatch();

   useEffect(() => {
    if (successUpdate) {
      history.goBack();
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setSubcategory(product.subcategory);
      setDescription(product.description);
      setCity(product.city);
      setTown(product.town);
    }
  }, [product, dispatch, productId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
     dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        subcategory,
        countInStock,
        description,
        city,
        town
      })
    );
  }; 
   
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { user: loggedInUser } = userSignin;
 
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file); 
    setLoadingUpload(true);
    try {
      const { data } = await axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    //   console.log(error)
    }
  };

  const getSubCategory = (catName) => {
    let cat = categoryItems.categories.find((item)=>{
      return item.name === catName
    })

    let subcat = cat.childes.map((c)=>{
       let {id, name} = c;
       return {id , name}

    })
     
    return subcat;
  }


  const getSubRegion = (regName) => {
    let reg = regionItems.regions.find((item)=>{
      return item.name === regName
    })

    let subreg = regionItems.regions.filter((r)=>{
       
        return r.parent_id === reg.id
    })
     
    return subreg;
  }

  // console.log(getSubRegion('Jigawa State'))
  

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Select Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categoryoption.current.map((cat)=>(
                   <option value={cat.name} key={cat.id}>{cat.name}</option> 
                ))}
              </select>
            </div>
            {category && <div>
              <label htmlFor="subcategory">Brand</label>
              <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                {getSubCategory(category).map((subcat)=>(
                    <option value={subcat.name} key={subcat.id}>{subcat.name}</option> 
                  ))}
               </select>
            </div>}
            <div>
              <label htmlFor="city">Select City</label>
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                {regionoption.current.map((reg)=>(
                   <option value={reg.name} key={reg.id}>{reg.name}</option> 
                ))}
              </select> 
            </div>
            {city && <div>
              <label htmlFor="town">Select Town</label>
              <select value={town} onChange={(e) => setTown(e.target.value)}>
                {getSubRegion(city).map((subreg)=>(
                    <option value={subreg.name} key={subreg.id}>{subreg.name}</option> 
                  ))}
              </select>
            </div>}
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}