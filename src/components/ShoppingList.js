import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import uuid from "react";
import {v4 as uuidv4} from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search,setSelectedSearch] = useState('');
  const [formData,setFormData] = useState({
    name:"",
    category:"Produce"
  })
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event){
    setSelectedSearch("");
    setSelectedSearch(event.target.value)
  }

  function handleNewItem(event){
    const itemName = event.target.name.value;
    let itemCategory = event.target.category.value;
    console.log('item' + itemCategory);
    console.log('category' + itemCategory)
    setFormData({
      name:itemName,
      category:itemCategory
    })
  }

  function handleOnItemFormSubmit(event){
    event.preventDefault();
    const itemName=event.target.name.value;
    const itemCategory=event.target.category.value;
    const newItem ={
      id:uuid(),
      name:itemName,
      category:itemCategory,
    };
  }

  const itemsToDisplay = items.filter((item) => {
    if(search !=='') return item.name ===search
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm OnItemFormSubmit={handleOnItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
