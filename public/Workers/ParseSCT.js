onmessage = function (e) {
  var parsedObject = {
    artcc: new Map(),
    artccHigh: new Map(),
    artccLow: new Map(),
    sid: new Map(),
    star: new Map(),
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
  while (text.length !== 0) {
    var line = text.shift();
    line = line.split(";")[0]; // Remove comments
    line = line.trimRight(); // Remove trailing whitespace
    if (!line) continue;
    if (
      line === "[INFO]" ||
      line === "[VOR]" ||
      line === "[NDB]" ||
      line === "[AIRPORT]" ||
      line === "[RUNWAY]" ||
      line === "[FIXES]" ||
      line === "[LOW AIRWAY]" ||
      line === "[HIGH AIRWAY]"
    )
      state = 0;
    if (line === "[ARTCC]") {
      postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
      state = 1;
      continue;
    }
    if (line === "[ARTCC HIGH]") {
      postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
      state = 2;
      continue;
    }
    if (line === "[ARTCC LOW]") {
      postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
      state = 3;
      continue;
    }
    if (line === "[SID]") {
      postMessage({ isStatus: 1, status: "SIDs" });
      state = 4;
      continue;
    }
    if (line === "[STAR]") {
      postMessage({ isStatus: 1, status: "STARs" });
      state = 5;
      continue;
    }
    if (line === "[GEO]") {
      postMessage({ isStatus: 1, status: "Geography" });
      state = 6;
      continue;
    }
    if (line === "[REGIONS]") {
      postMessage({ isStatus: 1, status: "Regions" });
      state = 7;
      continue;
    }
    if (line === "[LABELS]") {
      postMessage({ isStatus: 1, status: "Labels" });
      state = 8;
      continue;
    }
    switch (state) {
      case 0:
        continue;
      case 1:
        line = line.split(" ");
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
        line = line.split(" ");
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
        line = line.split(" ");
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
          parsedObject.sid.set(currentSID, []);
        } else {
          line = line.split(" ");
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
          parsedObject.star.set(currentSTAR, []);
        } else {
          line = line.split(" ");
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
      default:
        continue;
    }
  }
  postMessage({ isStatus: 0, parsedObject: parsedObject });
};
