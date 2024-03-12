import { Minus } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MonthCanceledOrdersAmountCardProps {}

export function MonthCanceledOrdersAmountCard(
  props: MonthCanceledOrdersAmountCardProps,
) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <Minus className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">12</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">-4%</span> em
          relação a ontem
        </p>
      </CardContent>
    </Card>
  )
}
