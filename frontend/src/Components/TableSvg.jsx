import React from 'react';

const TableSVG = ({
  type = 'round', // "round" | "rect" | "square"
  cx,
  cy,
  chairs = 6,
  name = '',
  reserved = false,
  
}) => {
  const chairWidth = 12;
  const chairHeight = 18;

  const tableFill = reserved ? 'url(#reservedGradient)' : 'url(#tableGradient)';
  const tableStroke = reserved ? '#222' : '#704214';

  let tableElement;
  if (type === 'round') {
    tableElement = <circle cx={cx} cy={cy} r={35} />;
  } else if (type === 'rect') {
    tableElement = <rect x={cx - 45} y={cy - 25} width={90} height={50} rx={10} />;
  } else if (type === 'square') {
    tableElement = <rect x={cx - 35} y={cy - 35} width={70} height={70} rx={8} />;
  }

  const chairDistance = type === 'round' ? 55 : 45;
  const angleStep = type === 'round' ? 360 / chairs : 180 / (chairs / 2);
  const angleOffset = type === 'round' ? 0 : 90;

  const chairCoords = Array.from({ length: chairs }, (_, i) => {
    const angle = angleOffset + angleStep * i;
    const rad = (angle * Math.PI) / 180;
    const x = cx + chairDistance * Math.cos(rad);
    const y = cy + chairDistance * Math.sin(rad);
    const rotate = angle + 90;
    return { x, y, rotate };
  });

  return (
    <g>
      {/* Gradients definitions */}
      <defs>
        <radialGradient id="tableGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d2b48c" />
          <stop offset="100%" stopColor="#a0522d" />
        </radialGradient>
        <radialGradient id="reservedGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#555" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Table */}
      {React.cloneElement(tableElement, {
        fill: tableFill,
        stroke: tableStroke,
        strokeWidth: 2,
        filter: 'url(#shadow)',
      })}

      {/* Table ID */}
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        fontSize="14"
        fill="#fff"
        fontWeight="bold"
        pointerEvents="none"
      >
        {name}
      </text>

      {/* Chairs */}
      {chairCoords.map((chair, i) => (
        <rect
          key={i}
          x={chair.x - chairWidth / 2}
          y={chair.y - chairHeight / 2}
          width={chairWidth}
          height={chairHeight}
          rx={4}
          fill="#444"
          stroke="#222"
          strokeWidth={1}
          transform={`rotate(${chair.rotate}, ${chair.x}, ${chair.y})`}
          filter="url(#shadow)"
        />
      ))}
    </g>
  );
};

export default TableSVG;
