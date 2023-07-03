import React, { useState } from 'react';
import '../Checklist.css';


const Checklist = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, { text: newItem, checked: false }]);
      setNewItem('');
    }
  };

  const showDeletePopup = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };

  const hideDeletePopup = () => {
    setShowDeleteConfirmation(false);
  };

  const deleteItem = () => {
    const updatedItems = [...items];
    updatedItems.splice(deleteIndex, 1);
    setItems(updatedItems);
    hideDeletePopup();
  };

  const toggleItem = (index) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
  
    // Reset the reset confirmation state
    hideResetPopup();
  };
  
  

  const showResetPopup = () => {
    setShowResetConfirmation(true);
  };

  const hideResetPopup = () => {
    setShowResetConfirmation(false);
  };

  const resetItems = () => {
    const checkedItems = items.some((item) => item.checked);
    if (checkedItems) {
      const updatedItems = items.map((item) => {
        item.checked = false;
        return item;
      });
      setItems(updatedItems);
    }
    hideResetPopup();
  };
  
  

  return (
    <div className="checklist-container">
      <h1>Checklist App</h1>
      <div className="input-container">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter an item"
        />
        <button onClick={addItem}>Add</button>
      </div>
      <ul className="checklist">
        {items.map((item, index) => (
          <li key={index} className={item.checked ? 'checked' : ''}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(index)}
            />
            <span className="item-text">{item.text}</span>
            <button onClick={() => showDeletePopup(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="reset-button" onClick={showResetPopup}>
        Reset
      </button>

      {showDeleteConfirmation && (
  <div className="popup">
    <div className="popup-content">
      <h2>Confirmation</h2>
      <p>Do you want to delete this task?</p>
      <div className="popup-buttons">
        <button onClick={deleteItem}>Yes</button>
        <button onClick={hideDeletePopup}>No</button>
      </div>
    </div>
  </div>
)}

{showResetConfirmation && items.some((item) => item.checked) && (
  <div className="popup">
    <div className="popup-content">
      <h2>Confirmation</h2>
      <p>Do you want to reset this list?</p>
      <div className="popup-buttons">
        <button onClick={resetItems}>Yes</button>
        <button onClick={hideResetPopup}>No</button>
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default Checklist;
