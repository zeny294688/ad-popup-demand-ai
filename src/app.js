import { popups, responses as seedResponses } from "./data.js";
import { createForecast } from "./forecast.js";

let selectedPopupId = popups[0].id;
let responses = [...seedResponses];
let rewardCount = 2;

const popupGrid = document.querySelector("#popupGrid");
const productOptions = document.querySelector("#productOptions");
const selectedPopupName = document.querySelector("#selectedPopupName");
const timeSlotSelect = document.querySelector("#timeSlotSelect");
const surveyForm = document.querySelector("#surveyForm");
const rewardList = document.querySelector("#rewardList");
const rewardCode = document.querySelector("#rewardCode");
const metricGrid = document.querySelector("#metricGrid");
const timeChart = document.querySelector("#timeChart");
const inventoryList = document.querySelector("#inventoryList");
const peakSummary = document.querySelector("#peakSummary");
const inventorySummary = document.querySelector("#inventorySummary");
const sidebarVisitors = document.querySelector("#sidebarVisitors");
const sidebarPeak = document.querySelector("#sidebarPeak");
const simulateButton = document.querySelector("#simulateButton");

document.querySelectorAll(".nav-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-tab").forEach((tab) => tab.classList.remove("is-active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("is-active"));
    button.classList.add("is-active");
    document.querySelector(`#${button.dataset.view}View`).classList.add("is-active");
  });
});

surveyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(surveyForm);
  const products = form.getAll("products");

  responses = [
    ...responses,
    {
      popupId: selectedPopupId,
      intent: form.get("intent"),
      timeSlot: form.get("timeSlot"),
      budget: Number(form.get("budget")),
      products: products.length ? products : [getSelectedPopup().products[0]],
      companions: 1,
      rewardSaved: true
    }
  ];

  rewardCount += 1;
  rewardCode.textContent = `POP-${String(1200 + rewardCount)}`;
  renderRewards();
  renderDashboard();
});

simulateButton.addEventListener("click", () => {
  const generated = Array.from({ length: 25 }, (_, index) => {
    const popup = popups[index % popups.length];
    const product = popup.products[index % popup.products.length];
    return {
      popupId: popup.id,
      intent: index % 5 === 0 ? "interested" : "confirmed",
      timeSlot: popup.timeSlots[index % popup.timeSlots.length],
      budget: [18000, 35000, 55000][index % 3],
      products: [product],
      companions: index % 3,
      rewardSaved: index % 4 !== 0
    };
  });
  responses = [...responses, ...generated];
  renderDashboard();
});

function renderPopups() {
  popupGrid.innerHTML = popups
    .map(
      (popup) => `
        <article class="popup-card ${popup.id === selectedPopupId ? "is-selected" : ""}" data-popup-id="${popup.id}">
          <img src="${popup.image}" alt="${popup.name}" />
          <div>
            <span>${popup.district} · ${popup.period}</span>
            <h3>${popup.name}</h3>
            <p>${popup.description}</p>
          </div>
        </article>
      `
    )
    .join("");

  popupGrid.querySelectorAll(".popup-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedPopupId = card.dataset.popupId;
      renderPopups();
      renderSurveyOptions();
    });
  });
}

function renderSurveyOptions() {
  const popup = getSelectedPopup();
  selectedPopupName.textContent = popup.name;
  timeSlotSelect.innerHTML = popup.timeSlots.map((slot) => `<option value="${slot}">${slot}</option>`).join("");
  productOptions.innerHTML = popup.products
    .map(
      (product, index) => `
        <label class="check-option">
          <input type="checkbox" name="products" value="${product}" ${index === 0 ? "checked" : ""} />
          <span>${product}</span>
        </label>
      `
    )
    .join("");
}

function renderRewards() {
  rewardList.innerHTML = [
    "사전 설문 참여 500P",
    "관심 상품 쿠폰 저장",
    "QR 체크인 시 추가 적립"
  ]
    .map((reward) => `<li>${reward}</li>`)
    .join("");
}

function renderDashboard() {
  const forecast = createForecast(popups, responses);
  const metrics = [
    ["참여 응답", `${forecast.totals.responses}건`],
    ["예상 방문자", `${forecast.totals.expectedVisitors.toLocaleString("ko-KR")}명`],
    ["예상 매출", `${forecast.totals.expectedRevenue.toLocaleString("ko-KR")}원`],
    ["방문 전환 지수", `${forecast.totals.conversionRate}%`]
  ];

  metricGrid.innerHTML = metrics
    .map(
      ([label, value]) => `
        <article class="metric-card">
          <span>${label}</span>
          <strong>${value}</strong>
        </article>
      `
    )
    .join("");

  const maxVisitors = Math.max(...forecast.timeSlots.map((slot) => slot.expectedVisitors), 1);
  timeChart.innerHTML = forecast.timeSlots
    .slice(0, 6)
    .map(
      (slot) => `
        <div class="bar-row">
          <span>${slot.label}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${(slot.expectedVisitors / maxVisitors) * 100}%"></div>
          </div>
          <strong>${slot.congestion}</strong>
        </div>
      `
    )
    .join("");

  inventoryList.innerHTML = forecast.inventory
    .slice(0, 6)
    .map(
      (item) => `
        <div class="inventory-item">
          <div>
            <strong>${item.product}</strong>
            <span>${item.popupName}</span>
          </div>
          <b>${item.recommendedStock}개</b>
        </div>
      `
    )
    .join("");

  peakSummary.textContent = forecast.peak ? forecast.peak.label : "데이터 없음";
  inventorySummary.textContent = forecast.topProduct ? forecast.topProduct.product : "데이터 없음";
  sidebarVisitors.textContent = `${forecast.totals.expectedVisitors.toLocaleString("ko-KR")}명`;
  sidebarPeak.textContent = forecast.peak ? forecast.peak.label : "혼잡 시간 없음";
}

function getSelectedPopup() {
  return popups.find((popup) => popup.id === selectedPopupId) || popups[0];
}

renderPopups();
renderSurveyOptions();
renderRewards();
renderDashboard();
