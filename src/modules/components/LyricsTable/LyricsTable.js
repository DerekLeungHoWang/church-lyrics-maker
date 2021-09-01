import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, alpha } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Button, Grid, TextField, InputAdornment } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import gsap from 'gsap'
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { FormattedMessage } from 'react-intl';
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'title', numeric: false, disablePadding: false, label: <FormattedMessage id="lyricsTable.column.title" /> },
    { id: 'composer', numeric: true, disablePadding: false, label: <FormattedMessage id="lyricsTable.column.composer" />},
    { id: 'lyricist', numeric: true, disablePadding: false, label: <FormattedMessage id="lyricsTable.column.lyricist" /> },
    { id: 'createdAt', numeric: true, disablePadding: false, label: <FormattedMessage id="lyricsTable.column.createdAt" /> },
    //   { id: 'lastModifiedAt', numeric: true, disablePadding: false, label: 'Last Modified At' },
    { id: 'actions', numeric: true, disablePadding: false, label: <FormattedMessage id="lyricsTable.column.actions" />},
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        padding="normal"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.id !== "actions" && headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                        {headCell.id === "actions" && headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    // numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {

        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    searchField: {
        margin: theme.spacing(1),
    }

}));

const EnhancedTableToolbar = ({ handleSearch, searchTerm, setSearchTerm }) => {
    const classes = useToolbarStyles();


    return (
        <Grid container direction="row" justifyContent="space-between">
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                <FormattedMessage id="lyricsTable.heading" />
            </Typography>

            <div className={classes.searchField}>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <SearchIcon />
                    </Grid>
                    <Grid item>
                        <TextField
                            value={searchTerm}
                            InputProps={{

                                endAdornment: searchTerm && (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setSearchTerm("")}
                                    ><CancelIcon style={{ fontSize: '18px' }} /></IconButton>
                                )
                            }}
                            type="text" onChange={handleSearch} id="input-with-icon-grid" label={<FormattedMessage id="lyricsTable.search" />} />
                    </Grid>
                </Grid>
            </div>


        </Grid>
    );
};

EnhancedTableToolbar.propTypes = {
    // numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        borderRadius: "18px",
        padding: "15px"
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    loaderContainer: {
        height: "200px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

export default function LyricsTable({

    lyricsData, handleAddToPlayList, handleFindOneFromTable, handleDeleteFromTable, loadingLyricsData }) {
    let rows = lyricsData
    const tableDataRef = useRef(null)
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    const [searchTerm, setSearchTerm] = useState("")


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = e => {
        setPage(0)
        setSearchTerm(e.currentTarget.value.trim().toLowerCase())

    }



    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    useEffect(() => {
        if (!loadingLyricsData)
            gsap.from(tableDataRef.current, {

                duration: .8,
                opacity: 0,
                ease: "Power3.easeInOut",


            });


    }, [loadingLyricsData])

    let data = stableSort(rows, getComparator(order, orderBy))
        .filter(d => {
            if (searchTerm == "") {
                return d;
            } else if (d.title.trim().toLowerCase().includes(searchTerm)) {
                return d;
            }
        })
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    return (
        <div className={classes.root}>

            <Paper className={classes.paper}>
                <EnhancedTableToolbar handleSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {loadingLyricsData ?
                    <div className={classes.loaderContainer}>
                        <CircularProgress />
                    </div>
                    :
                    <TableContainer ref={tableDataRef}>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size='medium'
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody >
                                {
                                    data.map((row, index) => {
                                        console.log('map');
                                        console.log(row);
                                        return (
                                            <TableRow
                                                key={index}
                                                ref={tableDataRef}
                                            >

                                                <TableCell align="left" component="th" scope="row">
                                                    {row.title}
                                                </TableCell>
                                                <TableCell align="left">{row.composer}</TableCell>
                                                <TableCell align="left">{row.lyricist}</TableCell>

                                                <TableCell align="left">{moment(row.createdAt).format("LL")}</TableCell>
                                                <TableCell align="left">
                                                    <IconButton name={row._id} onClick={(e) => handleAddToPlayList(e.currentTarget.name)} aria-label="add">
                                                        <AddIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="edit" name={row._id} onClick={handleFindOneFromTable}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton name={row._id} aria-label="delete" onClick={handleDeleteFromTable} >
                                                        <DeleteIcon />
                                                    </IconButton>

                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>


                        </Table>
                        {data.length == 0 && <Grid style={{ height: "100px" }} container alignItems="center" justifyContent="center">
                            <Typography style={{ fontWeight: "600", color: "grey" }}>     <FormattedMessage id="lyricsTable.noData" /></Typography>
                        </Grid>
                        }
                    </TableContainer>}
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </div>
    );
}
