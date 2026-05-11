const intentWeights = {
  confirmed: 0.92,
  interested: 0.58,
  undecided: 0.28
};

export function createForecast(popups, responses) {
  const popupMap = new Map(popups.map((popup) => [popup.id, popup]));
  const totals = {
    responses: responses.length,
    expectedVisitors: 0,
    expectedRevenue: 0
  };
  const byTimeSlot = new Map();
  const byProduct = new Map();

  for (const response of responses) {
    const popup = popupMap.get(response.popupId);
    if (!popup) continue;

    const partySize = 1 + Number(response.companions || 0);
    const rewardLift = response.rewardSaved ? 0.08 : 0;
    const probability = Math.min((intentWeights[response.intent] || 0.3) + rewardLift, 0.98);
    const expectedVisitors = partySize * probability;
    const expectedRevenue = expectedVisitors * Number(response.budget || 0);

    totals.expectedVisitors += expectedVisitors;
    totals.expectedRevenue += expectedRevenue;

    const timeKey = `${popup.name} · ${response.timeSlot}`;
    byTimeSlot.set(timeKey, (byTimeSlot.get(timeKey) || 0) + expectedVisitors);

    for (const product of response.products) {
      const current = byProduct.get(product) || { product, score: 0, popupName: popup.name };
      current.score += probability * (response.budget >= 35000 ? 1.25 : 1);
      byProduct.set(product, current);
    }
  }

  const timeSlots = [...byTimeSlot.entries()]
    .map(([label, expectedVisitors]) => ({
      label,
      expectedVisitors,
      congestion: getCongestion(expectedVisitors)
    }))
    .sort((a, b) => b.expectedVisitors - a.expectedVisitors);

  const inventory = [...byProduct.values()]
    .map((item) => ({
      ...item,
      recommendedStock: Math.ceil(item.score * 42)
    }))
    .sort((a, b) => b.recommendedStock - a.recommendedStock);

  return {
    totals: {
      responses: totals.responses,
      expectedVisitors: Math.round(totals.expectedVisitors),
      expectedRevenue: Math.round(totals.expectedRevenue / 10000) * 10000,
      conversionRate: totals.responses ? Math.round((totals.expectedVisitors / totals.responses) * 100) : 0
    },
    timeSlots,
    inventory,
    peak: timeSlots[0] || null,
    topProduct: inventory[0] || null
  };
}

function getCongestion(expectedVisitors) {
  if (expectedVisitors >= 3.5) return "매우 혼잡";
  if (expectedVisitors >= 2.2) return "혼잡";
  if (expectedVisitors >= 1.2) return "보통";
  return "여유";
}
