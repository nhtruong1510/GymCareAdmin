import React, { memo, useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Paper
} from "@mui/material";
// import Table from '../components/table/Table'

import { customerService } from "../services/customerService";

const columns = [
    { id: 'id', label: 'ID', align: 'center' },
    { id: 'name', label: 'Tên', align: 'center' },
    { id: 'email', label: 'Địa chỉ email', align: 'center' },
    { id: 'phone', label: 'Số điện thoại', align: 'center' },
    { id: 'birth', label: 'Ngày sinh', align: 'center' },
    { id: 'gender', label: 'Giới tính', align: 'center' },
    { id: 'address', label: 'Địa chỉ', align: 'center' },
]

function CustomerTableHead() {
    return (
        <TableHead>
            <TableRow>
                {columns.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        sx={{ fontWeight: "bold" }}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const Customers = () => {
    const [resultList, setResultList] = useState();
    const [page, setPage] = useState(1)
    const [rowPerPage, setRowPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowPerPage = (event) => {
        setRowPerPage(parseInt(event.target.value, 10))
        setPage(1)
    }

    const customerTableHead = [
        'id',
        'name',
        'email',
        'phone',
        'birth',
        'gender',
        'address'
    ]

    useEffect(() => {
        customerService
            .listAll()
            .then(function (response) {
                setResultList(response.data.data);
                console.log(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.birth}</td>
            <td>{item.gender}</td>
            <td>{item.address}</td>
        </tr>
    )
    return (
        <div>
            <h2 className="page-header">
                Người tập
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {/* <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={resultList}
                                renderBody={(item, index) => renderBody(item, index)}
                            /> */}

                            {resultList && (
                                <TableContainer>
                                    <Table
                                        stickyHeader
                                        sx={{ minWidth: 375 }}
                                        aria-labelledby='tableTitle'
                                    >
                                        <CustomerTableHead rowCount={resultList.length + 1} />
                                        <TableBody>
                                            {resultList
                                                // .slice(
                                                //     page * rowPerPage,
                                                //     page * rowPerPage + rowPerPage
                                                // )
                                                .map((row, index) => {
                                                    console.log(row)
                                                    return (
                                                        <TableRow hover tabIndex={-1} key={row.id}>
                                                            <TableCell align='center'>
                                                                {/* {page * rowPerPage + index + 1} */}
                                                                {row.id}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {row.name}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {row.email}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {row.phone}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {row.birth}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {row.gender == 0 ? 'Nam' : 'Nữ'}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {row.address}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {/* {emptyRowsP > 0 && (
                                                    <TableRow style={{ height: 54 * emptyRowsP }}>
                                                        <TableCell colSpan={12} />
                                                    </TableRow>
                                                )} */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
