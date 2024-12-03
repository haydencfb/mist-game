import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '50px', height: '100vh' }}>
      <Paper
        sx={{ p: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 650, height: 75, borderRadius: 6, backgroundColor: '#3f3d3d' }}
      >
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600, borderRadius: 3, backgroundColor: 'white' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Game Library"
            inputProps={{ 'aria-label': 'Search Game Library' }}
          />
          <IconButton type="button" sx={{ p: '10px', width: 50, height: 30, borderRadius: 3, backgroundColor: '#8B363E' }} aria-label="search">
            <SearchIcon sx={{color: 'white'}} />
          </IconButton>
        </Paper>
      </Paper>
    </div>
  );
}