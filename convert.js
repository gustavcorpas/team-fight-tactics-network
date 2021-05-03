
const fs = require('fs');

let data = fs.readFileSync('./data.csv', 'utf8').split('\r\n');

let array = [];
let linkarray = [];


for(let [index, row] of data.entries()){
  if(index == 0) continue;
  row = row.split(',');
  let classes = [];
  classes.push(row[1], row[2]);
  if(row[3]) classes.push(row[3]);
  array.push({
    name: row[0],
    cost: row[4],
    classes: classes,
  });
}

 // console.log(array);

for(let champ1 of array){
  for(let champ2 of array){
    for(let _class of champ1.classes){
      if(champ2.classes.includes(_class)) link(champ1, champ2);
    }
  }
}


function link(champ1, champ2){
  if(champ1.name == champ2.name) return;
  linkarray.push({
    source: champ1,
    target: champ2,
  })
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<gexf>
  <graph mode="static" defaultedgetype="undirected">
    <attributes class="node">
      <attribute id="0" title="cost" type="integer" />
    </attributes>
    <nodes>
      ${array.map(e => `
        <node id="${e.name}" label="${e.name}">
          <attvalues>
            <attvalue for="0" value="${e.cost}" />
          </attvalues>
        </node>
        `).join("")}
    </nodes>
    <edges>
      ${linkarray.map((e, i) => `
        <edge id="${i}" source="${e.source.name}" target="${e.target.name}" />
        `).join("")}
    </edges>
   </graph>
 </gexf>
`

fs.writeFileSync('data.gexf', xml);
