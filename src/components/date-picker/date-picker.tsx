'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useController, useFormContext } from 'react-hook-form'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'

export const DatePicker = () => {
  const [open, setOpen] = useState(false)
  const form = useFormContext()

  const {
    field: { value, onChange },
  } = useController({
    name: 'createDate',
    control: form.control,
  })

  return (
    <FormItem className="flex flex-col">
      <FormLabel>Tarih Seçiniz</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal',
                !value && 'text-muted-foreground'
              )}
              onClick={() => setOpen(!open)}
            >
              {value ? value : <span>Tarih Seçiniz</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => {
              if (date) {
                onChange(format(date, 'dd/MM/yyyy'))
                setOpen(false)
              }
            }}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}
