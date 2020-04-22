<template>
  <base-view class="view-travels">
    Travels
    <div ref="map" id="map"></div>
  </base-view>
</template>


<script>
// see: https://www.amcharts.com/docs/v4/chart-types/map/
// currently available maps, see: https://github.com/amcharts/amcharts4-geodata/tree/master/dist/es2015
import * as am4core from "@amcharts/amcharts4/core" // main module
import * as am4maps from "@amcharts/amcharts4/maps" // map module
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow" // geodata / GeoJSON

//am4core.useTheme(am4themes_animated) // ONKO PAKOLLINEN?

export default {
  name: 'viewTravels',

  mounted() {
    // create map instance
    let map = am4core.create(this.$refs.map, am4maps.MapChart)
    map.geodata = am4geodata_worldLow // set specific map definition
    map.projection = new am4maps.projections.Miller() // set specific map projection

    // create polygon series (add polygons / areas / countries)
    // note: at least one series is neeeded to draw anything
    let polygonSeries = new am4maps.MapPolygonSeries() // eg. countries
    polygonSeries.useGeodata = true // add some data to series
    // map use ISO-2 standard for countries, see: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements
    polygonSeries.exclude = ['AQ'] // for displaying, .include (also hides everything not included)
    map.series.push(polygonSeries)

    // configure map's appearance and behavior of its items by accessing templates
    // more about binding data in tooltips, see: https://www.amcharts.com/docs/v4/concepts/formatters/
    let polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = '{name}'
    polygonTemplate.fill = am4core.color('#74B266')
    polygonTemplate.propertyFields.fill = 'fill';

    // create hover state and set alternative fill color
    // more about visual object states, see: https://www.amcharts.com/docs/v4/concepts/states/
    let hs = polygonTemplate.states.create('hover')
    hs.properties.fill = am4core.color('#367B25')
    hs.properties.stroke = am4core.color('#d10d0d')

    // add custom data to polygon series
    const visitedCountries = ['FI', 'RU', 'MN', 'CN', 'TW', 'VN', 'KH', 'LA', 'TH', 'MM', 'NP', 'IN', 'LK', 'MY', 'KR', 'JP', 'NL']
    const hlColor = '#E7287A'
    let data = []
    visitedCountries.forEach(country => {
      let countryData = {
        'id': country,
        'fill': am4core.color(hlColor)
      }
      data.push(countryData)
    })    
    polygonSeries.data = data

    // create line series (draw lines to connect two or more points)
    //let lineSeries = new am4maps.MapLineSeries()
    let lineSeries = new am4maps.MapLineSeries()
    lineSeries.data = [{
      'multiGeoLine': [
        [ // points for the first cluster of segments
          { 'latitude': 48.856614, 'longitude': 2.352222 },
          { 'latitude': 40.712775, 'longitude': -74.005973 },
          { 'latitude': 49.282729, 'longitude': -123.120738 }
        ]
      ]
    }]
    // confiqure line appearance
    lineSeries.mapLines.template.line.stroke = am4core.color('#5C5CFF');
    lineSeries.mapLines.template.line.strokeOpacity = 0.5;
    lineSeries.mapLines.template.line.strokeWidth = 2.5;
    lineSeries.mapLines.template.line.strokeDasharray = '4';
    map.series.push(lineSeries)

    // create image series (draw markers to points)
    let imageSeries = new am4maps.MapImageSeries()
    let imageSeriesTemplate = imageSeries.mapImages.template
    let circle = imageSeriesTemplate.createChild(am4core.Circle)
    circle.radius = 5
    circle.fill = am4core.color('#B27799')
    circle.stroke = am4core.color('#FFFFFF')
    circle.strokeWidth = 2
    circle.nonScaling = true
    circle.tooltipText = '{title}'
    // bind properties to data
    imageSeriesTemplate.propertyFields.latitude = 'lat'
    imageSeriesTemplate.propertyFields.longitude = 'lng'
    // add custom data to image series
    imageSeries.data = [{
      'lat': 48.856614,
      'lng': 2.352222,
      'title': 'Paris'
    }, {
      'lat': 40.712775,
      'lng': -74.005973,
      'title': 'New York'
    }, {
      'lat': 49.282729,
      'lng': -123.120738,
      'title': 'Vancouver'
    }]
    map.series.push(imageSeries)
  }
}
</script>

<style lang="scss" scoped>

.view-travels {
  #map {
    overflow: hidden;
    border: 1px solid black;
    height: 500px;
  }
}

</style>