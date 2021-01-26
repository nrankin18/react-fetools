onmessage = function (e) {
  var parsedObject = {
    artcc: new Map(),
    artccHigh: new Map(),
    artccLow: new Map(),
    sid: new Map(),
    star: new Map(),
    geo: new Array(),
    regions: new Array(),
    labels: new Array(),
  };
  var text = e.data.split("\n");
  // Read .sct line by line
  // 0 = Skip
  // 1 = ARTCC
  // 2 = ARTCC HIGH
  // 3 = ARTCC LOW
  // 4 = SID
  // 5 = STAR
  // 6 = GEO
  // 7 = REGIONS
  // 8 = LABELS

  var state = 0;
  var currentSID = "";
  var currentSTAR = "";
  var regionBuffer = null;
  while (text.length !== 0) {
    var line = text.shift();
    line = line.split(";")[0]; // Remove comments
    line = line.trimRight(); // Remove trailing whitespace
    if (!line) continue;
    if (
      line.toUpperCase() === "[INFO]" ||
      line.toUpperCase() === "[VOR]" ||
      line.toUpperCase() === "[NDB]" ||
      line.toUpperCase() === "[AIRPORT]" ||
      line.toUpperCase() === "[RUNWAY]" ||
      line.toUpperCase() === "[FIXES]" ||
      line.toUpperCase() === "[LOW AIRWAY]" ||
      line.toUpperCase() === "[HIGH AIRWAY]"
    ) {
      state = 0;
    }

    if (line.toUpperCase() === "[ARTCC]") {
      postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
      state = 1;
      continue;
    }
    if (line.toUpperCase() === "[ARTCC HIGH]") {
      postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
      state = 2;
      continue;
    }
    if (line.toUpperCase() === "[ARTCC LOW]") {
      postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
      state = 3;
      continue;
    }
    if (line.toUpperCase() === "[SID]") {
      postMessage({ isStatus: 1, status: "SIDs" });
      state = 4;
      continue;
    }
    if (line.toUpperCase() === "[STAR]") {
      postMessage({ isStatus: 1, status: "STARs" });
      state = 5;
      continue;
    }
    if (line.toUpperCase() === "[GEO]") {
      postMessage({ isStatus: 1, status: "Geography" });
      state = 6;
      continue;
    }
    if (line.toUpperCase() === "[REGIONS]") {
      postMessage({ isStatus: 1, status: "Regions" });
      state = 7;
      continue;
    }
    if (line.toUpperCase() === "[LABELS]") {
      postMessage({ isStatus: 1, status: "Labels" });
      state = 8;
      continue;
    }
    switch (state) {
      case 0:
        continue;
      case 1:
        line = line.split(/\s+/);
        if (parsedObject.artcc.has(line[0])) {
          parsedObject.artcc.set(
            line[0],
            parsedObject.artcc.get(line[0]).concat([
              {
                lat1: line[1],
                long1: line[2],
                lat2: line[3],
                long2: line[4],
                color: line[5] ?? "",
              },
            ])
          );
        } else {
          parsedObject.artcc.set(line[0], [
            {
              lat1: line[1],
              long1: line[2],
              lat2: line[3],
              long2: line[4],
              color: line[5] ?? "",
            },
          ]);
        }
        break;
      case 2:
        line = line.split(/\s+/);
        if (parsedObject.artccHigh.has(line[0])) {
          parsedObject.artccHigh.set(
            line[0],
            parsedObject.artccHigh.get(line[0]).concat([
              {
                lat1: line[1],
                long1: line[2],
                lat2: line[3],
                long2: line[4],
                color: line[5] ?? "",
              },
            ])
          );
        } else {
          parsedObject.artccHigh.set(line[0], [
            {
              lat1: line[1],
              long1: line[2],
              lat2: line[3],
              long2: line[4],
              color: line[5] ?? "",
            },
          ]);
        }
        break;
      case 3:
        line = line.split(/\s+/);
        if (parsedObject.artccLow.has(line[0])) {
          parsedObject.artccLow.set(
            line[0],
            parsedObject.artccLow.get(line[0]).concat([
              {
                lat1: line[1],
                long1: line[2],
                lat2: line[3],
                long2: line[4],
                color: line[5] ?? "",
              },
            ])
          );
        } else {
          parsedObject.artccLow.set(line[0], [
            {
              lat1: line[1],
              long1: line[2],
              lat2: line[3],
              long2: line[4],
              color: line[5] ?? "",
            },
          ]);
        }
        break;
      case 4:
        if (!/^\s/.test(line)) {
          currentSID = line.substring(0, 26).trimRight();
          postMessage({ isStatus: 1, status: currentSID });
          parsedObject.sid.set(currentSID, []);
        } else {
          line = line.split(/\s+/);
          parsedObject.sid.set(
            currentSID,
            parsedObject.sid.get(currentSID).concat([
              {
                lat1: line[0],
                long1: line[1],
                lat2: line[2],
                long2: line[3],
                color: line[4] ?? "",
              },
            ])
          );
        }
        break;
      case 5:
        if (!/^\s/.test(line)) {
          currentSTAR = line.substring(0, 26).trimRight();
          postMessage({ isStatus: 1, status: currentSTAR });
          parsedObject.star.set(currentSTAR, []);
        } else {
          line = line.split(/\s+/);
          parsedObject.star.set(
            currentSTAR,
            parsedObject.star.get(currentSTAR).concat([
              {
                lat1: line[0],
                long1: line[1],
                lat2: line[2],
                long2: line[3],
                color: line[4] ?? "",
              },
            ])
          );
        }
        break;
      case 6:
        if (
          !/[NS]\d+.\d+.\d+.\d+\s[EW]\d+.\d+.\d+.\d+\s[NS]\d+.\d+.\d+.\d+\s[EW]\d+.\d+.\d+.\d+\s\w*/.test(
            line
          )
        )
          break;
        line = line.split(/\s+/);
        parsedObject.geo.push({
          lat1: line[0],
          long1: line[1],
          lat2: line[2],
          long2: line[3],
          color: line[4] ?? "",
        });
        break;
      case 7:
        if (!/^\s+/.test(line)) {
          if (regionBuffer !== null) {
            parsedObject.regions.push(regionBuffer);
            regionBuffer = null;
          }
          line = line.split(/\s+/);
          regionBuffer = {
            color: line[0],
            coordinates: [{ lat: line[1], long: line[2].padEnd(25, ".") }],
          };
        } else {
          line = line.trim().split(/\s+/);
          regionBuffer.coordinates = regionBuffer.coordinates.concat([
            { lat: line[0], long: line[1] },
          ]);
        }

        break;
      case 8:
        line = line.match(/(?:[^\s"]+|"[^"]*")+/g); //Split line on spaces not inside quotes
        parsedObject.labels.push({
          lat: line[1],
          long: line[2],
          label: line[0].replace(/"/g, ""),
          color: line[3] ?? "",
        });
        break;
      default:
        continue;
    }
  }
  if (regionBuffer !== null) {
    parsedObject.regions.push(regionBuffer);
    regionBuffer = null;
  }
  postMessage({ isStatus: 0, parsedObject: parsedObject });
};
