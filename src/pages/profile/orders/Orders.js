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

function Orders() {
    const {t} = useTranslation()
    return (
        <div className="orderSettings">
            <h1>{t('My orders')}</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>{t('Order ID')}</TableCell>
                        <TableCell>{t('Date Shipped')}</TableCell>
                        <TableCell>{t('Address')}</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">42567438</TableCell>
                            <TableCell align="left">24-03-2004</TableCell>
                            <TableCell align="left">test adress</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Orders
