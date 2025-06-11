'use client'

import { motion } from 'motion/react'
import React, { useRef, useState } from 'react'
import { mergeProps, useLongPress } from 'react-aria'

const LONG_PRESS_DURATION = 1000 // 5 секунд

export function LongPressButton({ onLongPress }: { onLongPress: () => void }) {
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  const startProgress = () => {
    startTimeRef.current = Date.now()
    animationRef.current = requestAnimationFrame(updateProgress)
    timerRef.current = setTimeout(() => {
      setProgress(1)
      onLongPress()
      clearAll()
    }, LONG_PRESS_DURATION)
  }

  const clearAll = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    setProgress(0)
  }

  const updateProgress = () => {
    const elapsed = Date.now() - startTimeRef.current
    const newProgress = Math.min(elapsed / LONG_PRESS_DURATION, 1)
    setProgress(newProgress)
    if (newProgress < 1) {
      animationRef.current = requestAnimationFrame(updateProgress)
    }
  }

  const { longPressProps } = useLongPress({
    onLongPressStart: startProgress,
    onLongPressEnd: clearAll,
    threshold: LONG_PRESS_DURATION,
  })

  return (
    <button
      {...mergeProps(longPressProps)}
      style={{
        position: 'relative',
        width: 200,
        height: 50,
        border: '2px solid #333',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          backgroundColor: '#007bff',
          zIndex: 0,
        }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ ease: 'linear', duration: 0.1 }}
      />
      <span style={{ position: 'relative', zIndex: 1, color: '#000' }}>
        Удерживайте 5 секунд
      </span>
    </button>
  )
}
