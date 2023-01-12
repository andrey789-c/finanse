export interface IIncome {
    source: string;
    price: number | string
  }

export interface IIncomeList {
    incomes: IIncome[]
}