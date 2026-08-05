import { useState } from 'react'

// ─── Config ─────────────────────────────────────────────────────────────────
// Change any of these to instantly restyle the grocery list
export const GROCERY_LIST_CONFIG = {
  colors: {
    paper:    '#F4F1E2',   // background of the list
    lines:    '#C8382A',   // horizontal rule + column divider color
    text:     '#C8382A',   // section header + title text color
    title:    '#C8382A',   // "GROCERY LIST" title color
  },
  fonts: {
    title:    '"Arial Black", "Impact", sans-serif',
    headers:  '"Arial Black", "Impact", sans-serif',
    items:    'Arial, sans-serif',
  },
  sizes: {
    width:    480,         // SVG width in px
    height:   680,         // SVG height in px
    rowHeight: 22,         // height of each line row
    headerFontSize: 13,
    titleFontSize: 18,
    itemFontSize: 12,
  },
  sections: [
    // Top half: 3 columns
    {
      id: 'produce',
      label: 'PRODUCE',
      column: 0,
      rowStart: 0,
      rowCount: 11,
    },
    {
      id: 'cold',
      label: 'COLD',
      column: 1,
      rowStart: 0,
      rowCount: 11,
    },
    {
      id: 'meat',
      label: 'MEAT',
      column: 2,
      rowStart: 0,
      rowCount: 5,
    },
    {
      id: 'bread',
      label: 'BREAD',
      column: 2,
      rowStart: 6,
      rowCount: 5,
    },
    // Bottom half: 2 columns + 1 shared
    {
      id: 'pantry',
      label: 'PANTRY',
      column: 0,
      rowStart: 12,
      rowCount: 10,
    },
    {
      id: 'freezer',
      label: 'FREEZER',
      column: 1,
      rowStart: 12,
      rowCount: 5,
    },
    {
      id: 'home',
      label: 'HOME',
      column: 2,
      rowStart: 18,
      rowCount: 10,
    },
  ],
}

// ─── Types ───────────────────────────────────────────────────────────────────
type Config = typeof GROCERY_LIST_CONFIG
type SectionId =
  | 'produce' | 'cold' | 'meat' | 'bread'
  | 'pantry'  | 'freezer' | 'home'

interface GroceryListProps {
  config?: Partial<Config>
  items?: Partial<Record<SectionId, string[]>>
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function GroceryList({ config: configOverride, items = {} }: GroceryListProps) {
  const cfg: Config = {
    ...GROCERY_LIST_CONFIG,
    colors:  { ...GROCERY_LIST_CONFIG.colors,  ...(configOverride?.colors  ?? {}) },
    fonts:   { ...GROCERY_LIST_CONFIG.fonts,   ...(configOverride?.fonts   ?? {}) },
    sizes:   { ...GROCERY_LIST_CONFIG.sizes,   ...(configOverride?.sizes   ?? {}) },
    sections: configOverride?.sections ?? GROCERY_LIST_CONFIG.sections,
  }

  const { colors, fonts, sizes } = cfg

  // Layout constants
  const PAD_X    = 24
  const PAD_TOP  = 56   // space below title
  const COL_W    = (sizes.width - PAD_X * 2) / 3
  const TITLE_H  = 36

  // Draw a column's content (header + lines)
  function renderSection(
    section: typeof cfg.sections[number],
    sectionItems: string[],
  ) {
    const x     = PAD_X + section.column * COL_W
    const yBase = PAD_TOP + TITLE_H + section.rowStart * sizes.rowHeight

    const rows = []
    for (let i = 0; i < section.rowCount; i++) {
      const y = yBase + i * sizes.rowHeight
      // Is this the header row?
      if (i === 0) {
        rows.push(
          <g key={`header-${section.id}`}>
            <text
              x={x + 4}
              y={y + sizes.rowHeight - 6}
              fill={colors.text}
              fontFamily={fonts.headers}
              fontSize={sizes.headerFontSize}
              fontWeight="bold"
              letterSpacing="1.5"
            >
              {section.label}
            </text>
            <line x1={x} y1={y + sizes.rowHeight} x2={x + COL_W} y2={y + sizes.rowHeight} stroke={colors.lines} strokeWidth={0.8} />
          </g>
        )
      } else {
        const itemText = sectionItems[i - 1] ?? ''
        rows.push(
          <g key={`row-${section.id}-${i}`}>
            {itemText && (
              <text
                x={x + 4}
                y={y + sizes.rowHeight - 6}
                fill={colors.text}
                fontFamily={fonts.items}
                fontSize={sizes.itemFontSize}
                opacity={0.85}
              >
                {itemText}
              </text>
            )}
            <line x1={x} y1={y + sizes.rowHeight} x2={x + COL_W} y2={y + sizes.rowHeight} stroke={colors.lines} strokeWidth={0.5} opacity={0.6} />
          </g>
        )
      }
    }
    return rows
  }

  // Vertical column dividers
  const dividerY1 = PAD_TOP + TITLE_H
  const dividerY2 = sizes.height - 24
  const dividers = [1, 2].map(i => (
    <line
      key={`div-${i}`}
      x1={PAD_X + i * COL_W}
      y1={dividerY1}
      x2={PAD_X + i * COL_W}
      y2={dividerY2}
      stroke={colors.lines}
      strokeWidth={0.8}
    />
  ))

  // Horizontal mid-section divider (between top and bottom halves)
  const midRow   = 12
  const midY     = PAD_TOP + TITLE_H + midRow * sizes.rowHeight
  const midDivider = (
    <line
      x1={PAD_X}
      y1={midY}
      x2={PAD_X + COL_W * 2}  // only spans cols 0+1 (col 2 has its own sections)
      y2={midY}
      stroke={colors.lines}
      strokeWidth={1}
    />
  )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${sizes.width} ${sizes.height}`}
      width={sizes.width}
      height={sizes.height}
      style={{ display: 'block' }}
    >
      {/* Paper background */}
      <rect width={sizes.width} height={sizes.height} fill={colors.paper} />

      {/* Title */}
      <text
        x={PAD_X}
        y={28}
        fill={colors.title}
        fontFamily={fonts.title}
        fontSize={sizes.titleFontSize}
        fontWeight="bold"
        letterSpacing="1"
      >
        GROCERY LIST
      </text>
      {/* Triangle/arrow beside title */}
      <polygon
        points={`${PAD_X + 162},18 ${PAD_X + 172},18 ${PAD_X + 167},27`}
        fill={colors.title}
      />

      {/* Top border line */}
      <line x1={PAD_X} y1={TITLE_H + PAD_TOP - 2} x2={sizes.width - PAD_X} y2={TITLE_H + PAD_TOP - 2} stroke={colors.lines} strokeWidth={1} />

      {/* Column dividers */}
      {dividers}

      {/* Mid-section divider */}
      {midDivider}

      {/* All sections */}
      {cfg.sections.map(section =>
        renderSection(section, (items as Record<string, string[]>)[section.id] ?? [])
      )}

      {/* Bottom credit */}
      <text
        x={sizes.width / 2}
        y={sizes.height - 8}
        textAnchor="middle"
        fill={colors.text}
        fontFamily={fonts.items}
        fontSize={9}
        letterSpacing="2"
        opacity={0.5}
      >
        MBP
      </text>
    </svg>
  )
}