import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';


export const Search = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
  }) => {
    const [value, setValue] = useState(initialValue)
  
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)
  
      return () => clearTimeout(timeout)
    }, [value])
  
    return (
      <Box>
        <SearchIcon sx={{height: '55px', width: '55px', paddingInline: '5px', paddingTop: '2px', backgroundColor: '#8b499b', borderRadius: '5px 0px 0px 5px',}}/>
        <TextField id="outlined-search" label="Search" type="search" {...props} value={value} onChange={e => setValue(e.target.value)} sx={{paddingBottom: '10px'}}/>
      </Box>
    );
};