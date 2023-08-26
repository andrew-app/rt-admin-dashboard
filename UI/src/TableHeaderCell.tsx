import { TableCell, Typography } from "@mui/material";

interface UserTableHeaderCellProps {
    text: string;
}

const TableHeaderCell = (props: UserTableHeaderCellProps) => {
    return(
    <TableCell align="right" sx={{borderWidth: '1px', borderColor: '#01b636'}}>
        <Typography variant="subtitle1" color="#FFD700">
            <>
            {props.text}
            </>
        </Typography>
    </TableCell>
    );
};

export default TableHeaderCell;