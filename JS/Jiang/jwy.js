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
    name: "Jiang Wanyin",
    image: "../../Assets/Character/Jiang/Character Page Pics/jwy-icon.png", 
    relationships: [ // Bad-darkgrey, family-blue, friends-green, romance-red
      {
        name: "Jiang Yanli",
        relationship: "Sister - She cherished her dearly. Both him and Wei Wuxian are protective of her. He is one of the people who took care of her child upon her death.",
        image: "../../Assets/Character/Jin/Chacter Page Pics/jyl-icon.png", 
        color: "blue",
        url: "../../Pages/Jin/jyl.html"
      },

      {
        name: "Jin Rulan",
        relationship: "Nephew - He is strict and protective of Jin Rulan. He has high expectations of him as well.",
        image: "../../Assets/Character/Jin/Chacter Page Pics/jrl-icon.png", 
        color: "blue",
        url: "../../Pages/Jin/jrl.html"
      },

      {
        name: "Jin Zixuan",
        relationship: "Brother-in-law - In their youth, he and Wei Wuxian disliked Jin Zixuan for Jiang Yanli. Eventually Jiang Yanli and Jin Zixuan fell in love and got married.",
        image: "../../Assets/Character/Jin/Chacter Page Pics/jzxuan-icon.png", 
        color: "blue",
        url: "../../Pages/Jin/jzxuan.html"
      },
      
      {
        name: "Yu Ziyuan",
        relationship: "Mother - His mother loves him and is strict with him. She often pits him against Wei Wuxian. ",
        image: "../../Assets/Character/Jiang/Character Page Pics/yzy-icon.png", 
        color: "blue",
        url: "../../Pages/Jiang/yzy.html"
      },

      {
        name: "Jiang Fengmian",
        relationship: "Father - He thinks that Jiang Fengmian loves Wei Wuxian more than him, partly because of Yu Ziyuan stating things of similar nature  and Jiang Fengmian being indifferent. His last words however, were for Wei Wuxian to look after Jiang Wanyin.",
        image: "../../Assets/Character/Jiang/Character Page Pics/jfm-icon.png", 
        color: "blue",
        url: "../../Pages/Jiang/jfm.html"
      },

      {
        name: "Wei Wuxian",
        relationship: "Former Older Martial Brother - Wei Wuxian was essentially raised to be his subordinate. In their youth, he had some semblance of affection for Wei Wuxian but the events that came after totally poisoned the well for them. He led the siege against Wei Wuxian after their beloved sister Jiang Yanli sacrificed herself to save Wei Wuxian.",
        image: "../../Assets/Character/Lan/Character Page Pics/wwx-icon.png", 
        color: "darkgrey",
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
