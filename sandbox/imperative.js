const kitchen = {};

function brew() {
  const grist = [
    kitchen.ingredient('11 lb US 2-row Pale Malt'),
    kitchen.ingredient('1 lb Carapils')
  ];
  const hopsSchedule = [
    { time: '60 min', hop: kitchen.ingredient('1 oz centennial') },
    { time: '20 min', hop: kitchen.ingredient('1 oz centennial') },
    { time: '20 min', hop: kitchen.ingredient('1 oz citra') },
    { time: '0 min', hop: kitchen.ingredient('2 oz fuggle') }
  ];
  const mashThickness = '1.2 qt/lb';
  const mashTemperature = '156 degF';
  const mashDuration = '1 hr';
  const mash = mash(grist, mashThickness, mashTemperature, mashDuration);
  const wort = batchSparge(mash, '')
}

function mash(grist, thickness, temperature, time) {
  return new Promise();
}

function batchSparge(mash, )

function boil(wort, infusionSchedule, time) {

}
