onmessage = function (e) {
  if (e.data.artcc) {
    postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
  }
  if (e.data.artccHigh) {
    postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
  }
  if (e.data.artccLow) {
    postMessage({ isStatus: 1, status: "ARTCC Boundaries" });
  }
  if (e.data.sids.length !== 0) {
    postMessage({ isStatus: 1, status: "SIDs" });
  }
  if (e.data.stars.length !== 0) {
    postMessage({ isStatus: 1, status: "STARs" });
  }
  if (e.data.geo) {
    postMessage({ isStatus: 1, status: "Geography" });
  }
  if (e.data.regions) {
    postMessage({ isStatus: 1, status: "Regions" });
  }
  if (e.data.labels) {
    postMessage({ isStatus: 1, status: "Labels" });
  }
  postMessage({ isStatus: 0 });
};
