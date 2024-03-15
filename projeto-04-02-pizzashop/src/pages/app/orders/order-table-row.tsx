import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import {
  GetOrdersResponse,
  Order,
  OrderStatus as OrderStatusKeys,
} from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  order: Order
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const queryClient = useQueryClient()

  const { mutateAsync: cancelOrderMutate, isPending: isPendingCancelOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess: (_, { orderId }) =>
        updateOrderStatusOnCache(orderId, 'canceled'),
    })

  const { mutateAsync: approveOrderMutate, isPending: isPendingApproveOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: (_, { orderId }) =>
        updateOrderStatusOnCache(orderId, 'processing'),
    })

  const {
    mutateAsync: dispatchOrderMutate,
    isPending: isPendingDispatchOrder,
  } = useMutation({
    mutationFn: dispatchOrder,
    onSuccess: (_, { orderId }) =>
      updateOrderStatusOnCache(orderId, 'delivering'),
  })

  const { mutateAsync: deliverOrderMutate, isPending: isPendingDeliverOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess: (_, { orderId }) =>
        updateOrderStatusOnCache(orderId, 'delivered'),
    })

  function updateOrderStatusOnCache(orderId: string, status: OrderStatusKeys) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) return { ...order, status }
          return order
        }),
      })
    })
  }

  const canCancel =
    ['pending', 'processing'].includes(order.status) && !isPendingCancelOrder

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs">{order.orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isPendingApproveOrder}
            onClick={() => approveOrderMutate({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}
        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isPendingDispatchOrder}
            onClick={() => dispatchOrderMutate({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}
        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isPendingDeliverOrder}
            onClick={() => deliverOrderMutate({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant="outline"
          size="xs"
          disabled={!canCancel}
          onClick={() => cancelOrderMutate({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
