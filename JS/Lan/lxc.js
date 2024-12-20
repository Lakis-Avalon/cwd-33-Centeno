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
    name: "Lan Xichen",
    image: "../../Assets/Character/Lan/Character Page Pics/lxc-icon.png", 
    relationships: [ // Bad-darkgrey, family-blue, friends-green, romance-red
      {
        name: "Nie Mingjue",
        relationship: "Sworn Brother - They both knew each other as sect leaders long before Meng Yao. He calls him Da-ge, he urged him and Meng Yao to become sworn brothers and together they became the Venerated Triad. He was so worried about his unstable qi that he gave him a clan secret that may help. He knew the identity of the dismembered fierce corpse of Nie Mingjue by just seeing his body even without the head attached.",
        image: "../../Assets/Character/Nie/Character Page Pics/nmj-icon.png", 
        color: "green",
        url: "../../Pages/nie/nmj.html"
      },

      {
        name: "Lan Qiren",
        relationship: "Uncle - Lan Qiren raised him and his brother. In their childhood, they get to visit their mother once a month. Lan Qiren tried his best to instill the Lan Sect teachings to them so they don't follow the steps of their father.",
        image: "../../Assets/Character/Lan/Character Page Pics/lqr-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/lqr.html"
      },

      {
        name: "Lan Wangji",
        relationship: "Younger Brother - He cares for his brother deeply and is able to get a grasp of his reaction even if he is a stoneface. He was concerned about Lan Wangji's affections for Wei Wuxian.",
        image: "../../Assets/Character/Lan/Character Page Pics/lwj-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/lwj.html"
      },

      {
        name: "Wei Wuxian",
        relationship: "Brother-in-Law - In their teenage years, he encouraged his brother's friendship but from Sunshot onwards, he discouraged it because he believed Wei Wuxian has changed due to his cultivation. Upon his resurrection, Lan Xichen already had suspicions of his identity, because Lan Wangji treated him so affectionately. He thought Wei Wuxian was leading Lan Wangji on, which made him angry at Wei Wuxian, but he was just dense and once Wei Wuxian knew of his affections, Wei Wuxian quickly confessed to Lan Wangji.",
        image: "../../Assets/Character/Lan/Character Page Pics/wwx-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/wwx.html"
      },

      {
        name: "Jin Guangyao",
        relationship: "Sworn Brother - Meng Yao helped him while he was on the run from the Wens and eventually helped him spy from the Wens during Sunshot. He was naive to Jin Guangyao's wicked schemes and when confronted about it, he often dismisses them. He is partial to Jin Guangyao. The three of them with Nie Mingjue became sworn brothers known as the Venerated Triad. He accidentally killed Jin Guangyao and in his last moments, when he asked Lan Xichen to die with him, Lan Xichen allowed him, but this action made Mend Yao see that Xichen still cared for him, causin him to push Xichen to safety moments before death.",
        image: "../../Assets/Character/Jin/Chacter Page Pics/jgy-icon.png", 
        color: "darkgrey",
        url: "../../Pages/Jin/jgy.html"
      }

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
