convertToLines <- function(x, session, inputname) {
  coords <- matrix((unlist(x$geom)), ncol = 2, byrow = T)
  # Create the lines object and merge with data
  lines <- sfheaders::sf_linestring(coords)
  lines <- merge(lines, data.frame(x$data))
  sf::st_crs(lines) <- 4326
  # leaflet() %>% addTiles() %>% addPolylines(data=lines)
  lines
}
convertToPoints <- function(x, session, inputname) {
  browser()
  coords <- matrix((unlist(x$geom)), ncol = 2, byrow = T)
  # Create the lines object and merge with data
  lines <- sfheaders::sf_linestring(coords)
  lines <- merge(lines, data.frame(x$data))
  sf::st_crs(lines) <- 4326
  # leaflet() %>% addTiles() %>% addPolylines(data=lines)
  lines
}
convertToPolygon <- function(x, session, inputname) {
  browser()
  coords <- matrix((unlist(x$geom)), ncol = 2, byrow = T)
  # Create the lines object and merge with data
  lines <- sfheaders::sf_linestring(coords)
  lines <- merge(lines, data.frame(x$data))
  sf::st_crs(lines) <- 4326
  # leaflet() %>% addTiles() %>% addPolylines(data=lines)
  lines
}

.onLoad <- function(libname, pkgname){
  shiny::registerInputHandler("sf_coord_lines", convertToLines)
  shiny::registerInputHandler("sf_coord_point", convertToPoints)
  shiny::registerInputHandler("sf_coord_polyg", convertToPolygon)
}