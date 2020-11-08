import React from 'react';
import { Package } from '../../common/package.model';
import './HistoryResult.css';

import * as d3 from 'd3';

import { BYTE_NUMBER, UNITS } from '../model/version.model';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const CARD_PADDING: number = 20;

interface IHistoryResultProps {
  packages: Array<Package>;
}

/**
 * HistoryResult component displays a bar chart with the size of the previous versions
 * of a package
 */
export default class HistoryResult extends React.Component<IHistoryResultProps> {

  cardRef: React.RefObject<any>;
  subscription!: Subscription;

  constructor(props: IHistoryResultProps) {
    super(props);
    this.cardRef = React.createRef();
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    const resizeSubject = fromEvent<any>(window, 'resize')
      .pipe( debounceTime(100));
    this.subscription = resizeSubject.subscribe(() => {
      this.drawChart();
    });
    this.drawChart();
  }

  componentWillUnmount() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  drawChart(): void {
    if (this.cardRef != null && this.cardRef.current != null) {
      const margin = {top: 20, right: 30, bottom: 35, left: 30};
      let width = this.cardRef.current.clientWidth - 2 * CARD_PADDING - margin.left - margin.right;
      let height = Math.floor(width / 1.5) - margin.top - margin.bottom;
      const [data, unit]: [Array<any>, string] = this.computeChartData();

      const keys = ['gsize', 'msize'];
		  const xScale = d3.scaleBand().range([0, width]).padding(0.1);
		  const yScale = d3.scaleLinear().range([height, 0]);
		  const xAxis = d3.axisBottom(xScale);
      const yAxis =  d3.axisLeft(yScale);

      // Clean SVG content if it was already drawn
      d3.select(this.cardRef.current).selectAll('svg').selectChildren().remove();

		  const svg = d3.select(this.cardRef.current).selectAll('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top+10 + margin.bottom+10)
				.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      const stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);
	
      const layers= stack(data);
      xScale.domain(data.map((d: any) => { return d.version; }));
      yScale.domain([0, d3.max(layers[layers.length - 1], (d: any) => { return d[0] + d[1]; }) as number]).nice();

      const layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", (d: any, i: number) => { return i%2 === 0 ? '#007BFF' : '#7FBDFF'; });

		  layer.selectAll("rect")
			  .data((d: any) => { return d; })
			  .enter().append("rect")
        .attr('class', 'bar')
			  .attr("x", (d: any) => { return '' + xScale(d.data.version); })
			  .attr("y", (d: any) => { return yScale(d[1]); })
			  .attr("height", (d: any) => { return yScale(d[0]) - yScale(d[1]) -1; })
        .attr("width", xScale.bandwidth())
        .on("mouseover", () => { tooltip.style("display", null); })
        .on("mouseout", () => { tooltip.style("display", "none"); })
        .on("mousemove", function(d: any) {
          const xPosition = d3.pointer(d, this)[0] - 15;
          const yPosition = d3.pointer(d, this)[1] - 25;
          tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
          tooltip.select("text").text((d3.select(this).data()[0] as Array<number>)[1].toFixed(2) + unit);
        });;

			svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (height+5) + ")")
        .call(xAxis);

			svg.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(0,0)")
        .call(yAxis);

      // Tooltip
      const tooltip = svg.append("g")
        //.attr("class", "tooltip")
        .style("display", "none");
        
      tooltip.append("rect")
        .attr("width", 100)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);

      tooltip.append("text")
        .attr("x", 50)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");
    }
  }

  computeChartData(): [Array<any>, string] {
    // Create chart version
    const res: Array<any> = this.props.packages.map((pckg: Package) => {
      return {
        version: pckg.version,
        msize: pckg.msize,
        gsize: pckg.gsize
      };
    });
    // Compute units and texts
    let i = 0;
    const supByteNumber = (v: any) => {
      return v.msize > BYTE_NUMBER || v.gsize > BYTE_NUMBER;
    }
    while ((i < UNITS.length - 1) && (res.findIndex(supByteNumber) !== -1)) {
      for (let j = 0; j < res.length; j++) {
        res[j].msize = res[j].msize / BYTE_NUMBER;
        res[j].gsize = res[j].gsize / BYTE_NUMBER;
      }
      i++;
    }
    const unit = UNITS[(i < UNITS.length) ? i : (UNITS.length - 1)];
    res.forEach((p: any) => {
      p.total = p.msize;
      p.msize = p.msize - p.gsize;
    });
    return [res, unit];
  }

  render() {
    if (this.props.packages != null && this.props.packages.length > 0) {
      return (<div className="card border border-primary">
        <div className="card-header bg-primary">
          <h2 className="app-headline">History</h2>
        </div>
        <div id="history_chart" className="card-body" ref={this.cardRef}>
          <svg/>
        </div>
      </div>);
    }
    return (<div>&nbsp;</div>);
  }

}