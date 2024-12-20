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
    name: "Wen Qing",
    image: "../../Assets/Character/Wen/Character Page Pics/wq-icon.png", 
    relationships: [ // Bad-darkgrey, family-blue, good-green, romance-red
      {
        name: "Wei Wuxian",
        relationship: "Close Friend, Benefactor to Each Other - She helped save their lives when they were in the run from the Wens and transferred Wei Wuxian's core to Jiang Wanyin. Wei Wuxian saved her family from the Jins.",
        image: "../../Assets/Character/Lan/Character Page Pics/wwx-icon.png", 
        color: "green",
        url: "../../Pages/Lan/wwx.html"
      },
      
      {
        name: "Wen Ruohan",
        relationship: "Uncle - He is her uncle, she is his favorite since she is the daughter of his favorite cousin",
        image: "../../Assets/Character/Wen/Character Page Pics/wrh-icon.png", 
        color: "darkgrey",
        url: "../../Pages/Wen/wrh.html"
      },

      {
        name: "Wen Qionglin",
        relationship: "Brother - He is her precious brother. She helped Wei Wuxian because he befriended Wen Ning",
        image: "../../Assets/Character/Wen/Character Page Pics/wn-icon.png", 
        color: "blue",
        url: "../../Pages/Wen/wql.html"
      },

      {
        name: "Lan Sizhui",
        relationship: "Relative - He is Wen Yuan who lived with the Wen Remnants in the Burial Mounds, they all took care of him. When the Burial mounds was sieged, Lan Wangji saved him and gave him the name Lan Sizhui,meaning, 'to recollect and long for'",
        image: "../../Assets/Character/Lan/Character Page Pics/lsz-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/lsz.html"
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
