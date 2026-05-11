export const popups = [
  {
    id: "market-makers",
    name: "Market Makers Weekend",
    district: "성북구",
    host: "지역 창작자 연합",
    period: "5.18 - 5.19",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    description: "로컬 굿즈, 핸드메이드 문구, 한정 협업 상품을 만나는 주말 팝업",
    products: ["한정 키링", "티셔츠", "스티커팩", "포스터"],
    timeSlots: ["금 18-20시", "토 11-13시", "토 14-16시", "토 17-19시", "일 12-14시"]
  },
  {
    id: "local-roast",
    name: "Local Roast Lab",
    district: "마포구",
    host: "동네 로스터리",
    period: "5.24 - 5.26",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    description: "시음 예약과 원두 취향 데이터를 기반으로 운영하는 커피 팝업",
    products: ["드립백 세트", "싱글오리진 원두", "머그컵", "디저트 박스"],
    timeSlots: ["금 15-17시", "토 10-12시", "토 13-15시", "토 16-18시", "일 11-13시"]
  },
  {
    id: "vintage-route",
    name: "Vintage Route 72",
    district: "종로구",
    host: "로컬 빈티지 셀러",
    period: "6.1 - 6.2",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80",
    description: "예약 시간대별 입장으로 혼잡을 줄이는 빈티지 의류 팝업",
    products: ["데님 재킷", "그래픽 티", "실버 액세서리", "에코백"],
    timeSlots: ["토 11-13시", "토 14-16시", "토 17-19시", "일 11-13시", "일 14-16시"]
  }
];

export const responses = [
  { popupId: "market-makers", intent: "confirmed", timeSlot: "토 14-16시", budget: 35000, products: ["한정 키링", "스티커팩"], companions: 1, rewardSaved: true },
  { popupId: "market-makers", intent: "confirmed", timeSlot: "토 14-16시", budget: 55000, products: ["한정 키링", "티셔츠"], companions: 2, rewardSaved: true },
  { popupId: "market-makers", intent: "interested", timeSlot: "토 17-19시", budget: 18000, products: ["포스터"], companions: 0, rewardSaved: false },
  { popupId: "market-makers", intent: "confirmed", timeSlot: "일 12-14시", budget: 35000, products: ["스티커팩", "포스터"], companions: 1, rewardSaved: true },
  { popupId: "local-roast", intent: "confirmed", timeSlot: "토 13-15시", budget: 35000, products: ["드립백 세트", "싱글오리진 원두"], companions: 1, rewardSaved: true },
  { popupId: "local-roast", intent: "interested", timeSlot: "토 16-18시", budget: 55000, products: ["머그컵"], companions: 0, rewardSaved: true },
  { popupId: "local-roast", intent: "confirmed", timeSlot: "일 11-13시", budget: 18000, products: ["디저트 박스"], companions: 2, rewardSaved: false },
  { popupId: "vintage-route", intent: "confirmed", timeSlot: "토 17-19시", budget: 55000, products: ["데님 재킷", "실버 액세서리"], companions: 1, rewardSaved: true },
  { popupId: "vintage-route", intent: "interested", timeSlot: "토 14-16시", budget: 35000, products: ["그래픽 티", "에코백"], companions: 0, rewardSaved: true },
  { popupId: "vintage-route", intent: "undecided", timeSlot: "일 14-16시", budget: 18000, products: ["에코백"], companions: 1, rewardSaved: false }
];
