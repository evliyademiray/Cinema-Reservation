/* 1inci aşama için çözüm aşamaları
 * Tıklanılan koltuğa ulaşmak için container divini çek
 * Container'a bir olay izleyici ekle
 *
 */
const container = document.querySelector(".container");
// console.log(container);
const infoText = document.querySelector(".infoText");
// console.log(infoText)

const totalSeatCount = document.getElementById("count");
// console.log(totalSeatCount);
const totalPrice = document.getElementById("amount");
// console.log(totalPrice);
const movieSelect = document.getElementById("movie");
//console.log(movieSelect.options[movieSelect.selectedIndex].value)
const allSeats = document.querySelectorAll(".seat:not(.reserve)");

const saveToDatabase = (willSaveIndex) => {
  // console.log(willSaveIndex)
  //Veriyi JSON formatına çevirme
  const jsonIndex = JSON.stringify(willSaveIndex);
  //Veri Tabanına koltukları kayıt etme
  localStorage.setItem("seatIndex", jsonIndex);
  localStorage.setItem("movieIndex", JSON.stringify(movieSelect.selectedIndex));
};
const getFromDatabase = () => {
  const dbSelectedIndex = JSON.parse(localStorage.getItem("seatIndex"));
  console.log(dbSelectedIndex);
  if (dbSelectedIndex !== null) {
    allSeats.forEach((seat, index) => {
      if (dbSelectedIndex.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }
  const dbMovieIndex = JSON.parse(localStorage.getItem("movieIndex"));
  movieSelect.selectedIndex = dbMovieIndex;
};
getFromDatabase();

const createIndex = () => {
  const allSeatsArray = [];
  allSeats.forEach((seat) => {
    allSeatsArray.push(seat);
  });
  // console.log(allSeatsArray);
  const allSelectedSeatsArray = [];
  const selectedSeats = container.querySelectorAll(".seat.selected");
  // console.log(selectedSeats);
  selectedSeats.forEach((selectedSeats) => {
    allSelectedSeatsArray.push(selectedSeats);
  });
  const selectedIndex = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });
  // console.log(selectedIndex)
  saveToDatabase(selectedIndex);
};

//Toplam Fiyat Hesaplama Fonksiyonu
function calculateTotal() {
  createIndex();
  const selectedSeatCounts =
    container.querySelectorAll(".seat.selected").length;
  //console.log(selectedSeatCounts);
  totalSeatCount.innerText = selectedSeatCounts;

  let selectedMoviePrice = movieSelect.options[movieSelect.selectedIndex].value;
  // console.log(selectedMoviePrice);
  totalPrice.innerText = selectedSeatCounts * selectedMoviePrice;
  if (selectedSeatCounts > 0) {
    // console.log(selectedSeatCounts);
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
}
calculateTotal();
container.addEventListener("click", (pointerEvent) => {
  // console.log('Container Tıklandı')
  const clickedSeat = pointerEvent.target.offsetParent;
  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserve")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});
movieSelect.addEventListener("change", () => {
  calculateTotal();
});
