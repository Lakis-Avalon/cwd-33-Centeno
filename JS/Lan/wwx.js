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
    name: "Wei Wuxian",
    image: "../../Assets/Character/Lan/Character Page Pics/wwx-icon.png", 
    relationships: [ // Bad-darkgrey, family-blue, friends-green, romance-red
      {
        name: "Wen Qionglin",
        relationship: "Mutual Benefactor, Friend - They first met during the Archery Competition hosted by the Wen where Wei Wuxian noticed Wen Qionglin's excellent archery skills. Wen Ning saves him and Jiang Wanyin when Lotus Pier was sieged. She brings them to her sister who reluctantly helps them. After the war, he ended up in a Jin concentration camp with his family. Wen Qing asked for Wei Wuxian's help to rescue them. They were a bit too late since Wen Ning ended up in a near-death state and ended up being a fierce corpse. Wei Wuxian restored his consciousness as a fierce corpse and he became known as the Ghost General. ",
        image: "../../Assets/Character/Wen/Character Page Pics/wn-icon.png", 
        color: "green",
        url: "../../Pages/Wen/wql.html"
      },
      
      {
        name: "Wen Qing",
        relationship: "Mutual Benefactor, Friend - Wen Qing is Wen Qionglin's sister, She helped the injured Wei Wuxian and Jiang Wanyin after Wen Qionglin brought them to her supervisory office. She also transferred Wei Wuxian's gold core to Jiang Wanyin per his request. After the war, her family was wrongfully put in Jin concentration camps so Wei Wuxian helped her rescue them. They all lived together in the Burial Mounds, but when Wei Wuxian was setup to kill Jin Zixuan, she and Wen Ning sacrificed themselves for Wei Wuxian.",
        image: "../../Assets/Character/Wen/Character Page Pics/wq-icon.png", 
        color: "green",
        url: "../../Pages/Wen/wq.html"
      },


      {
        name: "Lan Xichen",
        relationship: "Brother-in-Law - In their youth, Lan Xichen encouraged his friendship with Lan Wangji. Lan Xichen believed the rumors during Sunshot Campaign and had an unfavorable view of him after his use in the war. When he got resurrected, Lan Xichen got angry at him when he thought Wei Wuxian was leading Lan Wangji on, but once thingss got sorted out, they had a more favorable relationship.",
        image: "../../Assets/Character/Lan/Character Page Pics/lxc-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/lxc.html"
      },

      {
        name: "Lan Sizhui",
        relationship: "Ward - He is formerly Wen Yuan, who he often buried up to his neck in dirt and called Little Radish. When the Burial Mounds was sieged, Wei Wuxian hid Wen Yuan before he died and was later on raised by Lan Wangji. After his resurrection, he praised Sizhui and said that whoever must have raised him was a great person. ",
        image: "../../Assets/Character/Lan/Character Page Pics/lsz-icon.png", 
        color: "blue",
        url: "../../Pages/Lan/lsz.html"
      },

      {
        name: "Lan Wangji",
        relationship: "Husband/Cultivation Partner - During his time in Cloud Recesses, he often tried to get Lan Wangji's attention, often teasing him. Before leaving, he gave him rabbits, which Lan Wangji raised in the backhills unknown to Wei Wuxian. When Wei Wuxian fell in the Burial Mounds, Lan Wangji searched for him for all 3 months before he reappeared as the Yiling Laozu. During Sunshot, Lan Wangji often asked him to come back to Gusu, which he thought was for punishment. After Wei Wuxian died, Lan Wangji found Wen Yuan and raised him and helped the common people. In his resurrection, they are practically inseparable. After the events of Guanyin Temple, they eloped.",
        image: "../../Assets/Character/Lan/Character Page Pics/lwj-icon.png", 
        color: "red",
        url: "../../Pages/Lan/lwj.html"
      },

      {
        name: "Jiang Clan",
        relationship: "Former Sect Member - He grew up with the Jiang Siblings in Lotus Pier after Jiang Fengmian found him in Yiling. The tension in the family is already present before him. There were rumors of him being Jiang Fengmian's bastard, but it was untrue. Wei Wuxian grew up being singled out by Yu Ziyuan and he often got whipped. Wei Wuxian was in an awkward position. Of the Jiangs, only Jiang Yanli claimed Wei Wuxian as family, she called him brother and defended him from Jin Zixun",
        image: "../../Assets/BG/jiang-symbol.webp", 
        color: "darkgrey",
        url: "../../Pages/Jiang/jiang-home.html"
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
                .style("left", `${nodePosition.x + window.scrollX - 60}px`)
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
