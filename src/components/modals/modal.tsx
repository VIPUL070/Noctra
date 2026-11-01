'use client'

import type { ReactElement, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export interface ModalProps {
  children: ReactNode
  trigger: ReactElement
  title: string
  description?: string
  className?: string
}

const Modal = ({ children, description, title, className, trigger }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger className={className} render={trigger} />
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal