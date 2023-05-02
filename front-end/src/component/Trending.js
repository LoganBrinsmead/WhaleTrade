import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    TableHead,
} from '@mui/material';

import { tableCellClasses } from '@mui/material/TableCell';
import { tableRowClasses } from '@mui/material/TableRow';
// import {  } from '../services/api/whaletradApi';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        broderBottom: "none",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14, 
        borderBottom: "none",
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));


export default function Trending(props) {

    // later derive trending list from database
    const { symbolList } = props; 
    const [ trendingData, setTrendingData ] = useState([]);

    useEffect( () => {
        setTrendingData(symbolList.map( (symbol) => {
            return {
                symbol: symbol,
                name: "Name",
                change: 0,
                change_p: 0.00,
                volume: 0,
                market_cap: 0,
            };      
        }));
    },[symbolList]);
   
    if (trendingData.length === 0) {
        return (
            <span>Loading...</span>
        )
    }

    return (
        <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="Trending Stocks">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>SYMBOL</StyledTableCell>
                        <StyledTableCell>NAME</StyledTableCell>
                        <StyledTableCell>CHANGE</StyledTableCell>
                        <StyledTableCell>%CHANGE</StyledTableCell>
                        <StyledTableCell>VOLUME</StyledTableCell>
                        <StyledTableCell>MARKET CAP</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trendingData.map((row) => (
                        <TableRow>
                            <StyledTableCell>{row.symbol}</StyledTableCell>             
                            <StyledTableCell>{row.name}</StyledTableCell>             
                            <StyledTableCell>{row.change}</StyledTableCell>             
                            <StyledTableCell>{row.change_p}</StyledTableCell>             
                            <StyledTableCell>{row.volume}</StyledTableCell>             
                            <StyledTableCell>{row.market_cap}</StyledTableCell>             
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

