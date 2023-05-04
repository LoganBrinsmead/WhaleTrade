import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    TableHead,
    Typography,
} from '@mui/material';

import { tableCellClasses } from '@mui/material/TableCell';
// import { tableRowClasses } from '@mui/material/TableRow';
import { getStockQuote, getCompanyProfile } from '../services/api/whaletradApi';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        broderBottom: "none",
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'RedHatText',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16, 
        borderBottom: "none",
        fontFamily: 'RedHatText',
    }
}));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

export default function Trending(props) {
    // later derive trending list from database
    const { symbolList } = props; 
    const [ trendingData, setTrendingData ] = useState([]);

    const getData = async (symList) => {
        let formatedData = await Promise.all(symList.map( async (symbol) => {
            let quote = await getStockQuote(symbol);
            let meta = await getCompanyProfile(symbol);

            if (quote.status !== 200 || meta.status !== 200) {
                return;
            }
            return {
                symbol: symbol,
                name: meta.data.name,
                change: quote.data.d,
                change_p: quote.data.dp,
                high: quote.data.h,
                low: quote.data.l,
                open: quote.data.o,
                prevc: quote.data.pc

            }
        }));
        console.log("formatted data: ",formatedData);

        setTrendingData(formatedData);
    }


    useEffect( () => {
        getData(symbolList);
    },[symbolList]);
   
    if (trendingData.length === 0) {
        return (
            <span>Loading...</span>
        )
    }

    return (
        <>
        <Typography variant="h3" gutterBottom>TRENDING</Typography>
        <Typography variant="h4" gutterBottom>TODAY</Typography>
        <TableContainer>
            <Table sx={{ minWidth: 100, maxWidth: 400 }} aria-label="Trending Stocks">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>SYMBOL</StyledTableCell>
                        <StyledTableCell>NAME</StyledTableCell>
                        <StyledTableCell>CHANGE</StyledTableCell>
                        <StyledTableCell>%CHANGE</StyledTableCell>
                        <StyledTableCell>HIGH</StyledTableCell>
                        <StyledTableCell>LOW</StyledTableCell>
                        <StyledTableCell>OPEN</StyledTableCell>
                        <StyledTableCell>LAST CLOSE</StyledTableCell>     
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trendingData.map((row,idx) => (
                        <TableRow key={`${idx}-${row.symbol}-row`}>
                            <StyledTableCell key={`${idx}-symbol`}>{row.symbol}</StyledTableCell>             
                            <StyledTableCell key={`${idx}-name`}>{row.name}</StyledTableCell>             
                            <StyledTableCell key={`${idx}-change`} sx={{ color: (row.change < 0 ? 'red' : 'green') }}>
                                {row.change}
                            </StyledTableCell>             
                            <StyledTableCell key={`${idx}-change_p`} sx={{ color: (row.change_p < 0 ? 'red' : 'green') }}>
                                {row.change_p} %
                            </StyledTableCell>             
                            <StyledTableCell key={`${idx}-high`}>{row.high}</StyledTableCell>             
                            <StyledTableCell key={`${idx}-low`}>{row.low}</StyledTableCell>             
                            <StyledTableCell key={`${idx}-open`}>{row.open}</StyledTableCell>             
                            <StyledTableCell key={`${idx}-prevc`}>{row.prevc}</StyledTableCell>             
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}

