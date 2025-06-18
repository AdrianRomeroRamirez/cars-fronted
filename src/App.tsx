import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { CarList } from './components/CarList'
import { CarForm } from './components/CarForm'
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  CssBaseline
} from '@mui/material'

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Car Manager
          </Typography>
          <Box>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ mx: 1, fontWeight: 'bold' }}
            >
              Cars
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/create"
              sx={{ mx: 1, fontWeight: 'bold' }}
            >
              Create
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 5, mb: 8 }}>
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/create" element={<CarForm />} />
        </Routes>
      </Container>
    </Router>
  )
}
