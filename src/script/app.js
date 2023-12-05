// Simulating state
let result = null;
let errorMessage = '';

function setErrorMessage(message) {
  errorMessage = message;
  document.getElementById('errorMessage').innerText = errorMessage;
}

function setResult(data) {
  result = data;
  document.getElementById('resultDaysToFarm').innerText = result.daysToFarm;
  document.getElementById('resultDailyCompleted').innerText = result.dailyCompleted;
  document.getElementById('resultWeeklyCompleted').innerText = result.weeklyCompleted;
  document.getElementById('resultTotalEndeavors').innerText = result.totalEndeavors;
  document.getElementById('result').style.display = 'block';
}

function calculateEndeavors() {
  var currentEndeavors = parseInt(document.getElementById('currentEndeavors').value);
  var wantedEndeavors = parseInt(document.getElementById('wantedEndeavors').value);
  var lastWeekly = parseInt(document.getElementById('lastWeekly').value);

  if (currentEndeavors >= wantedEndeavors) {
    setErrorMessage("You already have enough endeavors! No need to calculate.");
    setResult(null);
    return;
  }

  let gain_per_daily = 15;
  let quests_per_day = 3;

  let number_of_days_to_farm = 0;
  let number_of_daily_completed = 0;
  let number_of_weekly_completed = 0;

  let newEndeavorCount = currentEndeavors;

  while (newEndeavorCount < wantedEndeavors) {
    if (number_of_days_to_farm > 365) {
      setErrorMessage("Well... honestly too lazy to calculate more... but you've got more than a year's worth, so go ahead and tryhard.");
      setResult(null);
      return;
    }

    if (number_of_days_to_farm % 7 === lastWeekly) {
      newEndeavorCount += 250;
      number_of_weekly_completed += 1;
    }

    newEndeavorCount += gain_per_daily * quests_per_day;
    number_of_daily_completed += 3;

    number_of_days_to_farm += 1;
  }

  setResult({
    daysToFarm: number_of_days_to_farm,
    dailyCompleted: number_of_daily_completed,
    weeklyCompleted: number_of_weekly_completed,
    totalEndeavors: newEndeavorCount
  });

  setErrorMessage('');
}

function resetPage() {
  document.getElementById('currentEndeavors').value = '';
  document.getElementById('wantedEndeavors').value = '';
  document.getElementById('lastWeekly').value = '';

  document.getElementById('resultDaysToFarm').innerText = '';
  document.getElementById('resultDailyCompleted').innerText = '';
  document.getElementById('resultWeeklyCompleted').innerText = '';
  document.getElementById('resultTotalEndeavors').innerText = '';
  document.getElementById('result').style.display = 'none';

  setErrorMessage('');
}

// Event listeners for buttons
document.getElementById('calculateButton').addEventListener('click', calculateEndeavors);
document.getElementById('resetButton').addEventListener('click', resetPage);
