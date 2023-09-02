import { TableCell, Typography } from "@mui/material";

interface UserTableHeaderCellProps {
    text: string;
}

const TableHeaderCell = (props: UserTableHeaderCellProps) => {
    return(
    <TableCell align="right" sx={{borderWidth: '1px', borderColor: 'black'}}>
        <Typography variant="subtitle1" sx={{
            fontFamily: 'Quicksand',
            fontWeight: 'bold'
        }}>
            <>
            {props.text}
            </>
        </Typography>
    </TableCell>
    );
};

export default TableHeaderCell;