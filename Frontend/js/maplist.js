function goToDetail() {
  window.location.href = "detail.html";
}

function goToGood() {
  window.location.href = "goodplace.html";
}

function goToMap() {
  window.location.href = "maplist.html";
}

function goToCommunity() {
  window.location.href = "community.html";
}

function goToMy() {
  window.location.href = "mypage.html";
}

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.492104695980714, 126.89526743425687), // 지도의 중심좌표 : 대림역
    level: 7, // 지도의 확대 레벨
  };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 전역 변수로 마커들을 담을 배열을 선언합니다
var markers = [];

// 헬스장 및 상담센터 마커 데이터
var gymPositions = [
  {
    content: "<div>피투사 여성전용 신도림점</div>",
    latlng: new kakao.maps.LatLng(37.50583, 126.8806),
  },
  {
    content: "<div>여성 전용 헬스장</div>",
    latlng: new kakao.maps.LatLng(37.51963, 126.889),
  },
  {
    content: "<div>나의운동공간</div>",
    latlng: new kakao.maps.LatLng(37.5254832, 126.8937595),
  },
  {
    content: "<div>커브스 영등포클럽</div>",
    latlng: new kakao.maps.LatLng(37.51391, 126.9057),
  },
];

var centerPositions = [
  {
    content: "<div>구로여성새로일하기센터</div>",
    latlng: new kakao.maps.LatLng(37.50199, 126.8888),
  },
  {
    content: "<div>도림동주민센터 안심택배함</div>",
    latlng: new kakao.maps.LatLng(37.50953, 126.896),
  },
  {
    content: "<div>영등포구여성늘품센터여성</div>",
    latlng: new kakao.maps.LatLng(37.51898, 126.886),
  },
  {
    content: "<div>이어쉼</div>",
    latlng: new kakao.maps.LatLng(37.51524, 126.9109),
  },
  {
    content: "<div>영등포구 육아종합지원센터</div>",
    latlng: new kakao.maps.LatLng(37.50715, 126.9117),
  },
  {
    content: "<div>꿈터성폭력상담소 4</div>",
    latlng: new kakao.maps.LatLng(37.49817, 126.9162),
  },
  {
    content: "<div>한국성폭력예방센터</div>",
    latlng: new kakao.maps.LatLng(37.5183, 126.9063),
  },
];

function searchCategory(category) {
  if (category === "GYM") {
    displayMarkers(gymPositions);
  } else if (category === "CENTER") {
    displayMarkers(centerPositions);
  }
}

function displayMarkers(positions) {
  // 기존 마커들을 제거
  removeMarkers();

  for (var i = 0; i < positions.length; i++) {
    // 마커를 생성
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[i].latlng, // 마커의 위치
    });

    // 마커에 표시할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: positions[i].content, // 인포윈도우에 표시할 내용
    });

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));

    // 생성된 마커를 배열에 추가합니다
    markers.push(marker);
  }
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
  return function () {
    infowindow.open(map, marker);
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
  return function () {
    infowindow.close();
  };
}

// 지도에서 기존에 표시한 마커들을 모두 제거하는 함수입니다
function removeMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// 초기 화면에 기본 마커를 표시하려면 이 함수를 호출합니다
displayMarkers(gymPositions);

// // 백엔드에서 여성 전용 시설 데이터를 가져오는 함수
// async function fetchWomenOnlyPlaces(categoryCode) {
//   try {
//     const response = await fetch(`http://127.0.0.1:8000/womenonly/place/?women_only_category=${categoryCode}`, {
//       method: "GET",
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     console.log(data);
//     if (data) {
//       removeMarker();
//       data.forEach((item) => {
//         fetchPlaceDetails(item.place);
//       });
//     }
//   } catch (error) {
//     console.error("There has been a problem with your fetch operation:", error);
//   }
// }

// // 장소 세부 정보를 가져오는 함수
// async function fetchPlaceDetails(placeId) {
//   try {
//     const response = await fetch(`http://127.0.0.1:8000/place/${placeId}/`);
//     const place = await response.json();
//     displayMarker(place);
//   } catch (error) {
//     console.error("There has been a problem with your fetch operation:", error);
//   }
// }

// // 카테고리 검색 함수
// function searchCategory(categoryCode) {
//   fetchWomenOnlyPlaces(categoryCode);
// }

// // 지도에 마커를 표시하는 함수입니다
// function displayMarker(place) {
//   var marker = new kakao.maps.Marker({
//     map: map,
//     position: new kakao.maps.LatLng(place.y, place.x),
//   });

//   kakao.maps.event.addListener(marker, "click", function () {
//     infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>");
//     infowindow.open(map, marker);
//   });

//   markers.push(marker);
// }

// // 지도에서 기존에 표시한 마커들을 모두 제거하는 함수입니다
// function removeMarker() {
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(null);
//   }
//   markers = [];
// }

// function login() {
//   // 로그인 로직
//   const token = "exampleToken"; // 실제 토큰 값으로 수정
//   localStorage.setItem("access", token);
// }

// // 전역 함수로 선언하여 HTML에서 접근 가능하게 설정
// window.searchCategory = searchCategory;
