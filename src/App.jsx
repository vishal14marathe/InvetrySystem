import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Apples', category: 'Fruits', quantity: 15 },
    { id: 2, name: 'Bananas', category: 'Fruits', quantity: 8 },
    { id: 3, name: 'Carrots', category: 'Vegetables', quantity: 20 },
  ]);
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: '' });
  const [filterCategory, setFilterCategory] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity) {
      setInventory([
        ...inventory,
        { id: Date.now(), name: newItem.name, category: newItem.category, quantity: parseInt(newItem.quantity) },
      ]);
      setNewItem({ name: '', category: '', quantity: '' });
    }
  };

  const handleEditItem = (id, updatedItem) => {
    setInventory(inventory.map(item => (item.id === id ? { ...item, ...updatedItem } : item)));
  };

  const handleDeleteItem = id => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const handleSortByQuantity = () => {
    const sortedInventory = [...inventory].sort((a, b) => (sortAscending ? a.quantity - b.quantity : b.quantity - a.quantity));
    setInventory(sortedInventory);
    setSortAscending(!sortAscending);
  };

  const filteredInventory = filterCategory
    ? inventory.filter(item => item.category.toLowerCase() === filterCategory.toLowerCase())
    : inventory;

  return (
    <div className="app">
      <h1>Inventory Management</h1>

      <div className="add-item">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={e => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Category"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        />
        <button onClick={handleSortByQuantity}>
          Sort by Quantity ({sortAscending ? 'Ascending' : 'Descending'})
        </button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map(item => (
            <tr key={item.id} className={item.quantity < 10 ? 'low-stock' : ''}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleEditItem(item.id, { ...item, quantity: item.quantity + 1 })}>+</button>
                <button onClick={() => handleEditItem(item.id, { ...item, quantity: item.quantity - 1 })}>-</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
