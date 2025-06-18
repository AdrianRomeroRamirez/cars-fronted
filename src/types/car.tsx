export interface Manufacturer {
  id: number
  name: string
  country: string
}

export interface Color {
  id: number
  name: string
  code: string
}

export interface Car {
  id: number
  model: string
  year: number
  engine_type: string
  description: string
  manufacturer: Manufacturer
  colors: Color[]
  features: string[]
}

export interface Feature {
  id: number
  name: string
}