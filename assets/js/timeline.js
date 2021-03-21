// create groups
var numberOfGroups = 5;
var groups = new vis.DataSet();
for (var i = 0; i < numberOfGroups; i++) {
  groups.add({
    id: i,
    content: "Truck&nbsp;" + i,
  });
}

// create items
var numberOfItems = 1000;
var items = new vis.DataSet();

var itemsPerGroup = Math.round(numberOfItems / numberOfGroups);

for (var truck = 0; truck < numberOfGroups; truck++) {
  var date = new Date();
  for (var order = 0; order < itemsPerGroup; order++) {
    date.setHours(date.getHours() + 4 * (Math.random() < 0.2));
    var start = new Date(date);

    date.setHours(date.getHours() + 2 + Math.floor(Math.random() * 4));
    var end = new Date(date);

    items.add({
      id: order + itemsPerGroup * truck,
      group: truck,
      start: start,
      end: end,
      content: "Order " + order,
    });
  }
}

// specify options
var options = {
  stack: true,
  horizontalScroll: true,
  zoomKey: "ctrlKey",
  maxHeight: 400,
  start: new Date(),
  end: new Date(1000 * 60 * 60 * 24 + new Date().valueOf()),
  editable: true,
  margin: {
    item: 10, // minimal margin between items
    axis: 5, // minimal margin between items and the axis
  },
  orientation: "top",
};

// create a Timeline
var container = document.getElementById("timeline");
timeline = new vis.Timeline(container, items, groups, options);
