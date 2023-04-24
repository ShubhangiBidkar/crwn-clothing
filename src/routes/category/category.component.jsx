import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { CategoriesContext } from '../../contexts/categories.context';
import { selectCategoriesMap } from '../../store/categories/categories.selector';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  //console.log(category);
  console.log('render/reRendering category component');
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap =useSelector(selectCategoriesMap);
  console.log(categoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  
  

  useEffect(() => {
    console.log('Effect fired calling setProducts');
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;