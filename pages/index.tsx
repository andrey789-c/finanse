import { useState } from "react";
import Header from "../components/Header";
import classes from '../styles/Home.module.css'
import Income from "../components/Income";
import Expenses from "../components/Expenses";


export default function Home() {
  const [incomeSum, setIncomeSum] = useState<number>(0)
  const [expensesSum, setExpensesSum] = useState<number>(0)

  return (
    <>
      <Header />
      <div className="container">
        <div className={classes.columns}>
          <Income sum={incomeSum} setSum={setIncomeSum}/>
          <Expenses sum={expensesSum} setSum={setExpensesSum}/>

          
        </div>
        <div className={[incomeSum - expensesSum > 0 ? classes.green : classes.red, classes.sum].join(' ')}>Ваш баланс: {incomeSum - expensesSum}</div>
      </div>
      
    </>
  )
}
