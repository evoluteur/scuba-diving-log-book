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

const summary = (count, time) => {
  return `<div class="summary">
    ${count} dives = ${fTime(time)}
  </div>`;
};

const address = (d) => {
  const p = [];
  // if (d.city) {
  //   p.push(d.city);
  // }
  if (d.state) {
    p.push(d.state);
  }
  if (d.country) {
    p.push(d.country);
  }
  return p.join(", ");
};

const diveIcon = (d) => {
  if (d.night) {
    return '<img src="icons/weather-night.svg" title="Night dive">';
  }
  if (d.wreck) {
    return '<img src="icons/sail-boat-sink.svg" title="Wreck dive">';
  }
  if (d.depth >= 18) {
    return '<img src="icons/waves.svg" title="Deep dive">';
  }
  return '<img src="icons/wave.svg" title="Shallow dive">';
};

const dive = (d) => `<div class="dive">
    ${diveIcon(d)}
    <div>
      <div class="site">${d.site} <span>${address(d)}</span></div>
      <div class="details">${d.date}: ${d.depth} meters -
       ${fTime(d.duration)}
       ${
         d.mix
           ? '<img class="nitrox" src="icons/diving-scuba-tank.svg" title="Nitrox">'
           : ""
       }
       </div>
    </div>
  </div>`;

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

const diveYear = (g) => {
  const yearHeader = `<h2>${g.year}: ${g.dives.length} ${
    g.dives.length > 1 ? "dives" : "dive"
  } = ${fTime(g.duration)}</h2>`;
  const divesHtml =
    '<div class="dives">' + g.dives.map((d) => dive(d)).join("") + "</div>";
  return yearHeader + divesHtml;
};

const setup = () => {
  const groups = groupByYear();
  const h = groups.map(diveYear).join("");
  const count = dives.length;
  let time = 0;
  dives.forEach((d) => {
    time += d.duration;
  });

  document.getElementById("log").innerHTML = summary(count, time) + h;
};
