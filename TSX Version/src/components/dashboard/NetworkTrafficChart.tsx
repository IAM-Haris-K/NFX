import React, { useState } from 'react';
import { AreaClosed, Line, Bar } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
import { motion } from 'framer-motion';
import { extent, max, bisector } from 'd3-array';
import { LinearGradient } from '@visx/gradient';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { timeFormat } from 'd3-time-format';

interface TooltipData {
  date: string;
  value: number;
}

const formatDate = timeFormat("%b %d, %H:%M");
const bisectDate = bisector<{ date: string; value: number }, Date>((d) => new Date(d.date)).left;

interface NetworkTrafficChartProps {
  data: { date: string; value: number }[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const NetworkTrafficChart: React.FC<NetworkTrafficChartProps> = ({
  data,
  width,
  height,
  margin = { top: 20, right: 30, bottom: 50, left: 50 }
}) => {
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);
  
  // For tooltip
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<TooltipData>();

  // Bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Accessors
  const getDate = (d: { date: string; value: number }) => new Date(d.date);
  const getValue = (d: { date: string; value: number }) => d.value;

  // Scales
  const dateScale = scaleTime<number>({
    range: [0, innerWidth],
    domain: extent(data, getDate) as [Date, Date],
  });

  const valueScale = scaleLinear<number>({
    range: [innerHeight, 0],
    domain: [0, (max(data, getValue) || 0) * 1.1],
    nice: true,
  });

  const handleTooltip = (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
    const { x } = localPoint(event) || { x: 0 };
    const x0 = dateScale.invert(x - margin.left);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && getDate(d1)) {
      d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: dateScale(getDate(d)) + margin.left,
      tooltipTop: valueScale(getValue(d)) + margin.top,
    });
  };

  return (
    <div className="bg-dark-800 rounded-lg shadow-md p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Network Traffic</h2>
        <div className="flex space-x-2">
          <button 
            className={`px-2 py-1 text-xs rounded ${activeProtocol === null ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
            onClick={() => setActiveProtocol(null)}
          >
            All
          </button>
          <button 
            className={`px-2 py-1 text-xs rounded ${activeProtocol === 'TCP' ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
            onClick={() => setActiveProtocol('TCP')}
          >
            TCP
          </button>
          <button 
            className={`px-2 py-1 text-xs rounded ${activeProtocol === 'UDP' ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
            onClick={() => setActiveProtocol('UDP')}
          >
            UDP
          </button>
          <button 
            className={`px-2 py-1 text-xs rounded ${activeProtocol === 'HTTP' ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
            onClick={() => setActiveProtocol('HTTP')}
          >
            HTTP(S)
          </button>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <LinearGradient
            id="area-gradient"
            from="#1A56DB"
            to="#1A56DB"
            fromOpacity={0.4}
            toOpacity={0.1}
          />
          <Group left={margin.left} top={margin.top}>
            <GridRows
              scale={valueScale}
              width={innerWidth}
              stroke="#374151"
              strokeOpacity={0.2}
              strokeDasharray="4,4"
            />
            <GridColumns
              scale={dateScale}
              height={innerHeight}
              stroke="#374151"
              strokeOpacity={0.2}
              strokeDasharray="4,4"
            />
            <AreaClosed<{ date: string; value: number }>
              data={data}
              x={(d) => dateScale(getDate(d)) ?? 0}
              y={(d) => valueScale(getValue(d)) ?? 0}
              yScale={valueScale}
              curve={curveMonotoneX}
              fill="url(#area-gradient)"
            />
            <Line<{ date: string; value: number }>
              data={data}
              x={(d) => dateScale(getDate(d)) ?? 0}
              y={(d) => valueScale(getValue(d)) ?? 0}
              stroke="#1A56DB"
              strokeWidth={2}
              curve={curveMonotoneX}
            />
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {data.map((d, i) => (
                <Bar
                  key={`bar-${i}`}
                  x={dateScale(getDate(d)) - 4}
                  y={valueScale(getValue(d)) - 4}
                  width={8}
                  height={8}
                  fill="transparent"
                  onMouseMove={handleTooltip}
                  onMouseLeave={hideTooltip}
                />
              ))}
            </motion.g>
            <AxisBottom
              top={innerHeight}
              scale={dateScale}
              stroke="#6B7280"
              tickStroke="#6B7280"
              tickFormat={(value) => {
                const date = value as Date;
                return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
              }}
              tickLabelProps={() => ({
                fill: '#9CA3AF',
                fontSize: 10,
                textAnchor: 'middle',
              })}
            />
            <AxisLeft
              scale={valueScale}
              stroke="#6B7280"
              tickStroke="#6B7280"
              tickFormat={(value) => {
                const val = value as number;
                return val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toString();
              }}
              tickLabelProps={() => ({
                fill: '#9CA3AF',
                fontSize: 10,
                textAnchor: 'end',
                dx: '-0.25em',
                dy: '0.25em',
              })}
            />
          </Group>
        </svg>
        {tooltipData && (
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
              background: '#1F2937',
              border: '1px solid #374151',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <div>
              <strong>{formatDate(new Date(tooltipData.date))}</strong>
              <div>{`${tooltipData.value.toLocaleString()} packets`}</div>
            </div>
          </TooltipWithBounds>
        )}
      </div>
    </div>
  );
};

export default NetworkTrafficChart;