import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState(['Apple', 'Banana', 'Orange']);
  const [newFruit, setNewFruit] = useState('');

  //save reference for draggedItem and dragOverItem
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // // handle drag start
  // const onDragStart = (e, index) => {
  //   console.log('drag is started', index);
  // }

  // // handle drag enter
  // const onDragEnter = (e, index) => {
  //   console.log('drag is enter', index);
  // }

  // // handle drag end
  // const onDragEnd = (e, index) => {
  //   console.log('On drag end', index);
  // }

  // handle drag sorting
  const handleSort = () => {
    let _items = [...items];

    //remove and save the dragged item
    const draggedItemContent = _items.splice(dragItem.current, 1)[0]

    //switch position
    _items.splice(dragOverItem.current, 0, draggedItemContent);

    //reset
    dragItem.current = null;
    dragOverItem.current = null;

    //update array
    setItems(_items);
  }

  const onChangeHandle = (e) => {
    setNewFruit(e.target.value);
  }

  const saveNewFruit = () => {
    const _fruits = [...items];
    _fruits.push(newFruit);

    setItems(_fruits);
    setNewFruit('')
  }

  return (
    <div className="App">
      <h2>Fruit List</h2>
      <div className='input-group'>
        <input type="text" name='fruitName' placeholder='e.g Banana' onChange={onChangeHandle}/>
        <button className='btn' onClick={saveNewFruit}>Add Item</button>
      </div>

      {/* List container */}
      <div className='list-container'>
        { items.map((item,index) => (
          <div 
            className='list-item'
            key={index}
            draggable 
            onDragStart={(e) => dragItem.current = index}
            onDragEnter={(e) => dragOverItem.current = index}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            >
            <i className='fa-solid fa-bars'></i>
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
