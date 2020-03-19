LeafletWidget.methods.addGlifyPolygons = function(data, cols, popup, opacity, group, layerId) {

  var map = this;

    var clrs;
    if (cols.length === 1) {
      clrs = cols[0];
    } else {
      clrs = function(index, feature) { return cols[index]; };
    }

    var pop;
    if (popup) {
        if (popup === true) {
          pop = function (e, feature) {
            var popUp = '<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>';
            if (map.hasLayer(shapeslayer.glLayer)) {
              L.popup({ maxWidth: 2000 })
                .setLatLng(e.latlng)
                .setContent(popUp)
                .openOn(map);
            }
          };
        } else {
          pop = function (e, feature) {
            if (map.hasLayer(shapeslayer.glLayer)) {
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

    console.log("data - Polygon"); console.log(data)
    var shapeslayer = L.glify.shapes({
      map: map,
      click: pop,
      hover: pop,
      highlight: {
        color:{r:1,g:0,b:0},
        opacity: 0.3
      },
      data: data,
      color: clrs,
      opacity: opacity,
      className: group
    });

  map.layerManager.addLayer(shapeslayer.glLayer, "glify", layerId, group);

};


LeafletWidget.methods.removeGlPolygons = function(layerId) {
  this.layerManager.removeLayer("glify", layerId);
};