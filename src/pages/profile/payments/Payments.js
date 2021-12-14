import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import './payments.css'
import { Button } from '@material-ui/core'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux"
import { AddCard, RemoveCard, MakeCardDefault } from '../../../redux/actions';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';




function Payments(props) {

    useEffect(() => {
        // console.log(props.addresses)
    }, [])

    const dispatch = useDispatch()

    const { cards } = useSelector(state => state.CardsReducer)

    const handleDelete = (id) => {
        dispatch(RemoveCard(id))
    }

    const func = (id) => {
        dispatch(MakeCardDefault(id))
    }

    return (
        <div>
            <div className="adressGrid">
            <h1 style={{color: "black", fontSize: "25px"}}>My Card List</h1>
                {
                    cards.length > 0 ? cards.map(item => {
                        return (
                            <div className="singleAddress">
                                <p>{item.address}</p>
                                <p>{item.code}</p>
                                <DeleteForeverOutlinedIcon style={{ "cursor": "pointer" }} onClick={() => handleDelete(item.id)} />
                                {item.default == true ? <p>This is your default card</p> : <div className="defaultAdressCheckbox">
                                    <input onChange={() => func(item.id)} type="checkbox" id={item.id} />
                                    <label for={item.id}>Make this card default</label>
                                </div>}
                            </div>
                        )
                    }) : <p style={{color: "black"}}>You have not added cards yet</p>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
      cards: state.CardsReducer.cards
    }
}
const mapDispatchToProps= (dispatch)=>{
    return{
        AddCard: (cred)=>{dispatch(AddCard(cred))}
    }
}  

export default connect(mapStateToProps,mapDispatchToProps)(Payments)
