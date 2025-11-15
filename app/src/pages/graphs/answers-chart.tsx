import * as d3 from "d3";
import { memo, useEffect, useMemo, useRef } from "react";

import { useGraphs } from "./graphs-provider";

export const AnswersChart = memo(function AnswersChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { focusedSubdivisionId, subdivisions } = useGraphs();

  const data = useMemo(
    () =>
      subdivisions.find(({ id }) => id === focusedSubdivisionId)?.answersByDate,
    [subdivisions, focusedSubdivisionId],
  );

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
    const margin = { top: 0, right: 30, bottom: 30, left: 30 };
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

    const maxCount = d3.max(parsedData, (d) => d.yesCount + d.noCount) || 1;

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
      .range([0, width]);

    const y = d3.scaleLinear().domain([0, maxCount]).nice().range([height, 0]);

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
    svg.append("g").call(
      d3
        .axisLeft(y)
        .tickValues([0, maxCount])
        .tickFormat((value) => value.toString()),
    );

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
      .attr("fill", "#4a90e2");

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
      .attr("fill", "#999");

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
             <span style="color: #999;">● No: ${d.noCount}</span><br/>
             <span style="color: #4a90e2;">● Yes: ${d.yesCount}</span><br/>
             <span style="color: #999;">Total: ${d.yesCount + d.noCount}</span>`,
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    // Cleanup tooltip on unmount
    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <div ref={containerRef} className="w-full aspect-12/3">
      <svg ref={svgRef} className="overflow-visible" />
    </div>
  );
});
