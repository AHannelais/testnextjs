const React = require("react");
const PropTypes = require("prop-types");

const Boxplot = function({
  width,
  height,
  orientation,
  min,
  max,
  stats,
  style,
  tickStyle,
  scaleBar,
  whiskerStrokeWidth,
  whiskerStyle,
  boxStyle,
  medianStrokeWidth,
  medianStyle,
  className
}) {
  let xMax, horizScaleFactor, vertScaleFactor, transforms;
  if (orientation === "vertical") {
    xMax = width + scaleBar.width;

    vertScaleFactor = height / (max - min);
    horizScaleFactor = 1.0;

    // Coordinate system: +y at the top, +x to the right.
    transforms = [
      `translate (${-min}, 0)`,
      `translate (0, ${height})`,
      `scale(1, -${vertScaleFactor})`
    ];
  } else {
    xMax = height;

    horizScaleFactor = width / (max - min);
    vertScaleFactor = 1.0;

    // Coordinate system: +y at the right, +x to the top.
    transforms = [
      `scale(${horizScaleFactor}, 1) `,
      `translate (${-min}, 0) `,
      `translate (0, ${height}) `,
      "rotate(-90)"
    ];
  }

  const xMin = scaleBar.width;
  const xCenter = (xMax + scaleBar.width) / 2;

  return (
    <svg width={width + scaleBar.width} height={height} className={className}>
      <text x={3} y={height - 5} fill="black">
        {min}
      </text>
      <text x={3} y={17} fill="black">
        {max}
      </text>
      <g transform={transforms.join(" ")} style={style}>
        <line
          key="scale bar"
          x1={0}
          x2={0}
          y1={min}
          y2={max}
          strokeWidth={(10 * whiskerStrokeWidth) / vertScaleFactor}
          style={tickStyle}
        />

        <line
          key="scale bar tick-low"
          x1={0}
          x2={15}
          y1={min}
          y2={min}
          strokeWidth={whiskerStrokeWidth / horizScaleFactor}
          style={tickStyle}
        />
        <line
          key="scale bar tick-high"
          x1={0}
          x2={15}
          y1={max}
          y2={max}
          strokeWidth={whiskerStrokeWidth / horizScaleFactor}
          style={tickStyle}
        />
        <line
          key="tick-low"
          x1={xMin}
          x2={xMax}
          y1={stats.whiskerLow}
          y2={stats.whiskerLow}
          strokeWidth={whiskerStrokeWidth / horizScaleFactor}
          style={tickStyle}
        />
        <line
          key="whisker-low"
          x1={xCenter}
          x2={xCenter}
          y1={stats.whiskerLow}
          y2={stats.quartile1}
          strokeWidth={whiskerStrokeWidth / vertScaleFactor}
          style={whiskerStyle}
        />
        <rect
          key="box"
          x={xMin}
          width={xMax - xMin}
          y={stats.quartile1}
          height={stats.quartile3 - stats.quartile1}
          strokeWidth="0,5"
          style={boxStyle}
        />
        <line
          key="median"
          x1={xMin}
          x2={xMax}
          y1={stats.quartile2}
          y2={stats.quartile2}
          strokeWidth={medianStrokeWidth / horizScaleFactor}
          style={medianStyle}
        />
        <line
          key="whisker-high"
          x1={xCenter}
          x2={xCenter}
          y1={stats.whiskerHigh}
          y2={stats.quartile3}
          strokeWidth={whiskerStrokeWidth / vertScaleFactor}
          style={whiskerStyle}
        />
        <line
          key="tick-high"
          x1={xMin}
          x2={xMax}
          y1={stats.whiskerHigh}
          y2={stats.whiskerHigh}
          strokeWidth={whiskerStrokeWidth / horizScaleFactor}
          style={tickStyle}
        />
      </g>
    </svg>
  );
};
export default Boxplot;

Boxplot.propTypes = {
  // Width of the svg element
  width: PropTypes.number.isRequired,
  // Height of the svg element
  height: PropTypes.number.isRequired,
  // Orientation of the plot. vertical means min values at the left,
  // horizontal means min values at the bottom.
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),

  // Minimum and maximum values for the axis. Values outside this
  // range are clipped.
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,

  // The stats to plot.
  stats: PropTypes.shape({
    // The tick of the lower whisker.
    whiskerLow: PropTypes.number.isRequired,
    // The lower end of the box.
    quartile1: PropTypes.number.isRequired,
    // The median.
    quartile2: PropTypes.number.isRequired,
    // The upper end of the box.
    quartile3: PropTypes.number.isRequired,
    // The tick of the upper whisker.
    whiskerHigh: PropTypes.number.isRequired
  }),
  scaleBar: PropTypes.shape({
    // The width of the scaleBar.
    width: PropTypes.number
  }),
  style: PropTypes.object,
  tickStyle: PropTypes.object,
  whiskerStrokeWidth: PropTypes.number,
  whiskerStyle: PropTypes.object,
  boxStyle: PropTypes.object,
  medianStrokeWidth: PropTypes.number,
  medianStyle: PropTypes.object,

  // Pass through, to support styled-components.
  className: PropTypes.string
};

Boxplot.defaultProps = {
  orientation: "vertical",
  style: { strokeOpacity: 1, fillOpacity: 0.75 },
  //tickStyle: { stroke: "black", strokeDasharray: "2,2" },
  tickStyle: { stroke: "black" },
  whiskerStrokeWidth: 1,
  //whiskerStyle: { stroke: "black", strokeDasharray: "2,2" },
  whiskerStyle: { stroke: "black" },
  boxStyle: { stroke: "black", fill: "white" },
  medianStrokeWidth: 1,
  medianStyle: { stroke: "black" },
  scaleBar: { width: 15 }
};
