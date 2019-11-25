import { placeMark } from "./components/PlaceMark/placeMark";
import { gettingData } from "./utils/gettingData";
import { route } from "./components/Route/route";
import { createClusterer } from "./components/Clusterer/clusterer";

ymaps.ready(init);
function init() {
  const myMap = new ymaps.Map("map", {
    center: [55.785, 49.115],
    zoom: 13,
    controls: ["zoomControl"]
  });

  gettingData().then(res => {
    const places = placeMark(res);
    const clusterer = createClusterer();
    const routeAdd = route(res, myMap);

    clusterer.add(places);
    myMap.geoObjects.add(clusterer);
  });
}
