import { Operation } from "./Operation"

export interface Rows {
  code: string
  description: string
  discount: string
  finalPrice: string
  operations: Operation[]
  price: string
  quantity: string
  workshop: string
}