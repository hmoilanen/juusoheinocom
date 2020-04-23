<template>
  <base-view class="view-travels">
    Travels
    <div ref="map" id="map"></div>
  </base-view>
</template>


<script>
//TODOS:
//-ZOOMAA KARTTA NÄYTTÄMÄÄN VALITTU MAA (JOS ESIM KLIKKAA LIPPUA TMS KARTAN ULKOPUOELLA)
//  -TEE ZOOMIIN SIIRTYMISEEN ANIMAATIO
//-ZOOMAA KARTTA KLIKATTAVAAN MAAHAN
//  -...MUTTA TOIMII AINOASTAAAN JOS MAA ON JOKU MATKAREITIN MAISTA (MUUTOIN IGNORE)
//-SÄÄDÄ VÄRIT
//  -MERI: TUMMIN, MAAT: HARMAA, MATKAMAA: VAALEA HARMAA: HIGHLIGHTATTU MAA: KOROSTEVÄRI, MAIDEN RAJAT: (MEREN VÄRI?)

// see: https://www.amcharts.com/docs/v4/chart-types/map/
// currently available maps, see: https://github.com/amcharts/amcharts4-geodata/tree/master/dist/es2015
import * as am4core from '@amcharts/amcharts4/core' // main module
import * as am4maps from '@amcharts/amcharts4/maps' // map module
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow' // geodata / GeoJSON

//am4core.useTheme(am4themes_animated) // ONKO PAKOLLINEN?

export default {
  name: 'viewTravels',

  mounted() {
    // create map instance
    let map = am4core.create(this.$refs.map, am4maps.MapChart)
    map.geodata = am4geodata_worldLow // set specific map definition
    map.projection = new am4maps.projections.Miller() // set specific map projection
    //map.projection = new am4maps.projections.Orthographic()

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
    lineSeries.mapLines.template.line.stroke = am4core.color('#5C5CFF')
    lineSeries.mapLines.template.line.strokeOpacity = 0.5
    lineSeries.mapLines.template.line.strokeWidth = 2.5
    lineSeries.mapLines.template.line.strokeDasharray = '4'
    lineSeries.mapLines.template.shortestDistance = false // makes line appear as 'straight'
    //lineSeries.mapImages.template.nonScalingStroke = true  // prevent lines from scaling (EI ONNISTUNUT -> HUOM! MIKSI KOPIOITU KOODI EHDOTTAA .mapImages. ...?)
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
    imageSeries.mapImages.template.nonScaling = true // prevent images from scaling
    // bind properties to data
    imageSeriesTemplate.propertyFields.latitude = 'latitude'
    imageSeriesTemplate.propertyFields.longitude = 'longitude'
    // add custom data to image series
    imageSeries.data = [{
      'latitude': 48.856614,
      'longitude': 2.352222,
      'title': 'Paris'
    }, {
      'latitude': 40.712775,
      'longitude': -74.005973,
      'title': 'New York'
    }, {
      'latitude': 49.282729,
      'longitude': -123.120738,
      'title': 'Vancouver'
    }]
    map.series.push(imageSeries)

    // set map grid
    let grid = map.series.push(new am4maps.GraticuleSeries())
    grid.toBack()

    // set background color
    //map.background.fill = am4core.color('#aadaff')
    //map.background.fillOpacity = 1
    // ...or with orthographic map
    map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#aadaff')
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1

    // set map ceenter and initial zoom
    map.homeZoomLevel = 3
    map.homeGeoPoint = { latitude: 52, longitude: 11 }

    setTimeout(() => {
      console.log('taimautti');
      map.zoomLevel = 5
      map.geoPoint = { latitude: 62, longitude: 5 } // TÄMÄ EI OLE VISSIIN OIKEIN! -> KORJAA!!!!!!!!
    }, 3000)

    // set map center (for orthographic maps)
    //map.deltaLongitude = -90
    //map.deltaLatitude = -50
    // enable map rotation (for orthographic maps)
    //map.panBehavior = 'rotateLongLat' 

    // see: https://www.amcharts.com/docs/v4/reference/zoomcontrol/
    map.zoomControl = new am4maps.ZoomControl()
    map.zoomControl.slider.height = 100

    map.smallMap = new am4maps.SmallMap()
    map.smallMap.series.push(polygonSeries)

    //TEE LOPULLINEN TOTEUTUS TÄLLÄ TAVALLA!!!
    //TEE LOPULLINEN TOTEUTUS TÄLLÄ TAVALLA!!!
    //TEE LOPULLINEN TOTEUTUS TÄLLÄ TAVALLA!!!
    /* let paris = imageSeries.mapImages.create();
    paris.latitude = 48.856614;
    paris.longitude = 2.352222;

    let nyc = imageSeries.mapImages.create();
    nyc.latitude = 40.712776;
    nyc.longitude = -74.005973;

    let paris_nyc = lineSeries.mapLines.create();
    paris_nyc.imagesToConnect = [paris, nyc]; */

    // get map coordinates on click
    map.seriesContainer.events.on("hit", function(event) {
      console.log(map.svgPointToGeo(event.svgPoint))
    })

    // dispose map when component is destroyed
    this.$on('hook:beforeDestroy', () => {      
      map.dispose()
    })
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