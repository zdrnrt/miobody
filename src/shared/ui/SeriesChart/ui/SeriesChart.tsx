// components/SensorChart.tsx
import { useEffect, useRef, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { IChartSeries } from '@/entities/Chart';

export const SeriesChart: React.FC<{ data: IChartSeries[] }> = ({ data }) => {
	const margin = { top: 40, right: 80, bottom: 60, left: 80 };
	const pointColor = {
		angle: '#2563eb',
		emg1: '#dc2626',
		emg2: '#16a34a',
		emg3: '#d97706',
		emg4: '#7c3aed',
	};

	const chartContainerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);

	const width = useMemo<number>(() => 1000, []);
	const height = useMemo<number>(() => 600, []);

	const handleMouseMove = useCallback(
		(event: MouseEvent, d: IChartSeries) => {
			if (tooltipRef.current) {
				const tooltip = tooltipRef.current;
				tooltip.style.display = 'block';
				tooltip.style.left = `${event.pageX + 15}px`;
				tooltip.style.top = `${event.pageY - 10}px`;

				tooltip.innerHTML = `
        <div class="tooltip-content">
          <div class="tooltip-header"><strong>Время: ${d.timestamp}</strong></div>
          <div class="tooltip-row">Angle: ${d.angle} °</div>
          <div class="tooltip-row">EMG1: ${d.emg1} mV</div>
          <div class="tooltip-row">EMG2: ${d.emg2} mV</div>
          <div class="tooltip-row">EMG3: ${d.emg3} mV</div>
          <div class="tooltip-row">EMG4: ${d.emg4} mV</div>
        </div>
      `;
			}
		},
		[],
	);

	useEffect(() => {
		if (!svgRef.current || !data.length) return;

		d3.select(svgRef.current).selectAll('*').remove();

		const svg = d3
			.select(svgRef.current)
			.attr('width', '100%')
			.attr('max-width', `${width}px`)
			.attr('height', height);

		const chartGroup = svg
			.append('g')

		const innerWidth = chartContainerRef.current!.clientWidth;
		const innerHeight = height - margin.top - margin.bottom;

		const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
		let chartData = sortedData;

		if (chartData.length > 300) {
			const bucketSize = Math.floor(sortedData.length / 300);
			chartData = [];

			for (let i = 0; i < sortedData.length; i += bucketSize) {
				const start = i;
				const end = Math.min(i + bucketSize, sortedData.length);
				const bucket = sortedData.slice(start, end);

				if (bucket.length === 0) continue;

				const medianPoint: IChartSeries = {
					timestamp: Math.round(
						bucket.reduce((sum, p) => sum + p.timestamp, 0) /
							bucket.length,
					),
					angle: Math.round(
						bucket.reduce((sum, p) => sum + p.angle, 0) /
							bucket.length,
					),
					emg1: Math.round(
						bucket.reduce((sum, p) => sum + p.emg1, 0) /
							bucket.length,
					),
					emg2: Math.round(
						bucket.reduce((sum, p) => sum + p.emg2, 0) /
							bucket.length,
					),
					emg3: Math.round(
						bucket.reduce((sum, p) => sum + p.emg3, 0) /
							bucket.length,
					),
					emg4: Math.round(
						bucket.reduce((sum, p) => sum + p.emg4, 0) /
							bucket.length,
					),
				};

				chartData.push(medianPoint);

				if (chartData.length >= 1000) {
					break;
				}
			}
		}

		const xScale = d3
			.scaleLinear()
			.domain(
				d3.extent(chartData, (d) => d.timestamp) as [number, number],
			)
			.range([0, innerWidth])
			.nice();

		const yScale = d3
			.scaleLinear()
			.domain([
				d3.min(chartData, (d) =>
					Math.min(d.angle, d.angle - 10),
				) as number,
				d3.max(chartData, (d) =>
					Math.max(d.angle, d.angle + 10),
				) as number,
			])
			.range([innerHeight, 0])
			.nice();

		chartGroup
			.append('g')
			.attr('class', 'grid grid-x')
			.attr('transform', `translate(0,${innerHeight})`)
			.call(
				d3
					.axisBottom(xScale)
					.ticks(10)
					.tickSize(-innerHeight)
					.tickFormat(() => ''),
			)
			.style('color', '#e5e7eb')
			.style('stroke-dasharray', '4,4');

		chartGroup
			.append('g')
			.attr('class', 'grid grid-y')
			.call(
				d3
					.axisLeft(yScale)
					.ticks(10)
					.tickSize(-innerWidth)
					.tickFormat(() => ''),
			)
			.style('color', '#e5e7eb')
			.style('stroke-dasharray', '4,4');

		const angleLine = d3
			.line()
			.x((d) => xScale(d.timestamp))
			.y((d) => yScale(d.angle))
			.defined((d) => d.angle !== null && !isNaN(d.angle))
			.curve(d3.curveMonotoneX);

		chartGroup
			.append('path')
			.datum(chartData)
			.attr('class', 'line angle-line')
			.attr('fill', 'none')
			.attr('stroke', pointColor.angle)
			.attr('stroke-width', 2.5)
			.attr('d', angleLine);

		// Добавляем точки для всех значений с тултипами
		const points = chartGroup
			.selectAll('.point-group')
			.data(chartData)
			.enter()
			.append('g')
			.attr('class', 'point-group')
			.attr(
				'transform',
				(d) => `translate(${xScale(d.timestamp)},${yScale(d.angle)})`,
			);

		// Основная точка angle
		points
			.append('circle')
			.attr('class', 'point angle-point')
			.attr('r', 4)
			.attr('fill', pointColor)
			.attr('stroke', '#ffffff')
			.attr('stroke-width', 2)
			.style('cursor', 'pointer')
			.on('mouseover', function (event, d) {
				d3.select(this)
					.transition()
					.duration(200)
					.attr('r', 4 * 1.8)
					.attr('fill', '#2563eb');
			})
			.on('mouseout', function () {
				d3.select(this)
					.transition()
					.duration(200)
					.attr('r', 4)
					.attr('fill', '#2563eb');

				if (tooltipRef.current) {
					tooltipRef.current.style.display = 'none';
				}
			});

		points
			.append('circle')
			.attr('r', 4 * 3)
			.attr('fill', 'transparent')
			.style('cursor', 'pointer')
			.on('mouseover', function (event, d) {
				d3.select(this.parentNode?.querySelector('.angle-point'))
					.transition()
					.duration(200)
					.attr('r', 4 * 1.8)
					.attr('fill', '#f97316');

				handleMouseMove(event, d);
			})
			.on('mousemove', (event, d) => handleMouseMove(event, d))
			.on('mouseout', function () {
				d3.select(this.parentNode?.querySelector('.angle-point'))
					.transition()
					.duration(200)
					.attr('r', 4)
					.attr('fill', '#2563eb');

				if (tooltipRef.current) {
					tooltipRef.current.style.display = 'none';
				}
			});

		chartGroup
			.append('g')
			.attr('class', 'axis axis-x')
			.attr('transform', `translate(0,${innerHeight})`)
			.call(d3.axisBottom(xScale).ticks(10));

		chartGroup
			.append('g')
			.attr('class', 'axis axis-y')
			.call(d3.axisLeft(yScale).ticks(10));

		chartGroup
			.append('text')
			.attr('class', 'axis-label')
			.attr('x', innerWidth / 2)
			.attr('y', innerHeight + margin.bottom - 15);

		chartGroup
			.append('text')
			.attr('class', 'axis-label')
			.attr('transform', 'rotate(-90)')
			.attr('x', -innerHeight / 2)
			.attr('y', -margin.left + 20)
			.attr('text-anchor', 'middle');

		const legend = chartGroup
			.append('g')
			.attr('class', 'legend')
			.attr('transform', `translate(${innerWidth - 100}, 10)`);

		const legendItems = [{ label: 'Angle', color: pointColor.angle }];

		legendItems.forEach((item, i) => {
			const legendRow = legend
				.append('g')
				.attr('transform', `translate(0, ${i * 20})`);

			legendRow.append('circle').attr('r', 6).attr('fill', item.color);

			legendRow
				.append('text')
				.attr('x', 15)
				.attr('y', 4)
				.attr('alignment-baseline', 'middle')
				.text(item.label);
		});

		const anglePath = chartGroup.select('.angle-line');
		const pathLength = anglePath.node()?.getTotalLength() || 0;

		anglePath
			.attr('stroke-dasharray', `${pathLength},${pathLength}`)
			.attr('stroke-dashoffset', pathLength)
			.transition()
			.duration(1500)
			.ease(d3.easeCubicOut)
			.attr('stroke-dashoffset', 0);

		points
			.selectAll('.angle-point')
			.attr('r', 0)
			.transition()
			.duration(800)
			.delay((_, i) => i * 20)
			.attr('r', 4);
	}, [data, width, height, margin, pointColor, handleMouseMove]);

	return (
		<div
			className="sensor-chart-container mx-auto"
			ref={chartContainerRef}
		>
			<svg ref={svgRef} className="sensor-chart"></svg>

			<div
				ref={tooltipRef}
				className="sensor-tooltip absolute hidden bg-gray-700 text-white p-2 rounded-sm pointer-events-none z-50 shadow-2xs min-w-3xs text-sm"
			/>
		</div>
	);
};
