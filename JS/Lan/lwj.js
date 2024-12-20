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
    name: "Lan Wangji",
    image: "../../Assets/Character/Lan/Character Page Pics/lwj-icon.png", 
    relationships: [ // Bad-darkgrey, family-blue, friends-green, romance-red
      {
        name: "Lan Qiren",
        relationship: "Uncle - Lan Qiren raised him and his brother. In their childhood, they get to visit their mother once a month. Lan Qiren tried his best to instill the Lan Sect teachings to them so they don't follow the steps of their father.",
        image: "../../Assets/Character/Lan/Character Page Pics/lqr-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/lqr.html"
      },

      {
        name: "Lan Xichen",
        relationship: "Older Brother - He cares for his brother deeply. His brother can read his stone-face qutie well and is concerned for him. He got angry for Wangji because he thought Wei Wuxian was leading him on. After the events of the temple, he was worried for his brother. Wei Wuxian comforted him by telling him to tell Lan Xichen that Jin Guangyao spared Sisi because she helped him and his mother, in hopes of telling Lan Xichen that there is good in his dear sworn brother.",
        image: "../../Assets/Character/Lan/Character Page Pics/lxc-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/lxc.html"
      },

      {
        name: "Lan Sizhui",
        relationship: "Ward - He is formerly Wen Yuan, who mistook him for his father when he and Wei Wuxian were shopping in Yiling. Lan Wangji played with him and bought him toys. After the siege, Lan Wangji went there injured, and found A-Yuan sick. He took him into the clan as member of main family. He gave him the courtesy name Sizhui, meaning, 'to reminisce, or, to long for'. Wei Wuxian commented after his resurrection that Sizhui was raised well.",
        image: "../../Assets/Character/Lan/Character Page Pics/lsz-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/lsz.html"
      },

      {
        name: "Wei Wuxian",
        relationship: "Husband/Cultivation Partner - He was captivated by this man the first time they met in Cloud Recesses. Wei Wuxian despite being a notorious rule breaker was brilliant and was righteous. Lan Wangji's upbringing made him torn between Wei Wuxian and his clan. His regret is that he did not stand up against the cultivation world with Wei Wuxian during their youth. When Wei Wuxian died, he tried to live by him, helping people as much as he can. When Wei Wuxian was resurrected unexpectedly, this time, he stood by his side all the way through, never losing sight of him, always looking.",
        image: "../../Assets/Character/Lan/Character Page Pics/wwx-icon.png", 
        color: "red",
        url: "../../Pages/Lan/wwx.html"
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
