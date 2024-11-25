'use client'

import * as React from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Separator } from '../ui/separator'

interface DrawerFormProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
}

export const DrawerForm: React.FC<DrawerFormProps> = ({
  isOpen,
  onClose,
  onOpen,
  title = 'Default Title',
  description = 'Default Description',
  children,
}) => {
  return (
    <Drawer
      direction="right"
      open={isOpen}
      onOpenChange={(open) => (open ? onOpen() : onClose())}
    >
      <DrawerContent position="right">
        <div className="mx-auto w-full max-w-sm p-4">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <Separator />
          <div className="py-4">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
