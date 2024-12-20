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
    name: "Lan Qiren",
    image: "../../Assets/Character/Lan/Character Page Pics/lqr-icon.png", 
    relationships: [ // Bad-darkgrey, family-blue, friends-green, romance-red

      {
        name: "Wei Wuxian",
        relationship: "Barely Tolerated Nephew-in-Law - He deeply disapproved of Wei Wuxian and only tolerated him because of Lan Wangji. He even made a rule forbidding anyone from interacting with Wei Wuxian. His opinions against Wei Wuxian have no effect in dissuading Lan Wangji's love for him.",
        image: "../../Assets/Character/Lan/Character Page Pics/wwx-icon.png", 
        color: "darkgrey",
        url: "../../Pages/Lan/wwx.html"
      },

      {
        name: "Lan Wangji",
        relationship: "Nephew - He raised both Lan Wangji and Lan Xichen. His biggest fear was Lan Wangji becoming like his father who did irrational things because he loved their mother dearly. Growing up, Lan Wangji was his favorite because he followed all the rules. He first disobeyed them when Lan Wangji fought against the elders to protect Wei Wuxian.",
        image: "../../Assets/Character/Lan/Character Page Pics/lwj-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/lwj.html"
      },

      {
        name: "Lan Xichen",
        relationship: "Nephew - He raised both Lan Wangji and Lan Xichen. He is very proud of his twin jades. He acted as the Sect Leader before Xichen came of age.",
        image: "../../Assets/Character/Lan/Character Page Pics/lxc-icon.png", 
        color: "blue",
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
