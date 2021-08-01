import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { UpdateListOfDataAction } from './actions/listOfDataAction';
import { EditItemAction } from './actions/listOfDataAction';

import prodPic from './prod.png';
import mg from './mg.png';
import Item from './comps/Item';

function App() {
  const dispatch = useDispatch();

  const [itemName, setItemName] = useState("");
  const [itemDisc, setItemDisc] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [prodStatus, setProdStatus] = useState("");
  const [currentIndex, setCurrentIndex] = useState();
  const [searchValue, setSearchValue] = useState("");

  const [searchResults, setSearchResults] = useState([]);




  const { data, itemIndex, itemStatus } = useSelector(state => state.dataList);


  const SaveItem = (e) => {
    e.preventDefault();

    let TempArray = [...data];
    if (prodStatus == "new") {
      TempArray.push({ name: itemName, disc: itemDisc, price: itemPrice });
      setItemPrice("");
      setItemName("");
      setItemDisc("");
    } else if (prodStatus == "edit") {
      TempArray[currentIndex].name = itemName;
      TempArray[currentIndex].disc = itemDisc;
      TempArray[currentIndex].price = itemPrice;
      setItemPrice("");
      setItemName("");
      setItemDisc("");
      setProdStatus("new");
    }
    dispatch(UpdateListOfDataAction(TempArray));
    window.localStorage.setItem("data", JSON.stringify(TempArray));
  }

  const EditItem = (updateIndex) => {
    console.log(updateIndex);
    let TempArray = [...data];
    setItemPrice(TempArray[updateIndex].price);
    setItemName(TempArray[updateIndex].name);
    setItemDisc(TempArray[updateIndex].disc);
    setCurrentIndex(updateIndex);
    setProdStatus("edit");

  }

  const DeleteItem = (index) => {
    let tempArray = [...data];
    tempArray.splice(index, 1);
    dispatch(UpdateListOfDataAction(tempArray));
    window.localStorage.setItem("data", JSON.stringify(tempArray));


  }

  useEffect(() => {
    if (itemIndex != null && data.length > 0) {
      EditItem(itemIndex);

    }

  }, [itemIndex])

  useEffect(() => {
    console.log(searchValue);
    setSearchResults([]);
    if (searchValue != "") {
      ChangeResults();
    }
  }, [searchValue]);

  useEffect(() => {
    console.log(window.localStorage.getItem("data"));
    let tempArray = JSON.parse(window.localStorage.getItem("data"));
    dispatch(UpdateListOfDataAction(tempArray));
  }, [])
  useEffect(() => {
    if (prodStatus == "new") {
      setItemPrice("");
      setItemName("");
      setItemDisc("");
      setCurrentIndex(null);
      dispatch(EditItemAction({ index: null }));
    }

  }, [prodStatus])


  const ChangeResults = () => {

    let tempArray = [];

    data.map((current, index) => {
      if (current.name.includes(searchValue)) {
        tempArray.push(current);
      }
    })

    setSearchResults([...tempArray]);
  }

  return (
    <div className="App">
      <MainTitle>
        My store
      </MainTitle>
      <MainControl>
        <AddButton onClick={() => setProdStatus("new")}>
          + Add
        </AddButton>

        <input autocomplete="off" onChange={(e) => { setSearchValue(e.target.value) }} value={searchValue} id="search_box" type="text" name="search" placeholder="search products" />
      </MainControl>
      <MainApp>
        {searchValue == "" ?
          <ListOfItems>
            {data.map((current, index) => (
              <div>
                {/* <div onClick={() => EditItem(index)}> */}
                <span className="removeItem" onClick={() => { DeleteItem(index) }}>X</span>
                <Item itemData={{ current, index }} />
              </div>
            ))}
          </ListOfItems>
          :
          <ListOfItems>
            <h2>Search results</h2>
            {searchResults.map((current, index) => (
              <div>
                {/* <div onClick={() => EditItem(index)}> */}

                <Item itemData={{ current, index }} />
              </div>
            ))}
          </ListOfItems>
        }
        {(prodStatus == "new" || prodStatus == "edit") &&
          <fieldset>
            <legend>{prodStatus == "edit" ? (`Product ${currentIndex >= 0 ? currentIndex : ""} Details`) : "Add new product"}</legend>
            <MainForm>
              <img src={prodPic} />
              <span>Name</span>
              <input type="text" onChange={(e) => setItemName(e.target.value)} value={itemName} name="name" placeholder="Name" />
              <span>Disc</span>
              <textarea type="text" onChange={(e) => setItemDisc(e.target.value)} value={itemDisc} name="disc" placeholder="Discription" />
              <span>Price</span>
              <input type="text" onChange={(e) => setItemPrice(e.target.value)} value={itemPrice} name="price" placeholder="Price" />
              <AddButton onClick={(e) => SaveItem(e)}>
                {prodStatus == "new" ? "Save" : "Save Changes"}
              </AddButton>
            </MainForm>
          </fieldset>
        }


      </MainApp>


    </div>
  );
}

const MainTitle = styled.h1`
  color: black;
  background-color:#9fc5f5;
  padding:20px;
  margin:0px;
  `
const MainForm = styled.form`
  display:flex;
  flex-direction:column;
  justify-content: left;
  img{
    width:30%;
  }
  span:nth-of-type(3){
    position:relative;
    &:after{
      content:"$";
      left:60px;
      top:20px;
      position:absolute;


    }
  }
  input:nth-of-type(2){
    width:40px;
    &:after {
      content: "This is a fancy orange box.";
      background-color: #FFBA10;
      border-color: black;
      border-style: dotted;
      position:absolute;
      right:0px;
      top:0px;
    }
    
  }
  input {
    border:2px solid black;
  }
  textarea{
    border:2px solid black;
    min-height:60px;
  }


  `
const MainApp = styled.div`
  fieldset{
    border:2px solid black;
    margin-top: -8px;
  }
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  padding:20px;
  > * {
    width:100%;
  }

  button{
    margin-left:auto;
    margin-right:0px;
  }


  `;
const ListOfItems = styled.div`
  .removeItem{
    width:18px;
    height:18px;
    background-color:red;
    color:white;
    padding:2px;
    border-radius:0px 0px 2px 0px;
    position:absolute;
    text-align:center;
    z-index:10;
    cursor:pointer;
  }
`;
const SecondRow = styled.div``;
const FirsRow = styled.div``;
const AddButton = styled.button`
  width:100px;
  border:2px solid black;
  box-shadow: 3px 4px 0px 1px;
  background-color:#b4d8a8;
  margin-left:20px;
  margin-top:20px;
`;

const MainControl = styled.div`
  input{
    border-radius:20px;
    border:2px solid black;
    margin-left:15px;
    background-image:url(${mg});
    background-size: 15px;
    background-repeat: no-repeat;
    background-position-y: 50%;
    background-position-x: 5px;
    padding-left:22px;
    outline:none;

  }
`;
export default App;
