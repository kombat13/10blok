const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  $('.target').text('');
  $('.target').removeClass("target");
  // FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  while ($('.target') === '') {
    $(divSelector).addClass("target");
  }

  $(divSelector).text(hits + 1); // TODO: помечать target текущим номером
  if (hits === 0) {
    firstHitTime = getTimestamp(); // FIXME: тут надо определять при первом клике firstHitTime
  }
  if (hits === maxHits) {
    endGame(); // В конец игры
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $('.target').text('');
  $('.target').removeClass("target");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
  $('#my-table').hide();
  $('#button-reload').hide();
  $('#button-start').show();
  totalPlayedSeconds = 0
  hits = 0
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?

  let elName = ""
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else {
    console.log($(this).attr('id'));
    elName = $(this).attr('id');
    $('#' + elName).addClass("miss");
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function startButt() {
  $('#my-table').show();
  $('#button-reload').show();
  $('#button-start').hide();
  round();
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $('#my-table').hide();
  $('#button-reload').hide();
  $("#button-start").click(startButt);

  round();
  $(".game-field").click(handleClick);
  $("#button-reload").click(function () {
    location.reload();

  });
}

$(document).ready(init);