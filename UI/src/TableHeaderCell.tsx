import { TableCell, Typography } from "@mui/material";

interface UserTableHeaderCellProps {
    text: string;
}

const TableHeaderCell = ({text}: UserTableHeaderCellProps) => {
    return(
    <TableCell align="right">
        <Typography variant="subtitle1" sx={{
            fontFamily: 'Quicksand',
            fontWeight: 'bold'
        }}>
            {text}
        </Typography>
    </TableCell>
    );
};

export default TableHeaderCell;