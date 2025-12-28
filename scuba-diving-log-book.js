// https://github.com/evoluteur/scuba-diving-log-book
// (c) 2025 Olivier Giulieri

const fTime = (t) => {
  const hours = Math.floor(t / 60);
  const minutes = t % 60;
  const time = [];
  if (hours > 0) {
    time.push(`${hours}h`);
  }
  if (minutes > 0) {
    time.push(`${minutes}min`);
  }
  return time.join(" ");
};

const summary = () => {
  const count = dives.length;
  let time = 0;
  let maxDepth = 0;
  let sumDepth = 0;
  const areas = {};
  dives.forEach((d) => {
    time += d.duration;
    sumDepth += d.depth;
    if (d.depth > maxDepth) {
      maxDepth = d.depth;
    }
    const place = d.state || d.country || "Unknown";
    areas[place] = (areas[place] || 0) + 1;
  });
  const geo = Object.entries(areas).sort((a, b) => b[1] - a[1]);
  const avgDepth = Math.round(sumDepth / count);
  return `<div class="summary">
    ${count} dives = ${fTime(time)}
    <div class="silver">
      ${geo.map((g) => `<span>${g[0]}: ${g[1]}</span>`).join(", ")}
    </div>
    <div class="blue">
      Max depth: ${maxDepth} meters<br>
      Avg depth: ${avgDepth} meters
    </div>
  </div>`;
};

const address = (d) => {
  const p = [];
  if (d.city && d.city !== d.site) {
    p.push(d.city);
  }
  if (d.state) {
    p.push(d.state);
  }
  if (d.country) {
    p.push(d.country);
  }
  return " - " + p.join(", ");
};

const icon = (svg, title) => `<img src="icons/${svg}.svg" title="${title}">`;

const diveIcon = (d) => {
  if (d.night) {
    return icon("weather-night", "Night dive");
  }
  if (d.wreck) {
    return icon("sail-boat-sink", "Wreck dive");
  }
  if (d.depth >= 18) {
    return icon("waves", "Deep dive");
  }
  return icon("wave", "Shallow dive");
};

const dive = (d) => `<div class="dive">
    ${diveIcon(d)}
    <div>
      <div class="site">${d.site} <span>${address(d)}</span></div>
      <div class="details">${d.date}: ${d.depth} meters -
       ${fTime(d.duration)}
       ${d.temperature ? `<span class="blue">${d.temperature}°C</span>` : ""}
       ${
         d.nitrox > 21
           ? `<img class="nitrox" src="icons/diving-scuba-tank.svg" title="Nitrox ${d.nitrox}%">`
           : ""
       }
       </div>
       <div class="notes">${d.notes || ""}</div>
    </div>
  </div>`;

const diveYear = (g) => {
  const yearHeader = `<div class="header2"><h2>${g.year}: ${g.dives.length} ${
    g.dives.length > 1 ? "dives" : "dive"
  } = ${fTime(g.duration)}</h2></div>`;
  const divesHtml =
    '<div class="dives">' + g.dives.map(dive).join("") + "</div>";
  return "<section>" + yearHeader + divesHtml + "</section>";
};

const groupByYear = () => {
  const groups = {};
  dives.forEach((d) => {
    const year = new Date(d.date).getFullYear();
    if (!groups[year]) {
      groups[year] = {
        year,
        duration: 0,
        dives: [],
      };
    }
    groups[year].dives.push(d);
    groups[year].duration += d.duration;
  });
  return Object.values(groups);
};

const setup = () => {
  const groups = groupByYear();
  const hGroups = groups.map(diveYear).join("");

  document.getElementById("log").innerHTML = summary() + hGroups;
};
