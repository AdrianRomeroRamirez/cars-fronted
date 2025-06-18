import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { CarList } from './components/CarList'
import { Container, AppBar, Toolbar, Button } from '@mui/material'
import { CarForm } from './components/CarForm'

export default function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Cars</Button>
          <Button color="inherit" component={Link} to="/create">Create</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/create" element={<CarForm />} />
        </Routes>
      </Container>
    </Router>
  )
}
