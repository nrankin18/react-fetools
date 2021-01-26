onmessage = function (e) {
  var kml = `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">\n<Folder>\n<name>Sector</name>\n`;
  if (e.data.artcc) {
    postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
    kml += `<Folder>\n<name>ARTCC</name>\n`;
    e.data.data.artcc.forEach((coordArray, sector) => {
      kml += `<Folder>\n<name>` + sector + `</name>\n`;
      var i = 0;
      while (i < coordArray.length) {
        var currCoord = coordArray[i];
        kml +=
          `<Placemark>\n<name>` +
          currCoord.color +
          `</name>\n<LineString>\n<coordinates>\n`;
        var currCoordDD = dmsToDD(currCoord.lat1, currCoord.long1);
        var coordStr = currCoordDD.long + "," + currCoordDD.lat + ",0 ";
        currCoordDD = dmsToDD(currCoord.lat2, currCoord.long2);
        coordStr += currCoordDD.long + "," + currCoordDD.lat + ",0 ";

        var j = i + 1;

        while (j < coordArray.length) {
          const nextCoord = coordArray[j];
          if (nextCoord.color != currCoord.color) break;
          if (
            nextCoord.lat1 != currCoord.lat2 ||
            nextCoord.long1 != currCoord.long2
          )
            break;

          currCoordDD = dmsToDD(nextCoord.lat2, nextCoord.long2);
          coordStr += currCoordDD.long + "," + currCoordDD.lat + ",0 ";
          currCoord = nextCoord;
          j++;
        }
        i = j;

        kml += coordStr + "\n";
        kml += `</coordinates>\n</LineString>\n</Placemark>`;
      }
      kml += `</Folder>\n`;
    });
    kml += `</Folder>\n`;
  }
  if (e.data.artccHigh) {
    postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
    kml += `<Folder>\n<name>ARTCC HIGH</name>\n`;
    kml += `</Folder>\n`;
  }
  if (e.data.artccLow) {
    postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
    kml += `<Folder>\n<name>ARTCC LOW</name>\n`;
    kml += `</Folder>\n`;
  }
  if (e.data.sids.length !== 0) {
    postMessage({ isStatus: 1, status: "SIDs" });
    kml += `<Folder>\n<name>SID</name>\n`;
    kml += `</Folder>\n`;
  }
  if (e.data.stars.length !== 0) {
    postMessage({ isStatus: 1, status: "STARs" });
    kml += `<Folder>\n<name>STAR</name>\n`;
    kml += `</Folder>\n`;
  }
  if (e.data.geo) {
    postMessage({ isStatus: 1, status: "Geography" });
    kml += `<Folder>\n<name>GEO</name>\n`;
    kml += `</Folder>\n`;
  }
  if (e.data.regions) {
    postMessage({ isStatus: 1, status: "Regions" });
    kml += `<Folder>\n<name>REGIONS</name>\n`;
    kml += `</Folder>\n`;
  }
  if (e.data.labels) {
    postMessage({ isStatus: 1, status: "Labels" });
    kml += `<Folder>\n<name>LABELS</name>\n`;
    kml += `</Folder>\n`;
  }
  kml += `</Folder>\n</kml>`;
  postMessage({ isStatus: 0, kml: kml });
};

function dmsToDD(lat, long) {
  var latDD =
    parseInt(lat.substring(1, 4)) +
    parseInt(lat.substring(5, 7)) / 60.0 +
    parseFloat(lat.substring(8, 14)) / 3600.0;
  if (lat.charAt(0) == "S") latDD *= -1;

  var longDD =
    parseInt(long.substring(1, 4)) +
    parseInt(long.substring(5, 7)) / 60.0 +
    parseFloat(long.substring(8, 14)) / 3600.0;
  if (long.charAt(0) == "W") longDD *= -1;

  return { lat: latDD, long: longDD };
}
