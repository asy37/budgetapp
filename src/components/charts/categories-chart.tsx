'use client'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  list: {
    id: string
    name: string
    category?: string
    description: string
    createDate: string
    amount: number
  }[]
}

const CategoriesPie = ({ list }: Props) => {
  const calculateCategoryTotal = (category: string) => {
    return list
      .filter((item) => item.category === category)
      .reduce((total, item) => total + item.amount, 0)
  }

  const categories = Array.from(
    new Set(
      list
        ?.map((item) => item.category)
        .filter((category): category is string => !!category)
    )
  )
  const categoryTotals = categories.map((category) =>
    calculateCategoryTotal(category)
  )

  const data = {
    labels: categories,
    datasets: [
      {
        data: categoryTotals,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FF9F40',
        ],
      },
    ],
  }

  return (
    <div className="mt-6 flex w-full items-center justify-center px-4 text-center sm:px-0">
      <div className="w-[300px] md:w-[500px]">
        <Pie data={data} />
      </div>
    </div>
  )
}
export default CategoriesPie
