import {isDefined, getComputedWidth, getComputedHeight} from './utilities';
import {generateAxis} from './axes';
import {generateLegends} from './legends';
import {mouseOver} from './mouseover';

/* Bar chart */
export var drawColumnChart = (config) => {
    var chartWidth,
        chartHeight;
    var marginForAxis = {top: 20, right: 20, bottom: 20, left: 30}; 
    var translateChartGroup = {x: 0, y:0};
    var options = config.options;
    var data = config.dataset.data;
    var bg = config.dataset.backgroundColor;
    var borderColor = config.dataset.borderColor;
    var borderWidth = config.dataset.borderWidth;
    var bindedElement = config.drawOn;
    var barPadding = options.barPadding;
    var label = [];
    var legendLabel = config.dataset.legendLabel;
    var legendWidth = options.legends.width;
    var legendHeight = options.legends.height;
    if(options.size.width === "container") {
        chartWidth = getComputedWidth(bindedElement);
    }
    else {
        chartWidth = options.size.width;
    }
    if(options.size.height === "container") {
        chartHeight = getComputedHeight(bindedElement);
    }
    else {
        chartHeight = options.size.height;
    }
    var innerHeight = chartHeight;
    var innerWidth = chartWidth;
    innerWidth = innerWidth - marginForAxis.left - marginForAxis.right;
    innerHeight = innerHeight - marginForAxis.top - marginForAxis.bottom;
    var svg = d3.select(bindedElement).append('svg')
              .attr("class","pc-chart-wrapper")
              .attr("height", chartHeight)
              .attr("width", chartWidth)
    var chartGroup = svg.append("g");
    var dataGroup = chartGroup.append("g");
    if(options.legends.display) {
        var legendMargin = 20;
        innerHeight = innerHeight - legendHeight - legendMargin;
        generateLegends(legendHeight, legendWidth, bg, legendLabel, svg, chartHeight, chartWidth);
    }
    // Copy label from the data array to a separate array
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
              label[key] = data[key].label;
        }
    }
    var xScale = d3.scaleBand()
            .domain(label)
            .rangeRound([0, innerWidth])
            .padding(barPadding);
    var yScale = d3.scaleLinear()
            .domain([config.options.axes.y.min, config.options.axes.y.max])
            .range([innerHeight, 0]);
    translateChartGroup.x = translateChartGroup.x + marginForAxis.left;
    translateChartGroup.y = translateChartGroup.y + marginForAxis.bottom;
    generateAxis(config, innerHeight, chartGroup, translateChartGroup, yScale, xScale);    
    var g = dataGroup.selectAll("rect")
                .data(data)
                .enter()
                .append('g');
    var rect = g.append('rect')
                .attr("y", function(d,i){
                    return yScale(d.value);
                })
                .attr("x", function(d,i) {
                    return xScale(d.label);
                })
                .attr("height",function(d) { return innerHeight - yScale(d.value)})
                .attr("width", xScale.bandwidth())
                .attr("fill",function(d,i) {
                    if(isDefined(bg)) {
                        return bg;
                    }
                })
                .attr("stroke",function(d,i) {
                    if(isDefined(borderColor)) {
                        return borderColor;
                    }
                })
                .attr("stroke-width",function(d,i) {
                    if(isDefined(borderWidth)) {
                        return borderWidth;                        
                    }
                })
                .attr("class", "pc-column-rect");
    mouseOver(rect, config);
    if(options.text.display) {
        var text = g.append("text")
                .text(function(d) {
                    return d.value;
                })
                .attr("x", function(d, i) {
                    return xScale(d.label);
                })
                .attr("y", function(d) {
                    return yScale(d.value) - 20;
                })
                .attr("dominant-baseline","text-before-edge")
                .attr("fill", options.text.color);
    }
}