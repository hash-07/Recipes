 import React,{useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
const App_id = '8b4688f3';
const App_key = '1890645a21caa81730b51b96e8d7ff68';


const [recipes, setRecipes]= useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('chicken');

useEffect( () => {
getRecipe(); 
 }, [query]);

const getRecipe = async () => {
  const responce = await (
  fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_id}&app_key=${App_key}`)
  );

  const data = await responce.json(); 
  setRecipes(data.hits);
  console.log(data.hits);  
};


const updateSearch = e => {
  setSearch(e.target.value);
  
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

return (
  <div className="App"> 
  <form className="search-form" onSubmit={getSearch}>
    <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
    <button className="search-button" type="submit"> Search </button>

  </form>

  <div className='items'>
  {recipes.map(recipe => (
    <Recipe 
    key={recipe.recipe.label}
    title={recipe.recipe.label}
    calories={recipe.recipe.calories}
    image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
    />
    ))}
  </div>
  </div>
  );
};
export default App;
