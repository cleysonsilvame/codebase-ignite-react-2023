import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Header } from '../../components/Header'
import { LayoutContainer } from './styles'

export function DefaultLayout() {
  const { pathname } = useLocation()

  return (
    <LayoutContainer>
      <Header />
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={{
          initial: {
            opacity: 0,
          },
          in: {
            opacity: 1,
          },
          out: {
            opacity: 0,
          },
        }}
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          duration: 0.4,
        }}
      >
        <Outlet />
      </motion.div>
    </LayoutContainer>
  )
}
