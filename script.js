const convertButton = document.querySelector(".convert-button");
const btnReset = document.querySelector('.btnReset'); 
const currencySelect = document.querySelector(".currency-select");

const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
const currencyValueConverted = document.querySelector(".currency-value");

const convertValues = async () => {
    const inputCurrencyValue = document.querySelector(".input-currency").value;

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL").then(response => response.json())

    const dolarToday = data.USDBRL.high
    const euroToday =  data.EURBRL.high
    const libraToday = data.GBPBRL.high
    const bitcoinToday = data.BTCBRL.high


    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);

    if (currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarToday);

    }
    if (currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday);
    }

    if (currencySelect.value == "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue / libraToday);
    }

    if (currencySelect.value == "bitcoin") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'BTC',
            minimumFractionDigits: 8
        }).format(inputCurrencyValue / bitcoinToday);
    }
};

changeCurrency = () => {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");

    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/dolar.png"
    }

    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro.png"
    }

    if (currencySelect.value == "libra") {
        currencyName.innerHTML = "Libra"
        currencyImage.src = "./assets/libra.png"
    }

    if (currencySelect.value == "bitcoin") {
        currencyName.innerHTML = "Bitcoin"
        currencyImage.src = "./assets/bitcoin.png"
    }

    convertValues()
};

btnReset.addEventListener('click', function() {
    currencyValueToConvert.innerHTML  = '--';
    currencyValueConverted.innerHTML  = '--';
    document.querySelector(".input-currency").value = '';
});

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);