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
    name: "Xue Chengmei",
    image: "../../Assets/Character/Minor/Character Page Pics/xy-icon.png", 
    relationships: [ // Bad-darkgrey, family-blue, friends-green, romance-red
      {
        name: "Jin Guangyao",
        relationship: "Transactional - Both of them used each other for their own agendas, Xue Yang for his revenge, Jin Guangyao for Xue Yang's knowledge in demonic cultivation. Jin Guangyao eventually betrayed him but he managed to reach Yi City gravely injured.",
        image: "../../Assets/Character/Jin/Chacter Page Pics/jgy-icon.png", 
        color: "darkgrey",
        url: "../../Pages/Jin/jgy.html"
      },
      
      {
        name: "Song Zichen",
        relationship: "Loathing - Song Zichen and Xiao Xingchen captured him when he massacred the Chang Clan. Because the Jins wanted to use him, he was pardoned. He took revenge by massacring Song Zichen's sect and blinding him. He killed Song Zichen by tricking Xiao Xingchen into thinking he was a fierce corpse. ",
        image: "../../Assets/Character/Minor/Character Page Pics/szc-icon.png", 
        color: "darkgrey",
        url: "../../Pages/Minor/szc.html"
      },

      {
        name: "Xiao Xingchen",
        relationship: "Destroyed by Xue Yang - After Xue Yang took revenge on Song Zichen, Xiao Xingchen gave his eyes and travelled alone blind and guiltridden. He came upon Yi City and unknowingly helped Xue Yang. They lived domestically with A-Qing for two years. Unbeknownst to him, Xue Yang took advantage of his blindness and made him kill common people. The final straw was when Xue Yang tricked him into killing Song Zichen. In tears of blood Xiao Xingchen slit his throat. Xue Yang tried to revive him, but his soul has no will to live that he always failed. Xue Yang is obsessed with trying to revive him.",
        image: "../../Assets/Character//Minor/Character Page Pics/xxc-icon.png", 
        color: "darkgrey",
        url: "../../Pages/Minor/xxc.html"
      },

      {
        name: "Wei Wuxian",
        relationship: "Amazed by His Work - Xue Yang tried very hard to understand and replicate Wei Wuxian's cultivation but he never managed to surpass him. Wei Wuxian, after all, is the founder. Xue Yang sought him out in hopes of making him revive Xiao Xingchen.",
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
