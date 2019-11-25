const findRestaurant = elem => {
  return elem === "Restaurant";
};

export const placeMark = res => {
  const arr = res.map(element => {
    if (element.categories.some(findRestaurant)) {
      const mark = new ymaps.Placemark(
        [element.lat, element.lng],
        {
          hintContent: element.wikipedia_title,
          balloonContentHeader: element.title,
          balloonContent: [
            `<img class="placeMark__image" alt="${element.title}" src=${element.image}>                
   <div>Категория: ${element.categories}</div>
   <div>Рейтинг facebook ${element.facebook_rating}</div> 
   <div>Рейтинг tripAdvisor ${element.tripAdvisor_rating}</div>`
          ]
        },
        { iconColor: "red" }
      );
      return mark;
    } else {
      const mark = new ymaps.Placemark([element.lat, element.lng], {
        hintContent: element.wikipedia_title,
        balloonContentHeader: element.title,
        balloonContent: [
          `<img class="placeMark__image" alt="${element.title}" src=${element.image}>                
       <div>Категория: ${element.categories}</div>
       <div>Рейтинг facebook ${element.facebook_rating}</div> 
       <div>Рейтинг tripAdvisor ${element.tripAdvisor_rating}</div>`
        ]
      });
      return mark;
    }
  });
  return arr;
};
