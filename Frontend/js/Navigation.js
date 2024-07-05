function loadNav() {
    fetch('/Frontend/pages/Navigation.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        });
}

document.addEventListener('DOMContentLoaded', loadNav);

const goToDetail = () => {
  window.location.href = "/Frontend/pages/detail.html";
}

const goToGood = () => {
  window.location.href = "/Frontend/pages/goodplace.html";
}

const goToMap = () => {
  window.location.href = "/Frontend/pages/maplist.html";
}

const goToCommunity = () => {
  window.location.href = "/Frontend/pages/Community.html";
}

const goToMy = () => {
  window.location.href = "/Frontend/pages/Mypage.html";
}