import { Button } from '@/components/ui/button';
import { fetchMarketChart } from '@/State/Coin/Action';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';

const timeSeries = [
  {
    keyword:"DIGITAL_CURRENCY_DAILY",
    key:"Time Series (Daily)",
    lable:"1 Day",
    value: 1,
  },
  {
    keyword:"DIGITAL_CURRENCY_WEEKLY",
    key:"Weekly Time Series",
    lable:"1 Week",
    value: 7,
  },
  {
    keyword:"DIGITAL_CURRENCY_MONTHLY",
    key:"Monthly Time Series",
    lable:"1 Month",
    value: 30,
  },
  {
    keyword:"DIGITAL_CURRENCY_YEARLY",
    key:"Yearly Time Series",
    lable:"1 Year",
    value: 365,
  },
  
];

const StockChart = ({coinId}) => {
  const dispatch = useDispatch()
  const {coin} = useSelector(store => store)
  const [activeLable, setActiveLable] = useState("1 Day")
  const searies =[
    {
      data:coin.marketChart.data,
    },
  ];
  const options = {
    chart:{
      id:"area-datetime",
      type:"area",
      height:450,
      zoom:{
        autoScaleYaxis:true
      }
    },
    dataLabels:{
      enabled:false
    },
    xaxis:{
      type:"datetime",
      tickAmount:6
    },
    markers:{
      colors:["#fff"],
      strokeColor:"#fff",
      size:0,
      strokeWidth:1,
      style:"hollow",
    },
    tooltip:{
      theme:"dark"
    },
    fill:{
      type:"gradient",
      gradient:{
        shadeIntensity:1,
        opacityForm:0.7,
        opacityTo:0.9,
        stops:[0,100]
      }
    },
    grid:{  
      borderColor: "#47535E",
      strokeDashArray: 4,
      show:true
    },
     colors:["#758AA2"]
  }

  const handleActiveLable=(value) => {

    setActiveLable(value)
  }
  useEffect(() => {
    dispatch(fetchMarketChart({coinId, days:30, jwt:localStorage.getItem("jwt")}))
  }, [dispatch, coinId, activeLable])
  return (

    <div>
      <div className='space-x-3'>
        {timeSeries.map((item)=><Button variant={activeLable==item.lable?"":"outline"} onClick={()=>handleActiveLable(item.lable)} key={item.lable}>
          {item.lable}
          </Button>)}
      </div>
      <div id="chart-timelines">
        <ReactApexChart 
          options={options} 
          series={searies} 
          height={450}
          type='area'
        />
      </div>
    </div>
  )
}

export default StockChart