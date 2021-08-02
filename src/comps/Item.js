

import styled from "styled-components";
import itemImg from '../prod.png';

import { useDispatch, useSelector } from "react-redux";
import { EditItemAction } from '../actions/listOfDataAction';

import { useEffect, useRef } from "react";



const Item = ({ itemData }) => {
    const dispatch = useDispatch();
    const MainItemRef = useRef(null);
    const { itemIndex } = useSelector(state => state.dataList);

    useEffect(() => {
        if (itemData.index == itemIndex) {
            MainItemRef.current.classList.add("selected");
        } else {
            MainItemRef.current.classList.remove("selected");
        }

    }, [itemIndex])

    return (
        <ItemStyled >
            <SelectedBlock ref={MainItemRef} />
            {/* <p>{`index:${itemData.index}`}</p> */}
            <img src={itemImg} />
            <TextBlock>
                <h4>{itemData.current.name}</h4>
                <p>{itemData.current.disc}</p>
                {/* <p>{itemData.current.price}</p> */}
            </TextBlock>
            <GetItemButton onClick={() => dispatch(EditItemAction({ index: itemData.index }))}>
                Details
            </GetItemButton>
        </ItemStyled>
    )


}

const ItemStyled = styled.div`

display:flex;
flex-direction:row;
justify-content: left;
height:100px;
border:2px solid black;
position:relative;
margin-bottom:10px;
img{
    height:100px;
    z-index:1;
}
button{
    width:100px;
    background-color:orange;
    height:20px;
    position: absolute;
    bottom:5px;
    right:5px;
    box-shadow:2px 2px 2px 2px;
    border:2px solid black;
}
`;


const TextBlock = styled.div`
    display:flex;
    flex-direction:column;
    z-index:15;
    h4{
        margin-bottom:0px;
    }
`;

const SelectedBlock = styled.div`
&.selected{
        position:absolute;
        width:100%;
        height:100px;
        background-color:#9fc5f5;
        z-index:2;
        opacity:0.9;
    }

`;

const GetItemButton = styled.button`
z-index:22;
`;
export default Item;