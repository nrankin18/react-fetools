onmessage = function (e) {
  var kml = `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">\n<Folder>\n<name>Sector</name>\n`;
  if (e.data.artcc) {
    postMessage({ isStatus: 1, status: "Converting ARTCC Boundaries" });
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
    postMessage({ isStatus: 1, status: "Converting ARTCC Boundaries" });
    kml += `<Folder>\n<name>ARTCC HIGH</name>\n`;
    e.data.data.artccHigh.forEach((coordArray, sector) => {
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
  if (e.data.artccLow) {
    postMessage({ isStatus: 1, status: "Converting ARTCC Boundaries" });
    kml += `<Folder>\n<name>ARTCC LOW</name>\n`;
    e.data.data.artccLow.forEach((coordArray, sector) => {
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
  if (e.data.sids.length !== 0) {
    postMessage({ isStatus: 1, status: "Converting SIDs" });
    kml += `<Folder>\n<name>SID</name>\n`;
    e.data.sids.forEach((sid) => {
      kml += `<Folder>\n<name>` + sid + `</name>\n`;
      const coords = e.data.data.sid.get(sid);
      var i = 0;
      while (i < coords.length) {
        var currCoord = coords[i];
        kml +=
          `<Placemark>\n<name>` +
          currCoord.color +
          `</name>\n<LineString>\n<coordinates>\n`;
        var currCoordDD = dmsToDD(currCoord.lat1, currCoord.long1);
        var coordStr = currCoordDD.long + "," + currCoordDD.lat + ",0 ";
        currCoordDD = dmsToDD(currCoord.lat2, currCoord.long2);
        coordStr += currCoordDD.long + "," + currCoordDD.lat + ",0 ";

        var j = i + 1;

        while (j < coords.length) {
          const nextCoord = coords[j];
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
  if (e.data.stars.length !== 0) {
    postMessage({ isStatus: 1, status: "Converting STARs" });
    kml += `<Folder>\n<name>STAR</name>\n`;
    e.data.stars.forEach((star) => {
      kml += `<Folder>\n<name>` + star + `</name>\n`;
      const coords = e.data.data.star.get(star);
      var i = 0;
      while (i < coords.length) {
        var currCoord = coords[i];
        kml +=
          `<Placemark>\n<name>` +
          currCoord.color +
          `</name>\n<LineString>\n<coordinates>\n`;
        var currCoordDD = dmsToDD(currCoord.lat1, currCoord.long1);
        var coordStr = currCoordDD.long + "," + currCoordDD.lat + ",0 ";
        currCoordDD = dmsToDD(currCoord.lat2, currCoord.long2);
        coordStr += currCoordDD.long + "," + currCoordDD.lat + ",0 ";

        var j = i + 1;

        while (j < coords.length) {
          const nextCoord = coords[j];
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
  if (e.data.geo) {
    postMessage({ isStatus: 1, status: "Converting Geography" });
    kml += `<Folder>\n<name>GEO</name>\n`;
    var i = 0;
    while (i < e.data.data.geo.length) {
      var currCoord = e.data.data.geo[i];
      kml +=
        `<Placemark>\n<name>` +
        currCoord.color +
        `</name>\n<LineString>\n<coordinates>\n`;
      var currCoordDD = dmsToDD(currCoord.lat1, currCoord.long1);
      var coordStr = currCoordDD.long + "," + currCoordDD.lat + ",0 ";
      currCoordDD = dmsToDD(currCoord.lat2, currCoord.long2);
      coordStr += currCoordDD.long + "," + currCoordDD.lat + ",0 ";

      var j = i + 1;

      while (j < e.data.data.geo.length) {
        const nextCoord = e.data.data.geo[j];
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
  }
  if (e.data.regions) {
    postMessage({ isStatus: 1, status: "Converting Regions" });
    kml += `<Folder>\n<name>REGIONS</name>\n`;
    e.data.data.regions.forEach((region) => {
      var coordStr = "";
      region.coordinates.forEach((coord) => {
        const coordDD = dmsToDD(coord.lat, coord.long);
        coordStr += coordDD.long + "," + coordDD.lat + ",0 ";
      });
      kml +=
        `<Placemark>\n<name>` +
        region.color +
        `</name>\n<Polygon>\n<outerBoundaryIs>\n<LinearRing>\n<coordinates>` +
        coordStr +
        `\n</coordinates>\n</LinearRing>\n</outerBoundaryIs>\n</Polygon>\n</Placemark>`;
    });

    kml += `</Folder>\n`;
  }
  if (e.data.labels) {
    postMessage({ isStatus: 1, status: "Converting Labels" });
    kml += `<Folder>\n<name>LABELS</name>\n`;
    e.data.data.labels.forEach((label) => {
      const coord = dmsToDD(label.lat, label.long);
      kml +=
        `<Placemark>\n<name>` +
        label.label +
        `</name>\n<description>` +
        label.color +
        `</description>\n<Point>\n<coordinates>` +
        coord.long +
        "," +
        coord.lat +
        ",0" +
        `</coordinates>\n</Point>\n</Placemark>`;
    });
    kml += `</Folder>\n`;
  }
  kml += `</Folder>\n</kml>`;
  postMessage({ isStatus: 0, kml: kml });
};

function dmsToDD(lat, long) {
  lat = lat.split(".");
  var latDD =
    parseInt(lat[0].substring(1)) +
    parseInt(lat[1]) / 60.0 +
    parseFloat(lat[2] + "." + lat[3]) / 3600.0;

  if (lat[0].charAt(0) == "S") latDD *= -1;

  long = long.split(".");
  var longDD =
    parseInt(long[0].substring(1)) +
    parseInt(long[1]) / 60.0 +
    parseFloat(long[2] + "." + long[3]) / 3600.0;

  if (long[0].charAt(0) == "W") longDD *= -1;

  return { lat: latDD, long: longDD };
}
