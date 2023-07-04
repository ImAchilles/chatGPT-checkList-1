import React, { useState } from 'react';
import '../Checklist.css';

const Checklist = () => {
  const [checklists, setChecklists] = useState([]);
  const [currentChecklist, setCurrentChecklist] = useState('');
  const [newItemText, setNewItemText] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState([]);
  const [showResetConfirmation, setShowResetConfirmation] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);

  const addChecklist = () => {
    if (currentChecklist.trim() !== '') {
      setChecklists([...checklists, { name: currentChecklist, items: [] }]);
      setCurrentChecklist('');
      setShowDeleteConfirmation([...showDeleteConfirmation, false]);
      setShowResetConfirmation([...showResetConfirmation, false]);
    }
  };

  const addItem = (checklistIndex) => {
    if (newItemText[checklistIndex].trim() !== '') {
      const updatedChecklists = [...checklists];
      updatedChecklists[checklistIndex].items.push({ text: newItemText[checklistIndex], checked: false });
      setChecklists(updatedChecklists);
      setNewItemText((prev) => {
        const updatedText = [...prev];
        updatedText[checklistIndex] = '';
        return updatedText;
      });
    }
  };

  const toggleItem = (checklistIndex, itemIndex) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].items[itemIndex].checked = !updatedChecklists[checklistIndex].items[itemIndex].checked;
    setChecklists(updatedChecklists);
  };

  const deleteItem = (checklistIndex, itemIndex) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].items.splice(itemIndex, 1);
    setChecklists(updatedChecklists);
    hideDeletePopup(checklistIndex);
  };

  const resetItems = (checklistIndex) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].items.forEach((item) => {
      if (item.checked) {
        item.checked = false;
      }
    });
    setChecklists(updatedChecklists);
    hideResetPopup(checklistIndex);
  };

  const showDeletePopup = (checklistIndex, itemIndex) => {
    setShowDeleteConfirmation((prev) => {
      const updatedDeleteConfirmation = [...prev];
      updatedDeleteConfirmation[checklistIndex] = true;
      setCurrentItemIndex(itemIndex);
      return updatedDeleteConfirmation;
    });
  };

  const hideDeletePopup = (checklistIndex) => {
    const updatedDeleteConfirmation = [...showDeleteConfirmation];
    updatedDeleteConfirmation[checklistIndex] = false;
    setShowDeleteConfirmation(updatedDeleteConfirmation);
  };

  const showResetPopup = (checklistIndex) => {
    const updatedResetConfirmation = [...showResetConfirmation];
    updatedResetConfirmation[checklistIndex] = true;
    setShowResetConfirmation(updatedResetConfirmation);
  };

  const hideResetPopup = (checklistIndex) => {
    const updatedResetConfirmation = [...showResetConfirmation];
    updatedResetConfirmation[checklistIndex] = false;
    setShowResetConfirmation(updatedResetConfirmation);
  };

  return (
    <div className="checklist-container">
      <h1>Checklist App</h1>

      <div className="checklist-form">
        <input
          type="text"
          value={currentChecklist}
          onChange={(e) => setCurrentChecklist(e.target.value)}
          placeholder="Enter checklist name"
        />
        <button onClick={addChecklist}>Create Checklist</button>
      </div>

      {checklists.map((checklist, checklistIndex) => (
        <div key={checklistIndex} className="checklist-wrapper">
          <h2>{checklist.name}</h2>

          <div className="input-container">
            <input
              type="text"
              value={newItemText[checklistIndex]}
              onChange={(e) => {
                const updatedText = [...newItemText];
                updatedText[checklistIndex] = e.target.value;
                setNewItemText(updatedText);
              }}
              placeholder="Enter an item"
            />
            <button onClick={() => addItem(checklistIndex)}>Add</button>
          </div>

          <ul className="checklist">
            {checklist.items.map((item, itemIndex) => (
              <li key={itemIndex} className={item.checked ? 'checked' : ''}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItem(checklistIndex, itemIndex)}
                />
                <span className="item-text">{item.text}</span>
                <button onClick={() => showDeletePopup(checklistIndex, itemIndex)}>Delete</button>
              </li>
            ))}
          </ul>

          <button
            className="reset-button"
            onClick={() => showResetPopup(checklistIndex)}
            disabled={!checklist.items.some((item) => item.checked)}
          >
            Reset
          </button>

          {showDeleteConfirmation[checklistIndex] && (
            <div className="popup">
              <div className="popup-content">
                <h2>Confirmation</h2>
                <p>Do you want to delete this task?</p>
                <div className="popup-buttons">
                  <button onClick={() => deleteItem(checklistIndex, currentItemIndex)}>Yes</button>
                  <button onClick={() => hideDeletePopup(checklistIndex)}>No</button>
                </div>
              </div>
            </div>
          )}

          {showResetConfirmation[checklistIndex] && (
            <div className="popup">
              <div className="popup-content">
                <h2>Confirmation</h2>
                <p>Do you want to reset this list?</p>
                <div className="popup-buttons">
                  <button onClick={() => resetItems(checklistIndex)}>Yes</button>
                  <button onClick={() => hideResetPopup(checklistIndex)}>No</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Checklist;
