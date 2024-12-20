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
      name: "Jin Zixuan",
      image: "../../Assets/Character/Jin/Chacter Page Pics/jzxuan-icon.png", 
      relationships: [ // Bad-darkgrey, family-blue, friends-green, romance-red
        {
          name: "Jin Zixun",
          relationship: "Cousin - Compared to him, Jin Zixuan is better in multiple aspects",
          image: "../../Assets/Character/Jin/Chacter Page Pics/jzxun-icon.png", 
          color: "blue",
          url: "../../Pages/Jin/jzxun.html"
        },
        
        {
          name: "Jin Guangyao",
          relationship: "Half Brother - He is among the many illegitimate children of Jin Guangshan.",
          image: "../../Assets/Character/Jin/Chacter Page Pics/jgy-icon.png", 
          color: "blue",
          url: "../../Pages/Jin/jgy.html"
        },

        {
          name: "Jin Guangshan",
          relationship: "Father - He is very different from his father. Jin Zixuan is one of the Jins who participated early in battle.",
          image: "../../Assets/Character/Jin/Chacter Page Pics/jgs-icon.png", 
          color: "blue",
          url: "../../Pages/Jin/jgs.html"
        },

        {
          name: "Jiang Yanli",
          relationship: "Wife - Jiang Yanli used to be his betrothed but it got broken when Wei Wuxian beat him when he insulted her. During the Sunshot Campaign and a bit after, they became closer and eventually married.",
          image: "../../Assets/Character/Jin/Chacter Page Pics/jyl-icon.png", 
          color: "red",
          url: "../../Pages/Jin/jyl.html"
        },

        {
          name: "Jin Rulan",
          relationship: "Son - He was his son who he never got to see grow up. Jin Zixuan unfortunately died during Jin Rulan's first 100 day celebration  when Wen Ning accidentally killed him as a deemed threat when he appeared in Qiongqi and approached Wei Wuxian while Jin Zixun and his men were trying to kill Wei Wuxian.",
          image: "../../Assets/Character/Jin/Chacter Page Pics/jrl-icon.png", 
          color: "blue",
          url: "../../Pages/Jin/jrl.html"
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
