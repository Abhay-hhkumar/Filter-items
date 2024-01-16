import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeItemIndex, setActiveItemIndex] = useState(null); 
  const [activeSelectedItem,setActiveSelectedItem]=useState(false);

  // all items
  const peopleData = [
    {
      id: 1,
      name: "Aarav Patel",
      email: "aarav.patel@example.com",
      image: "images/1.jpg",
    },
    {
      id: 2,
      name: "Zara Khan",
      email: "zara.khan@example.com",
      image: "images/2.jpg",
    },
    {
      id: 3,
      name: "Rohan Sharma",
      email: "rohan.sharma@example.com",
      image: "images/3.jpg",
    },
    {
      id: 4,
      name: "Ananya Verma",
      email: "ananya.verma@example.com",
      image: "images/4.jpg",
    },
    {
      id: 5,
      name: "Kabir Singh",
      email: "kabir.singh@example.com",
      image: "images/5.jpg",
    },
    {
      id: 6,
      name: "Mira Kapoor",
      email: "mira.kapoor@example.com",
      image: "images/6.jpg",
    },
    {
      id: 7,
      name: "Aryan Sharma",
      email: "aryan.sharma@example.com",
      image: "images/7.jpg",
    },
    {
      id: 8,
      name: "Aisha Khan",
      email: "aisha.khan@example.com",
      image: "images/8.jpg",
    },
    {
      id: 9,
      name: "Raj Malhotra",
      email: "raj.malhotra@example.com",
      image: "images/9.jpg",
    },
    {
      id: 10,
      name: "Priya Desai",
      email: "priya.desai@example.com",
      image: "images/10.jpg",
    },
  ];

  // make the specific text bold on filter
  const highlightMatch = (text, search) => {
    const regex = new RegExp(`(${search})`, 'gi');
    return text.split(regex).map((part, index) => (
        regex.test(part) ? <span key={index} className="matched-text">{part}</span> : part
    ));
  };

  // add items in selectedItems array
  const handleSelectItem = (item) => {
        setSearchInput('');
        setSelectedItems([...selectedItems, item]);
        setAllUsers(allUsers.filter(user => user.id !== item.id));
        setActiveItemIndex(null); // Reset active item index
  };

  //remover for items from the selectedItems array and add the item back to the allUsers array
  const handleRemoveItem = (item, index) => {
       const updatedSelectedItems = [...selectedItems];
       // item deleted from selectedItems array
       updatedSelectedItems.splice(index, 1);
       setSelectedItems(updatedSelectedItems);

       // add the item in the allUsers
       setAllUsers([...allUsers, item]);
    
       // make the esearch bar actve
       setActiveItemIndex(null); // Reset active item index
       setIsSearchBarActive(true)
  };

  // make the search bar inactive when we click on any selected item in the selectedItems array
  const inActiveSearchBar = () => {
       setIsSearchBarActive(false);
  };

  // make copy of all items when th e component run first time
  useEffect(() => {
         setAllUsers(peopleData);
         }, []);

  useEffect(() => {
         filterItems();
          }, [searchInput]);

  const filterItems = () => {
         const filteredPeople = peopleData.filter(person =>
         person.name.toLowerCase().includes(searchInput.toLowerCase()) &&
         !selectedItems.some(selectedItem => selectedItem.id === person.id)
         );
         setAllUsers(filteredPeople);
     };

// on press the search input field
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && searchInput === '' && selectedItems.length > 0) {
      e.preventDefault(); // Prevent browser back navigation
      setActiveItemIndex(selectedItems.length - 1); // Set active class on the last item

      // last element of selectedItems is active to delete
      // also add background color in a last element of selectedItem array
      setActiveSelectedItem(true);
    }

    if(selectedItems.length > 0 && activeSelectedItem){
      const lastSelectedElement = selectedItems[selectedItems.length - 1];
      // add the last element from selectedItems array into allUsers array
      allUsers.push(lastSelectedElement);

      // remove the last element from selected items
      selectedItems.pop(); 

      // inactive the last element in the selectedItems array if present
      setActiveSelectedItem(false);
    }
  };

  return (
    <>
      <h3 className='heading'>Pick Users</h3>
      <div className='container'>
        {/* Filtered items */}
        <div className='selectedItems-box'>
          {selectedItems.map((item, index) => (
            <span
              key={index}
              className={`selectedItems ${index === activeItemIndex ? 'activeLastElement' : ''}`}
              onClick={inActiveSearchBar}
            >
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <div onClick={() => handleRemoveItem(item, index)}>X</div>
            </span>
          ))}

          {/* Search bar */}
          <div className={`searchItems ${isSearchBarActive ? 'active' : ''}`}>
            <input
              className='searchBar'
              type="text"
              placeholder="Add New user..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setIsSearchBarActive(true)}
              onBlur={() => setActiveItemIndex(null)} // Reset active item index on blur
              onKeyDown={handleKeyDown} // Handle backspace key
            />

            {/* All items list */}
            <div className='boxes'>
              <ul className='filteredItems-box'>
                {allUsers?.map((person, index) => (
                  <li key={person.id} className='filteredItems' onClick={() => handleSelectItem(person)}>
                    <img src={person.image} alt={person.name} />
                    <p>{highlightMatch(person.name, searchInput)}</p>
                    <p>{person.email}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
