import { useEffect, useState } from 'react'
import { api } from '../api/axios'
import { Car } from '../types/car'
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableContainer
} from '@mui/material'

export const CarList = () => {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    api.get<{ data: Car[] }>('/cars').then(res => setCars(res.data.data))
  }, [])

  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Car List
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Model</strong></TableCell>
              <TableCell><strong>Year</strong></TableCell>
              <TableCell><strong>Engine</strong></TableCell>
              <TableCell><strong>Manufacturer</strong></TableCell>
              <TableCell><strong>Colors</strong></TableCell>
              <TableCell><strong>Features</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car, index) => (
              <TableRow
                key={car.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                  '&:last-child td': { borderBottom: 0 }
                }}
              >
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.engine_type}</TableCell>
                <TableCell>{car.manufacturer.name}</TableCell>
                <TableCell>{car.colors.map(c => c.name).join(', ')}</TableCell>
                <TableCell>{car.features.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}