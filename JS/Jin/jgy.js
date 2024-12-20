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
      name: "Jin Guangyao",
      image: "../../Assets/Character/Jin/Chacter Page Pics/jgy-icon.png", 
      relationships: [ // Bad-darkgrey, family-blue, friends-green, romance-red
        {
          name: "Jin Zixuan",
          relationship: "Half-brother - He got Jin Zixuan killed in the Qiongqi path then framed Wei Wuxian.",
          image: "../../Assets/Character/Jin/Chacter Page Pics/jzxuan-icon.png", 
          color: "darkgrey",
          url: "../../Pages/Jin/jzxuan.html"
        },
        
        {
          name: "Nie Mingjue",
          relationship: "Sworn Brother - Xichen urged the three of them to form a sworn brotherhood, together they are called the Venerated Triad. Nie Mingjue distrusts him and despises his underhanded ways. He killed Nie Mingjue later on.",
          image: "../../Assets/Character/Nie/Character Page Pics/nmj-icon.png", 
          color: "darkgrey",
          url: "../../Pages/Nie/nmj.html"
        },

        {
          name: "Nie Huaisang",
          relationship: "Brother of Sworn Brother -  He often encouraged Nie Huaisang to pursue the arts before he murdered Nie Mingjue. Nie Huaisang acted incompetently for a long time, but in reality he was plotting his revenge. He complimented Nie Huaisang for being the best actor after he realized too late that Nie Huaisang orchestrated his downfall.",
          image: "../../Assets/Character/Nie/Character Page Pics/nhs-icon.png", 
          color: "darkgrey",
          url: "../../Pages/Nie/nhs.html"
        },

        {
          name: "Jin Guangshan",
          relationship: "Useless Father  - Both of them are greedy for power. Jin Guangshan often used him after Sunshot Campaign to plot to get Wei Wuxian's Stygian Tiger Seal. He eventually snapped and killed Jin Guangshan.",
          image: "../../Assets/Character/Jin/Chacter Page Pics/jgs-icon.png", 
          color: "darkgrey",
          url: "../../Pages/Jin/jgs.html"
        },

        {
          name: "Lan Xichen",
          relationship: "Lan Xichen - Jin Guangyao admitted that he had done countless depravities, killed his son, his wife, killed his father, and a lot of people, but he never once thought of harming Lan Xichen. Tragically, Nie Huaisang tricked Lan Xichen into killing Jin Guangyao. Jin Guangyao, killed by Lan Xichen, his most important person.",
          image: "../../Assets/Character/Lan/Character Page Pics/lxc-icon.png", 
          color: "darkgrey",
          url: "../../Pages/Lan/lxc.html"
        },
   
        {
          name: "Xue Chengmei",
          relationship: "Transactional - Both of them used each other for their own agendas, Xue Yang for his revenge, Jin Guangyao for Xue Yang's knowledge in demonic cultivation. Jin Guangyao eventually betrayed him but he managed to reach Yi City gravely injured.",
          image: "../../Assets/Character/Minor/Character Page Pics/xy-icon.png", 
          color: "darkgrey",
          url: "../../Pages/Minor/xcm.html"
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
