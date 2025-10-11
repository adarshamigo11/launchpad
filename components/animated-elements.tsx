"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface AnimatedElement {
  id: string
  type: 'hollow-square' | 'hollow-circle' | 'solid-square' | 'solid-circle'
  size: number
  top: number
  left: number
  animation: 'rotate' | 'rotate-reverse' | 'float' | 'pulse'
  color: string
  delay: number
}

export default function AnimatedElements() {
  const [elements, setElements] = useState<AnimatedElement[]>([])
  const pathname = usePathname()

  // Don't show animations on admin or user dashboard pages
  const shouldShowAnimations = !pathname.startsWith('/admin') && 
                              !pathname.startsWith('/tasks') && 
                              !pathname.startsWith('/leaderboard') && 
                              !pathname.startsWith('/profile') &&
                              !pathname.startsWith('/login')

  useEffect(() => {
    const generateElements = () => {
      const newElements: AnimatedElement[] = []
      const colors = ['#007BFF', '#FFC107', '#28a745', '#dc3545', '#6f42c1', '#fd7e14']
      const types: AnimatedElement['type'][] = ['hollow-square', 'hollow-circle', 'solid-square', 'solid-circle']
      const animations: AnimatedElement['animation'][] = ['rotate', 'rotate-reverse', 'float', 'pulse']

      // Generate 20 random elements
      for (let i = 0; i < 20; i++) {
        newElements.push({
          id: `element-${i}`,
          type: types[Math.floor(Math.random() * types.length)],
          size: Math.random() * 40 + 20, // 20-60px
          top: Math.random() * 100, // 0-100%
          left: Math.random() * 100, // 0-100%
          animation: animations[Math.floor(Math.random() * animations.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2 // 0-2s delay
        })
      }

      setElements(newElements)
    }

    generateElements()
  }, [])

  const renderElement = (element: AnimatedElement) => {
    const baseStyle = {
      position: 'absolute' as const,
      top: `${element.top}%`,
      left: `${element.left}%`,
      width: `${element.size}px`,
      height: `${element.size}px`,
      animationDelay: `${element.delay}s`,
      zIndex: 1,
      pointerEvents: 'none' as const,
    }

    const animationClass = {
      'rotate': 'animate-rotate',
      'rotate-reverse': 'animate-rotate-reverse',
      'float': 'animate-float',
      'pulse': 'animate-pulse-slow'
    }[element.animation]

    switch (element.type) {
      case 'hollow-square':
        return (
          <div
            key={element.id}
            className={`${animationClass} border-2 border-dashed`}
            style={{
              ...baseStyle,
              borderColor: element.color,
              backgroundColor: 'transparent',
            }}
          />
        )

      case 'hollow-circle':
        return (
          <div
            key={element.id}
            className={`${animationClass} border-2 border-dashed rounded-full`}
            style={{
              ...baseStyle,
              borderColor: element.color,
              backgroundColor: 'transparent',
            }}
          />
        )

      case 'solid-square':
        return (
          <div
            key={element.id}
            className={`${animationClass}`}
            style={{
              ...baseStyle,
              backgroundColor: element.color,
              opacity: 0.6,
            }}
          />
        )

      case 'solid-circle':
        return (
          <div
            key={element.id}
            className={`${animationClass} rounded-full`}
            style={{
              ...baseStyle,
              backgroundColor: element.color,
              opacity: 0.6,
            }}
          />
        )

      default:
        return null
    }
  }

  // Don't render anything if animations should be hidden
  if (!shouldShowAnimations) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map(renderElement)}
    </div>
  )
}
