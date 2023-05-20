import React, { memo, useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    TextField,
    Paper,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

// import Table from '../components/table/Table'

import { customerService } from "../services/customerService";

const columns = [
    { id: 'id', label: 'ID', align: 'center' },
    { id: 'name', label: 'Tên', align: 'center' },
    { id: 'max_participate', label: 'Số lượng tối đa', align: 'center' },
    { id: 'address', label: 'Địa chỉ', align: 'center' },
    { id: 'money', label: 'Đơn giá', align: 'center' },
    { id: 'date', label: 'Ngày', align: 'center' },
    { id: 'time', label: 'Giờ', align: 'center' },
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

const Trainers = () => {
    const [resultList, setResultList] = useState();
    const [page, setPage] = useState(1)
    const [rowPerPage, setRowPerPage] = useState(10);
    const [messageError, setMessageError] = useState({
        type: "",
        message: "",
    });

    // form
    const [address_id, set_address_id] = useState(null)
    // const [bigClass_id, set_bigClass_id] = useState(null)
    const [class_id, set_class_id] = useState(null)
    const [class_name, set_class_name] = useState({}) // class_name = { name: ..., bigClass_id: ..., }
    const [max_participate, set_max_participate] = useState(null)
    const [money, set_money] = useState(null)
    const [date, set_date] = useState(null)
    const [time, set_time] = useState(null)

    const [tableKey, setTableKey] = useState(1000)

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

    const handleChangeAddress = (event) => {
        console.log(event.target.value)
        set_address_id(event.target.value)
    };
    const handleChangeClassName = (event) => {
        console.log(event.target.value)
        set_class_name(event.target.value)
    };
    const handleChangeMaxParticipate = (event) => {
        console.log(event.target.value)
        set_max_participate(event.target.value)
    };
    const handleChangeMoney = (event) => {
        console.log(event.target.value)
        set_money(event.target.value)
    }
    const handleChangeDate = (event) => {
        console.log(event.target.value)
        set_date(event.target.value)
    }
    const handleChangeTime = (event) => {
        console.log(event.target.value)
        set_time(event.target.value)
    }
    const onSubmit = () => {

        const data = {
            address_id,
            bigClass_id: class_name.bigClass_id,
            name: class_name.name,
            max_participate,
            money,
            date, 
            time
        }

        customerService
            .create(data)
            .then((response) => {
                setTableKey(tableKey + 1)
                console.log(response.data)
                // toast.success("Thêm thành công"); // co the them loading o day 
                // navigate("/customers");
            })
            .catch((error) => {
                // if (error.response.data.message.includes("phone"))
                //     setErrorPost("Số điện thoại đã tồn tại");
                console.log(error);
            });
    };

    const onDelete = (event) => {
        const data = {
            class_id: event.target.id
        }
        customerService
            .remove(data)
            .then((response) => {
                setTableKey(tableKey + 1)
                console.log(response.data)
                // toast.success("Thêm thành công"); // co the them loading o day 
                // navigate("/customers");
            })
            .catch((error) => {
                // if (error.response.data.message.includes("phone"))
                //     setErrorPost("Số điện thoại đã tồn tại");
                console.log(error);
            });
    };

    useEffect(() => {
        customerService
            .listAllClasses()
            .then(function (response) {
                setResultList(response.data.data);
                console.log(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [tableKey]);

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
                Lớp tập
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
                                        <CustomerTableHead rowCount={resultList.length} />
                                        <TableBody>
                                            {resultList
                                                // .slice(
                                                //     page * rowPerPage,
                                                //     page * rowPerPage + rowPerPage
                                                // )
                                                .map((row, index) => {
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
                                                                {row.max_participate}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {row.address}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {row.money}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {row.date}
                                                            </TableCell>
                                                            <TableCell align='center' style={{ maxWidth: 100}}>
                                                                {row.time}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                <Button id={row.id} onClick={onDelete}>Xoá</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}

                                            <TableRow hover tabIndex={-1}>
                                                <TableCell align='center'>
                                                    {/* {page * rowPerPage + index + 1} */}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <FormControl style={{ minWidth: 100}}>

                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name={class_name.name}
                                                            label=""
                                                            onChange={handleChangeClassName}
                                                        >
                                                            <MenuItem value={{ name: 'Standard', bigClass_id: 1, }}>Standard</MenuItem>
                                                            <MenuItem value={{ name: 'Yoga', bigClass_id: 2, }}>Yoga</MenuItem>
                                                            <MenuItem value={{ name: 'Kickfit - MMA', bigClass_id: 3, }}>Kickfit - MMA</MenuItem>

                                                        </Select>
                                                    </FormControl>

                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField label="" onChange={handleChangeMaxParticipate} />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <FormControl style={{ minWidth: 120, maxWidth: 200, maxHeight: 200 }}>
                                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={address_id}
                                                            label=""
                                                            onChange={handleChangeAddress}
                                                        >
                                                            <MenuItem value={1}>Time City Megamall, Tòa Nhà T18, 458 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội</MenuItem>
                                                            <MenuItem value={2}>Tầng 2, Capital Building, 41 Hai Bà Trưng, P. Trần Hưng Đạo, Q. Hoàn Kiếm, Hà Nội</MenuItem>

                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField label="" style={{ minWidth: 80}} onChange={handleChangeMoney} />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField multiline style={{ minWidth: 160}} onChange={handleChangeDate}/>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <TextField multiline style={{ minWidth: 100}} onChange={handleChangeTime}/>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Button
                                                        type='submit'
                                                        onClick={onSubmit}
                                                    >
                                                        Thêm
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
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

export default Trainers
