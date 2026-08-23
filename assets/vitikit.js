/* ===== VitiKit core: GDD + Winkler + spray mix ===== */
const VITIKIT = (() => {

  // ---- GDD (base 10°C / 50°F, single sine) ----
  function gddSingleSine(tminC, tmaxC, base = 10) {
    const tmean = (tminC + tmaxC) / 2;
    if (tminC >= base) return Math.max(0, tmean - base);    // fully above base
    if (tmaxC <= base) return 0;                             // never reaches base
    // partial day: integrate sine above base from tmin to crossing point (Snyder, 1985)
    const amp = (tmaxC - tminC) / 2;
    const tbar = tmean - base;                               // may be negative
    const theta = Math.asin(Math.min(1, Math.max(-1, tbar / amp)));
    return ((amp * Math.cos(theta) - tbar * (Math.PI / 2 - theta)) / Math.PI);
  }

  function accumulateGDD(dailyTemps, base = 10) {
    let total = 0;
    for (const d of dailyTemps) total += gddSingleSine(d.tmin, d.tmax, base);
    return Math.round(total);
  }

  // ---- Phenology (Coombe scale approximations, °C GDD from Apr 1 or regional budbreak baseline) ----
  const PHENOLOGY = [
    { stage: 'Bud break',           zh: '萌芽',        gdd: 20 },
    { stage: '1st leaf unfolded',   zh: '第1叶展开',   gdd: 60 },
    { stage: 'Inflorescence clear', zh: '花序显现',    gdd: 150 },
    { stage: 'Flowering begins',    zh: '始花期',      gdd: 250 },
    { stage: 'Full bloom',          zh: '盛花',        gdd: 300 },
    { stage: 'Fruit set',           zh: '坐果',        gdd: 400 },
    { stage: 'Pea-size berries',    zh: '豌豆粒期',    gdd: 550 },
    { stage: 'Véraison onset',      zh: '转色启动',    gdd: 900 },
    { stage: 'Full véraison',       zh: '完全转色',    gdd: 1000 },
    { stage: 'Harvest ripe',        zh: '采收成熟',    gdd: 1300 }
  ];

  function phenologyStage(cumGdd) {
    let cur = PHENOLOGY[0], next = null;
    for (let i = 0; i < PHENOLOGY.length; i++) {
      if (cumGdd >= PHENOLOGY[i].gdd) cur = PHENOLOGY[i];
      else { next = PHENOLOGY[i]; break; }
    }
    if (!next) return { current: cur, remaining: 0 };
    return { current: cur, next, remaining: next.gdd - cumGdd };
  }

  // ---- Winkler regions (°C GDD, Apr–Oct) ----
  function winklerRegion(gddC) {
    if (gddC < 1390) return { region: 'Region I',  zh: 'Ⅰ区（极冷凉）',
      desc: 'Cool-climate only: Pinot Noir, Chardonnay, Riesling. High acid, low alcohol wines.',
      style: ['Sparkling','Riesling','Pinot Noir'] };
    if (gddC < 1670) return { region: 'Region II', zh: 'Ⅱ区（冷凉）',
      desc: 'Chardonnay, Sauvignon Blanc, Pinot Gris, cool Merlot.',
      style: ['Sauvignon Blanc','Chardonnay','Merlot'] };
    if (gddC < 1940) return { region: 'Region III', zh: 'Ⅲ区（温和）',
      desc: 'Cabernet Franc, Merlot, Gewürztraminer, Syrah in cooler sites.',
      style: ['Merlot','Syrah','Cabernet Franc'] };
    if (gddC < 2220) return { region: 'Region IV', zh: 'Ⅳ区（温暖）',
      desc: 'Cabernet Sauvignon, Grenache, Sangiovese; irrigated table grapes thrive.',
      style: ['Cabernet Sauvignon','Grenache','Petit Verdot'] };
    return { region: 'Region V', zh: 'Ⅴ区（炎热）',
      desc: 'Very hot: fortified styles, raisins, Muscat; wine acidity management critical.',
      style: ['Muscat',' Pedro Ximénez','Thompson Seedless (table)'] };
  }

  // ---- Spray mix calculator ----
  function sprayMix({ tankL, ratePer100L, productDensityGL }) {
    const productML = tankL * ratePer100L;               // mL product per tank
    const grams = productML * (productDensityGL || 1000) / 1000;
    return { productMl: Math.round(productML), productGrams: Math.round(grams) };
  }

  // ---- Frost risk (simple Beaufort-sky radiation frost heuristic) ----
  function frostRisk(tDewpointC, windKmh, cloudPct) {
    // calm + clear + dry = highest radiative frost danger
    let score = 0;
    if (windKmh < 8) score += 2; else if (windKmh > 18) score -= 1;
    if (cloudPct < 25) score += 2; else if (cloudPct > 70) score -= 1;
    if (tDewpointC < -2) score += 2; else if (tDewpointC > 4) score -= 1;
    if (score >= 4) return { level: 'HIGH', zh: '高', advice: 'Deploy wind machines / sprinklers tonight. Bud-break vineyards are most vulnerable.' };
    if (score >= 2) return { level: 'MODERATE', zh: '中', advice: 'Monitor pre-dawn temps; prepare protection.' };
    return { level: 'LOW', zh: '低', advice: 'Conditions unfavorable for radiative frost.' };
  }

  return { gddSingleSine, accumulateGDD, phenologyStage, winklerRegion, sprayMix, frostRisk, PHENOLOGY };
})();
if (typeof module !== 'undefined') module.exports = VITIKIT;
