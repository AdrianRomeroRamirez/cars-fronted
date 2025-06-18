import { useEffect, useState } from 'react'
import { api } from '../api/axios'
import { Car } from '../types/car'
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material'

export const CarList = () => {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    api.get<{ data: Car[] }>('/cars').then(res => setCars(res.data.data))
  }, [])

  return (
    <>
      <Typography variant="h4" gutterBottom>Car List</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Model</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Engine</TableCell>
            <TableCell>Manufacturer</TableCell>
            <TableCell>Colors</TableCell>
            <TableCell>Features</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map(car => (
            <TableRow key={car.id}>
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
    </>
  )
}