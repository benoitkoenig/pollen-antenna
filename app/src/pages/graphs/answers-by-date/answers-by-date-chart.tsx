import * as d3 from "d3";
import { memo, useEffect, useRef } from "react";

interface DataPoint {
  date: string;
  yesCount: number;
  noCount: number;
}

interface AnswersByDateChartProps {
  data: DataPoint[];
}

export const AnswersByDateChart = memo(function AnswersByDateChart({
  data,
}: AnswersByDateChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !data || data.length === 0)
      return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Get dimensions from container
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Set up dimensions
    const margin = { top: 20, right: 80, bottom: 50, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Parse dates and sort data
    const parsedData = data
      .map((d) => ({
        date: new Date(d.date),
        yesCount: d.yesCount,
        noCount: d.noCount,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x = d3
      .scaleBand()
      .domain(parsedData.map((d) => d.date.toISOString()))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(parsedData, (d) => d.yesCount + d.noCount) || 0])
      .nice()
      .range([height, 0]);

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(x).tickFormat((d) => d3.timeFormat("%b %d")(new Date(d))),
      )
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y));

    // Add Y axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("Number of Answers");

    // Add "Yes" bars (bottom layer)
    svg
      .selectAll(".bar-yes")
      .data(parsedData)
      .enter()
      .append("rect")
      .attr("class", "bar-yes")
      .attr("x", (d) => x(d.date.toISOString()) || 0)
      .attr("y", (d) => y(d.yesCount))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.yesCount))
      .attr("fill", "#10b981");

    // Add "No" bars (top layer, stacked on "Yes")
    svg
      .selectAll(".bar-no")
      .data(parsedData)
      .enter()
      .append("rect")
      .attr("class", "bar-no")
      .attr("x", (d) => x(d.date.toISOString()) || 0)
      .attr("y", (d) => y(d.yesCount + d.noCount))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(d.yesCount) - y(d.yesCount + d.noCount))
      .attr("fill", "#ef4444");

    // Add tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px 12px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", "1000");

    // Add invisible overlay for better hover detection
    svg
      .selectAll(".hover-area")
      .data(parsedData)
      .enter()
      .append("rect")
      .attr("class", "hover-area")
      .attr("x", (d) => x(d.date.toISOString()) || 0)
      .attr("y", 0)
      .attr("width", x.bandwidth())
      .attr("height", height)
      .attr("fill", "transparent")
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(
            `<strong>${d3.timeFormat("%B %d, %Y")(d.date)}</strong><br/>
             <span style="color: #10b981;">● Yes: ${d.yesCount}</span><br/>
             <span style="color: #ef4444;">● No: ${d.noCount}</span><br/>
             <span style="color: #999;">Total: ${d.yesCount + d.noCount}</span>`,
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    // Add legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 60}, 0)`);

    legend
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 6)
      .attr("fill", "#ef4444");

    legend
      .append("text")
      .attr("x", 15)
      .attr("y", 0)
      .attr("dy", ".35em")
      .style("font-size", "14px")
      .text("No");

    legend
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 25)
      .attr("r", 6)
      .attr("fill", "#10b981");

    legend
      .append("text")
      .attr("x", 15)
      .attr("y", 25)
      .attr("dy", ".35em")
      .style("font-size", "14px")
      .text("Yes");

    // Cleanup tooltip on unmount
    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <div ref={containerRef} className="w-full aspect-12/3 overflow-x-auto">
      <svg ref={svgRef} className="mx-auto" />
    </div>
  );
});
