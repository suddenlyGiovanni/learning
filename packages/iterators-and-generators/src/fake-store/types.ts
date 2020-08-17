export interface Customer {
  name: string
}

export type Food = string[]

export interface CustomersTable {
  [key: number]: Customer
}

export interface FoodsTable {
  [key: number]: Food
}

export interface Tables {
  customer: CustomersTable
  food: FoodsTable
}
