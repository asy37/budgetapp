import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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

const TimeGraphic = ({ list }: Props) => {
  const [selectedYear, setSelectedYear] = useState<string>('2024')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)

    const observer = new MutationObserver(() => {
      const darkModeActive = document.documentElement.classList.contains('dark')
      setIsDarkMode(darkModeActive)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const groupByMonth = (items: { createDate: string; amount: number }[]) => {
    const months = Array.from({ length: 12 }, (_, i) =>
      dayjs().month(i).format('MMMM')
    )
    const monthTotals = new Array(12).fill(0)

    items.forEach((item) => {
      const date = dayjs(item.createDate, 'DD/MM/YYYY')
      if (!date.isValid()) {
        console.warn(`Geçersiz tarih formatı: ${item.createDate}`)
        return
      }

      const month = date.month()
      monthTotals[month] += item.amount
    })

    return { months, monthTotals }
  }

  const filteredList = list.filter((item) => {
    const year = dayjs(item.createDate, 'DD/MM/YYYY').year()
    return year.toString() === selectedYear
  })

  const { months, monthTotals } = groupByMonth(filteredList)

  const data = {
    labels: months,
    datasets: [
      {
        label: `(${selectedYear})`,
        data: monthTotals,
        backgroundColor: isDarkMode
          ? 'rgba(75, 192, 192, 0.5)'
          : 'rgba(54, 162, 235, 0.5)',
        borderColor: isDarkMode
          ? 'rgba(75, 192, 192, 1)'
          : 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  }

  const availableYears = [
    ...new Set(
      list
        .map((item) => {
          const date = dayjs(item.createDate, 'DD/MM/YYYY')
          return date.isValid() ? date.year() : null
        })
        .filter((year) => year !== null)
    ),
  ].sort()

  return (
    <div className="flex w-full flex-col items-center justify-center sm:px-0">
      <div className="mb-4">
        <Select
          value={selectedYear}
          onValueChange={(value) => setSelectedYear(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Yıl seçin" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-[300px] md:w-[600px]">
        <Bar data={data} options={options} width={600} height={500} />
      </div>
    </div>
  )
}

export default TimeGraphic
