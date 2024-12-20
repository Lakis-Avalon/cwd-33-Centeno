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
    name: "Xiao Xingchen",
    image: "../../Assets/Character/Minor/Character Page Pics/xxc-icon.png", 
    relationships: [ // Bad-darkgrey, family-blue, friends-green, romance-red
      {
        name: "Song Zichen",
        relationship: "Estranged Friend - He blames himself for the tragedy that befell Baixue Temple and Song Zichen. He ended up living in Yi City for 2 years with Xue Yang before Song Zichen found him. He accidentally killed Song Zichen because his sword registered him as a fierce corpse because Xue Yang put corpse powder on him and cut his tongue. Upon his realization of who he killed, he slit his throat in tears of blood.",
        image: "../../Assets/Character/Minor/Character Page Pics/szc-icon.png", 
        color: "green",
        url: "../../Pages/Minor/szc.html"
      },

      {
        name: "Xue Yang",
        relationship: "Disgusted - Xiao Xingchen saved an unknown man when he was on his way to Yi City. This was Xue Yang and he lived with him for 2 years with a white-eyed girl named A-Qing. They went on nighthunts where Xue Yang set it up so Xiao Xingchen kills civilians. When Xue Yang's identity was revealed and subsequently that Xiao Xingchen has been killing innocents and the most recent one being his dear friend, Song Zichen, Xiao XIngchen was so devastated he slit his throat while in tears of blood. It was so devastating even an expert like Xue Yang cannot revive him even as a fierce corpse.",
        image: "../../Assets/Character//Minor/Character Page Pics/xy-icon.png", 
        color: "darkgrey",
        url: "../../Pages/Minor/xcm.html"
      },

      {
        name: "Wei Wuxian",
        relationship: "Martial Nephew (Shizhi) - They never met each other, but him and Cangse Sanren, Wei Wuxian's mother are both disciples of Baoshan Sanren the Immortal.",
        image: "../../Assets/Character/Lan/Character Page Pics/wwx-icon.png", 
        color: "blue",
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
