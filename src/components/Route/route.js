import { join } from "path";

export const route = (res, myMap) => {
  // массив точек посещения
  const routes = res.map(element => {
    return [element.lat, element.lng];
  });

  const distancesFromPoint = (indexStartPoint, routes) => {
    let distances = []; // расстояние меду 1 точкой и всеми остальными
    for (let i = 0; i < routes.length; i++) {
      const line = Math.sqrt(
        Math.pow(routes[indexStartPoint][0] - routes[i][0], 2) +
          Math.pow(routes[indexStartPoint][1] - routes[i][1], 2)
      );
      if (line !== 0) {
        distances.push(line);
      }
    }
    routes[indexStartPoint] = [0, 0]; // пройденную точку переписываю
    return distances;
  };
  // index следующей точки в массиве routes
  const faindMinDistance = (arrDistances, indexPoint) => {
    arrDistances.forEach((element, index) => {
      if (indexPoint < index) {
        if (arrDistances[0] > element) {
          arrDistances[0] = element;
          indexNextPoint = index + 1;
        }
      } else {
        if (arrDistances[0] > element) {
          arrDistances[0] = element;
          indexNextPoint = index;
        }
      }
    });
    return indexNextPoint;
  };

  let indexNextPoint = 0; // индекс следующей точки
  let newArrPoints = [routes[indexNextPoint]]; // массив точек по наименьшему расстоянию

  // создаю новый массив newArrPoints для отрисовки маршрута
  // нахожу индекс следующей точки
  const finalArrPoints = indexNextPoint => {
    const distances = distancesFromPoint(indexNextPoint, routes); // массив длин маршрутов
    const nextPoint = routes[faindMinDistance(distances, indexNextPoint)]; // нашел следующую точку
    newArrPoints.push(nextPoint);
  };

  // нахожу все точки маршрута
  for (let i = 0; i < routes.length - 1; i++) {
    finalArrPoints(indexNextPoint);
  }
  // отрисовка маршрута
  const multiRoute = new ymaps.multiRouter.MultiRoute(
    {
      referencePoints: newArrPoints,
      params: {
        routingMode: "pedestrian",
        results: 2
      }
    },
    {
      wayPointVisible: false
    }
  );

  myMap.geoObjects.add(multiRoute);
};
//
//
//
//
//
//
//
/* routes.reduce((res, element, index, arr) => {
    let a = 0;
    for (let i = index + 1; i < arr.length - 1; i++) {
      // маршрут
      const multiRoutessssss = new ymaps.multiRouter.MultiRoute({
        referencePoints: [element, arr[i]],
        params: {
          results: 2
        }
      });
    
    }
  }, 0);*/

//получил длину маршрутов

/* multiRoutessssss.model.events
        .add("requestsuccess", event => {
          const routes = event.get("target").getRoutes();
          const dists = routes.map(
            route => route.properties.get("distance").text
          );
          console.log(dists);
          /*
          for (let i = 0, l = routes.length; i < l; i++) {
            a = routes[i].properties.get("distance").text;
            console.log(a);
            return a;
          }*/
/* })

        .add("requestfail", event => {
          console.log("Ошибка: " + event.get("error").message);
        });*/
