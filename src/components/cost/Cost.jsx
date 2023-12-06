import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const LineChart = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.thingspeak.com/channels/2366489/fields/1.json?results=11"
        );

        // Assuming the data you need is in the 'feeds' array
        const newData = response.data.feeds.map((feed) => parseFloat(feed.field1));
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function

  }, []); // Empty dependency array to ensure it only runs once on mount

  useEffect(() => {
    // Your existing D3 code

    // setting up svg
    const w = 400;
    const h = 200;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("background", "#c5f6fa");

    // setting the scaling
    // x scales
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);

    // y scales
    const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([h, 0]);

    // Setup functions to draw Lines ---------------//
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    // setting the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(1 + data.length)
      .tickFormat((i) => i + 1);

    const yAxis = d3.axisLeft(yScale).ticks(7);
    svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`);
    svg.append("g").call(yAxis);

    // setting up the data for the svg
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black");

  }, [data]);

  return (
    <div>
      <svg ref={svgRef} style={{ margin: "100px", display: "block" }}></svg>
    </div>
  );
};

export default LineChart;
