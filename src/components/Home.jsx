import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Loading from './Loading';
import MessageBox from './MessageBox';

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/products')
        console.log(res)
        setProducts(res.data);
        setLoading(false);
      } catch(err) {
        setError(err)
      }
    }
    fetchData()
  }, [])

  return <ul className="products">
    {
      loading? <Loading/> : error? <MessageBox variant="danger">{error}</MessageBox> : (
        products.map(product =>
        <li key={product._id}>
          <div className="product">
            <Link to={'/product/' + product._id}>
              <img className="product-image" src={product.image} alt="product" />

            </Link>
            <div className="product-name">
              <Link to={'/product/' + product._id}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
          </div>
        </li>)
      )
    }



  </ul>
}
export default Home;