LeafletWidget.methods.addGlifyPolylines = function(data, cols, popup, opacity, group, weight, layerId) {

  var map = this;

    var clrs;
    if (cols.length === 1) {
      clrs = cols[0];
    } else {
      clrs = function(index, feature) { return cols[index]; };
    }

    var wght;
    if (weight.length === undefined) {
      wght = weight;
    } else {
      wght = function(index, feature) { return weight[index]; };
    }

    var pop;
    if (popup) {
        if (popup === true) {
          pop = function (e, feature) {
            if (HTMLWidgets.shinyMode) {
              // Convert to Simple Feature and return to Shiny
              Shiny.setInputValue(map.id + "_glify_click"+":sf_coord_lines", {
                geom: feature.geometry.coordinates,
                data: feature.properties
              });
            }
            var popUp = '<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>';
            if (map.hasLayer(lineslayer.glLayer)) {
              L.popup({ maxWidth: 2000 })
                .setLatLng(e.latlng)
                .setContent(popUp)
                .openOn(map);
            }
          };
        } else {
          pop = function (e, feature) {
            if (map.hasLayer(lineslayer.glLayer)) {
              console.log(e);
              //debugger;
              L.popup({ maxWidth: 2000 })
                .setLatLng(e.latlng)
                .setContent(feature.properties[[popup]].toString())
                .openOn(map);
            }
          };
        }
    } else {
        pop = null;
    }

    console.log("data - Lines");console.log(data)
    var lineslayer = L.glify.lines({
      map: map,
      latitudeKey: 1,
      longitudeKey: 0,
      click: pop,
      hover: function (e, feature) {
            var popUp = '<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>';
            if (map.hasLayer(lineslayer.glLayer)) {
              L.popup({ maxWidth: 2000 })
                .setLatLng(e.latlng)
                .setContent(popUp)
                .openOn(map);
            }
          },
      highlight: {
            color: "orange",
            weight: 20,
            opacity: 0.8},
      sensitivityHover: 0.03,
      data: data,
      color: clrs,
      opacity: opacity,
      className: group,
      weight: wght
    });

  map.layerManager.addLayer(lineslayer.glLayer, "glify", layerId, group);

};


LeafletWidget.methods.removeGlPolylines = function(layerId) {
  this.layerManager.removeLayer("glify", layerId);
};

