import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface D3ComponentProps {
  data: EnrichedCompany[];
}

const D3Component: React.FC<D3ComponentProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const width = 800;
      const height = 600;

      svg.attr('width', width).attr('height', height);

      const simulation = d3.forceSimulation(data)
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(30));

      const nodes = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 20)
        .style('fill', '#4299e1');

      const labels = svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(d => d.name)
        .attr('font-size', '12px')
        .attr('dx', 22)
        .attr('dy', 4);

      simulation.on('tick', () => {
        nodes
          .attr('cx', d => d.x!)
          .attr('cy', d => d.y!);

        labels
          .attr('x', d => d.x!)
          .attr('y', d => d.y!);
      });
    }
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default D3Component;

interface EnrichedCompany {
  name: string;
  website: string;
  x?: number;
  y?: number;
  // Add other enriched properties here
}