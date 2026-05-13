import { Card, type CardProps } from '@mantine/core';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';

interface SurfaceCardProps extends Omit<CardProps, 'children'> {
  children: ReactNode;
  hover?: boolean;
  glass?: boolean;
  motionProps?: HTMLMotionProps<'div'>;
}

const MotionCard = motion(Card);

export const SurfaceCard = forwardRef<HTMLDivElement, SurfaceCardProps>(function SurfaceCard(
  { children, hover = false, glass = false, motionProps, style, ...rest },
  ref,
) {
  return (
    <MotionCard
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      whileHover={hover ? { y: -2 } : undefined}
      {...motionProps}
      withBorder={false}
      radius="lg"
      shadow="sm"
      padding="lg"
      style={{
        background: glass ? 'var(--app-glass-bg)' : 'var(--app-surface)',
        backdropFilter: glass ? 'saturate(180%) blur(14px)' : undefined,
        WebkitBackdropFilter: glass ? 'saturate(180%) blur(14px)' : undefined,
        border: '1px solid var(--app-border)',
        boxShadow: 'var(--app-shadow-card)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </MotionCard>
  );
});
