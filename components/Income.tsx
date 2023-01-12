import { addDoc, collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { IIncome } from '../interfaces/Income'
import classes from '../styles/Home.module.css'

interface IncomeProps {
    sum: number,
    setSum: (num: number) => void
}

const Income = ({sum, setSum}: IncomeProps) => {
  const [incomeList, setIncomeList] = useState<IIncome[]>([])
  const [source, setSource] = useState<string>('empty')
  const [price, setPrice] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | Error>('')

  const addIncome = async() => {
    if(source.length > 3 && Number(price) > 1) {
      const newIncome: IIncome = {
        price, source
      }

      setIncomeList([...incomeList, newIncome])
      
      try {
        const docRef = await addDoc(collection(db, "income"), {
          price, source
        });
        setSource('empty')
        setPrice('')
        
      } catch (e: any) {
        setError(e.message)
      } 
    }

    
  }

  useEffect(() => {
    let newArr: IIncome[] = []
    

    const readDb = async() => {
      try {
          const querySnapshot = await getDocs(collection(db, "income"))
          querySnapshot.forEach(i => newArr.push(i.data() as IIncome))
      
          setIncomeList(newArr)
      } catch (e:any) {
        setError(e.message)
      } finally {
          setLoading(false)
      }
      
    }

    readDb()
  }, [])

  useEffect(() => {
    setSum(0)
    let newSum = 0
    incomeList.forEach(i => newSum += Number(i.price))

    setSum(newSum)
  }, [incomeList])
  
    return (
        <div className={classes.column}>
            <div className={classes.column__title}>Список доходов</div>
            <select onChange={e => setSource(e.target.value)} value={source} className={classes.column__select} name="income">
              <option value="empty" disabled>Выберите источник дохода</option>
              <option value="Работа">Работа</option>
              <option value="Стипендия">Стипендия</option>
              <option value="Пенсия">Пенсия</option>
              <option value="Подарок">Подарок</option>
              <option value="Другое">Другое</option>
            </select>
            <input onChange={e => setPrice(e.target.value)} value={price} min={1} type='number' className={classes.column__input} placeholder="Введите сумму"/>
            <button onClick={addIncome} className={classes.column__button}>Добавить</button>
          
            {!loading ? incomeList?.map((i, index) => (
              <div className={classes.income} key={index}>
                {i.source} - <span className={classes.income__price}>{i.price}</span>
              </div>
            )) : 'Загрузка!'}
            {incomeList.length < 1 && !loading && <div>Вы не добавили ничего в "Список расходов"</div>}
            {incomeList.length > 1 && <div className={classes.column__sum}>Всего: <span className={classes.column__number}>{sum}</span></div>} 
            {error.toString().length > 1 && error}
          </div>
    )
}
export default Income