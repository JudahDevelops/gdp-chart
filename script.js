const svg = d3.select('body')
    .append('svg')

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(data => {
        const scale = d3.scaleLinear()
            .domain([0, d3.max(data.data, d => d[1])])
            .range([1, 500])

        svg.selectAll('rect')
            .data(data.data)
            .enter()
            .append('rect')
            .attr('height', d => scale(d[1]))
            .attr('y', d => 500 - scale(d[1]))
            .attr('x', (d, i) => i * 3)

        svg.selectAll('text')
            .data(data.data)
            .enter()
            .append('text')
            .text(d => d[0])
            .attr('x', (d, i) => i * 3)
    })
