import { useEffect, useState } from 'react'
import { api } from '../api/axios'
import { Car, Color, Feature, Manufacturer } from '../types/car'
import {
  Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, OutlinedInput,
  Checkbox, ListItemText, Typography, Stack, Paper
} from '@mui/material'

export const CarForm = () => {
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [engine, setEngine] = useState('')
  const [description, setDescription] = useState('')
  const [manufacturerId, setManufacturerId] = useState('')
  const [selectedColors, setSelectedColors] = useState<number[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([])

  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])
  const [colors, setColors] = useState<Color[]>([])
  const [features, setFeatures] = useState<Feature[]>([])

  useEffect(() => {
    api.get<{ data: Manufacturer[] }>('/manufacturers').then(res => setManufacturers(res.data.data))
    api.get<{ data: Color[] }>('/colors').then(res => setColors(res.data.data))
    api.get<{ data: Feature[] }>('/features').then(res => setFeatures(res.data.data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post('/cars', {
      model,
      year,
      engine_type: engine,
      description,
      manufacturer_id: manufacturerId,
      colors: selectedColors,
      features: selectedFeatures
    })
    setModel('')
    setYear('')
    setEngine('')
    setDescription('')
    setManufacturerId('')
    setSelectedColors([])
    setSelectedFeatures([])
  }

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.main">
          Create New Car
        </Typography>

        <Stack spacing={3}>
          <TextField label="Model" value={model} onChange={e => setModel(e.target.value)} fullWidth required />
          <TextField
            label="Year"
            type="number"
            value={year}
            onChange={e => setYear(e.target.value)}
            inputProps={{ min: 1900, max: 2100, step: 1 }}
            fullWidth
            required
          />
          <TextField label="Engine Type" value={engine} onChange={e => setEngine(e.target.value)} fullWidth required />
          <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} multiline rows={3} fullWidth />

          <FormControl fullWidth required>
            <InputLabel>Manufacturer</InputLabel>
            <Select
              value={manufacturerId}
              onChange={e => setManufacturerId(e.target.value)}
              input={<OutlinedInput label="Manufacturer" />}
            >
              {manufacturers.map(m => (
                <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>Colors</InputLabel>
            <Select
              multiple
              value={selectedColors}
              onChange={e => setSelectedColors(e.target.value as number[])}
              input={<OutlinedInput label="Colors" />}
              renderValue={selected => colors.filter(c => selected.includes(c.id)).map(c => c.name).join(', ')}
            >
              {colors.map(color => (
                <MenuItem key={color.id} value={color.id}>
                  <Checkbox checked={selectedColors.includes(color.id)} />
                  <ListItemText primary={`${color.name} (${color.code})`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Features</InputLabel>
            <Select
              multiple
              value={selectedFeatures}
              onChange={e => setSelectedFeatures(e.target.value as number[])}
              input={<OutlinedInput label="Features" />}
              renderValue={selected =>
                features.filter(f => selected.includes(f.id)).map(f => f.name).join(', ')
              }
            >
              {features.map(feature => (
                <MenuItem key={feature.id} value={feature.id}>
                  <Checkbox checked={selectedFeatures.includes(feature.id)} />
                  <ListItemText primary={feature.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2, backgroundColor: '#2c3e50', '&:hover': { backgroundColor: '#1a252f' } }}
        >
            Create Car
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}