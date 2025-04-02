const w = 800;
const h = 400;
const margin = {top: 50, right: 50, bottom: 50, left: 50};

const svg = d3.select('body')
    .append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(data => {
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data.data, d => d[1])])
            .range([h, 0])

        const xScale = d3.scaleTime()
            .domain([d3.min(data.data, d => new Date(d[0])), d3.max(data.data, d => new Date(d[0]))])
            .range([0, w])

        
        const heightScale = d3.scaleLinear()
            .domain([0, d3.max(data.data, d => d[1])])
            .range([0, h])

        svg.selectAll('rect')
            .data(data.data)
            .enter()
            .append('rect')
            .attr('height', d => heightScale(d[1]))
            .attr('y', d => h - heightScale(d[1]))
            .attr('x', (d) => xScale(new Date(d[0])))
            .attr('width', w / 270)
            .attr('fill', 'steelblue')
            .on("mouseover", (event, d) => {

                const xPosition = xScale(new Date(d[0])) + 40;
                const year = d[0][0] + d[0][1] + d[0][2] + d[0][3];
                const month = d[0][5] + d[0][6];
                const quarter = month === '01' ? 'Q1' : month === '04' ? 'Q2' : month === '07' ? 'Q3' : month === '10' ? 'Q4' : '';

                svg.append('rect')
                .attr('class', 'border')
                .attr('x', xPosition - 17)
                .attr('y', 228)
                .attr('width', 154)
                .attr('height', 76.5)
                .attr('fill', 'black')

                svg.append('rect')
                    .attr('class', 'back-hovr')
                    .attr('x', xPosition - 15)
                    .attr('y', 230)

                svg.append('text')
                    .attr('class', 'tooltip')
                    .attr('x', xPosition)
                    .attr('y', 260)
                    .text(`${year} ${quarter}`)
                    .append('tspan')
                    .attr('x', xPosition)
                    .attr('y', 280)
                    .text(`$${d[1]} Billion`)
            })
            .on("mouseout", () => {
                svg.selectAll('.tooltip').remove();
                svg.selectAll('.back-hovr').remove();
                svg.selectAll('.border').remove();
            })
           
        

        const yAxis = d3.axisLeft(yScale)
        const xAxis = d3.axisBottom(xScale)

        svg.append('g')
            .call(yAxis)

        svg.append('g')
            .attr('transform', 'translate(0, '+ h +')')
            .call(xAxis)
    })
