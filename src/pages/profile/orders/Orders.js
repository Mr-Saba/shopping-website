import React from 'react'
import { useParams } from 'react-router'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './orders.css'
import { useTranslation } from "react-i18next";
import {useSelector} from "react-redux"

function Orders() {
    const {t} = useTranslation()

    const {orders} = useSelector(state => state.OrderReducer)
    
    return (
        <div className="orderSettings">
            <h1>{t('My orders')}</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: "700"}}>{t('Order ID')}</TableCell>
                        <TableCell style={{fontWeight: "700"}}>{t('Date Shipped')}</TableCell>
                        <TableCell style={{fontWeight: "700"}}>{t('Address')}</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">{orders?.orderId}</TableCell>
                            <TableCell align="left">{orders?.date}</TableCell>
                            <TableCell align="left">{orders?.address}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Orders
