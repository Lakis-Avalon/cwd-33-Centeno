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
    name: "Lan Sizhui",
    image: "../../Assets/Character/Lan/Character Page Pics/lsz-icon.png", 
    relationships: [ // Bad-darkgrey, family-blue, friends-green, romance-red
      {
        name: "Lan Jingyi",
        relationship: "Friend - They are both from the Lan Sect and are part of the main family evident in the clouds on their ribbons. They often are seen together.",
        image: "../../Assets/Character/Lan/Character Page Pics/ljy-icon.png", 
        color: "green",
        url: "../../Pages/Lan/ljy.html"
      },

      {
        name: "Jin Rulan",
        relationship: "Friend - They joined together in the case of Yi City and grew quite close, drinking together with them.",
        image: "../../Assets/Character/Jin/Chacter Page Pics/jrl-icon.png", 
        color: "green",
        url: "../../Pages/Jin/jrl.html"
      },

      {
        name: "Ouyang Zizhen",
        relationship: "Friend - They joined together in the case of Yi City and grew quite close, drinking together with them.",
        image: "../../Assets/Character/Minor/Character Page Pics/oyzz-icon.png", 
        color: "green",
        url: "../../Pages/Minor/oyzz.html"
      },

      {
        name: "Wei Wuxian",
        relationship: "Older Brother/Uncle/Father Figure - Wei Wuxian helped in raising A-Yuan in the Burial Mounds. They often played together, Wei Wuxian burying him on the ground with only his head left sticking, calling him his Little Radish. ",
        image: "../../Assets/Character/Lan/Character Page Pics/wwx-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/wwx.html"
      },

      {
        name: "Lan Wangji",
        relationship: "Father Figure - He saved Wen Yuan when the sects sieged the Burial Mounds and murdered Wen Yuan's family. Lan Wangji brought him back and insisted he be taken in. The clan eventually relented and named him Lan Yuan. Lan Wangji then gave him the courtesy name, Sizhui, meaning 'to recollect or long for'. When he was a kid, he mistook Lan Wangji for his dad.",
        image: "../../Assets/Character/Lan/Character Page Pics/lwj-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/lwj.html"
      },

      {
        name: "Wen Qionglin",
        relationship: "Uncle - They are the remaining of the Wen. He lived and took care of Sizhui with the others in the Burial Mounds. Wen Ning eventually learned that A-Yuan survived thanks to Lan Wangji saving him. After these events, they both went to Dafan to visit. They go on night hunts together.",
        image: "../../Assets/Character/Wen/Character Page Pics/wn-icon.png", 
        color: "blue",
        url: "../../Pages/Wen/wql.html"
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
