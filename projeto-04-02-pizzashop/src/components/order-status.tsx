import type { OrderStatus } from '@/api/get-orders'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Em preparo',
  delivering: 'Entregando',
  delivered: 'Entregue',
}

const orderStatusColorMap: Record<OrderStatus, string> = {
  pending: 'bg-slate-400',
  canceled: 'bg-rose-500',
  processing: 'bg-amber-500',
  delivering: 'bg-amber-500',
  delivered: 'bg-emerald-400',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${orderStatusColorMap[status]}`} />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
