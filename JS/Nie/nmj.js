document.addEventListener('DOMContentLoaded', function () {
  const snelems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(snelems);

  const mboxes = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(mboxes);

  const collapse = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapse,  { accordion: false });

  const elems = document.querySelectorAll('.parallax');
  const instances = M.Parallax.init(elems);

  const data = {
    name: "Nie Mingjue",
    image: "../../Assets/Character/Nie/Character Page Pics/nmj-icon.png", 
    relationships: [ // Bad-darkgrey, family-blue, friends-green, romance-red
      {
        name: "Nie Huaisang",
        relationship: "Younger Half-brother - They are close siblings. He is strict with Nie Huaisang, often urging him to practice, but is protective of him. His death impacted Huaisang greatly, forcing him to become a sect leader.",
        image: "../../Assets/Character/Nie/Character Page Pics/nhs-icon.png", 
        color: "blue",
        url: "../../Pages/Nie/nhs.html"
      },
      
      {
        name: "Jin Guangyao",
        relationship: "Sworn Brother - Initially, they were close, but he witnessed Jin Guangyao's atrocious acts such as him killing a Nie disciple who wronged him. Together with Lan Xichen, they are the Venerated Triad.",
        image: "../../Assets/Character/Jin/Chacter Page Pics/jgy-icon.png", 
        color: "darkgrey",
        url: "../../Pages/Jin/jgy.html"
      },

      {
        name: "Lan Xichen",
        relationship: "Sworn Brother - They knew each other for long, both being sect leaders and prominent figures in Sunshot. Lan Xichen gave his clan's music piece to try to help Nie Mingjue's unstable qi, but Jin Guangyao used it to murder him. Together with Jin Guangyao, they are the Venerated Triad.",
        image: "../../Assets/Character/Lan/Character Page Pics/lxc-icon.png", 
        color: "green",
        url: "../../Pages/Lan/lxc.html"
      },
    ]
};

// Dimensions
const width = 800;
const height = 400;
const centerX = width / 2;
const centerY = height / 2;

// Create SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Add relationships
const tooltip = d3.select("#tooltip")


// Draw links
const links = svg.selectAll(".link")
    .data(data.relationships)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("x1", centerX)
    .attr("y1", centerY)
    .attr("x2", (d, i) => centerX + 150 * Math.cos((i / data.relationships.length) * 2 * Math.PI))
    .attr("y2", (d, i) => centerY + 150 * Math.sin((i / data.relationships.length) * 2 * Math.PI))
    .attr("stroke", d => d.color);

// Draw nodes
const nodes = svg.selectAll(".node")
    .data([data, ...data.relationships])
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d, i) => {
      if (i === 0) return `translate(${centerX}, ${centerY})`; // Center character
      return `translate(${centerX + 150 * Math.cos((i - 1) / data.relationships.length * 2 * Math.PI)}, 
                        ${centerY + 150 * Math.sin((i - 1) / data.relationships.length * 2 * Math.PI)})`;
    })
    .on("mouseover", (event, d) => {
        if (d.relationship) {
            const nodePosition = event.target.getBoundingClientRect();
            tooltip
                .style("left", `${nodePosition.x + window.scrollX}px`)
                .style("top", `${nodePosition.y + window.scrollY - 20}px`) // Adjust height
                .style("opacity", 1)
                .text(d.relationship);
        }
    })
    .on("mouseout", () => {
        tooltip.style("opacity", 0); // Hide tooltip when mouse leaves
    })
    .on("click", (event, d) => {
      if (d.url) window.location.href = d.url;
    });

// Add circles
nodes.append("circle")
    .attr("r", 35);

// Add images
nodes.append("image")
  .attr("xlink:href", d => d.image)
  .attr("x", -30)  // Position the image so it is centered within the node (adjust as needed)
  .attr("y", -30)  // Same as above, adjust the vertical positioning
  .attr("width", 60)  // Make the image larger (adjust size here)
  .attr("height", 60) // Same as width, adjust size
  .attr("clip-path", "circle(30px)");  // Optional: clip the image into a circle, matching the new image size

// Add names
  nodes.append("text")
  .attr("x", -35)
  .attr("y", 45)
  .attr("text-anchor", "start") // Align the text to the left of its starting point
  .style("font-size", "12px")  // Adjust font size
  .style("font-weight", "bold") // Make text bold (optional)
  .style("font-family", "Copperplate, Papyrus, fantasy")
  .text(d => d.name);

});
