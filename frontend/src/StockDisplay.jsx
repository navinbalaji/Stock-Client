import React from 'react'

const StockDisplay = ({stockName, stockValue}) => {
  return (
    <div className='stockDisplayContainer'>
        <p className='stockName'>{stockName}</p>
        <p className='stockValue'>{stockValue}</p>
    </div>
  )
}

export default StockDisplay