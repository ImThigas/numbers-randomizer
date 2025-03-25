const inputText = document.querySelectorAll('input[type="text"]');

inputText.forEach((input) => {
  input.oninput = () => {
    let value = input.value.replace(/[^0-9]/g, "");
    input.value = value.trim();
  };
});

const form = document.querySelector("#first-form");
const quantityNumber = document.querySelector("#quantity");
const initialNumber = document.querySelector("#initial");
const finalNumber = document.querySelector("#final");
const repeatCheck = document.querySelector("#repeat");

const main = document.querySelector("main");
const show = document.querySelector("#sort-numbers");
const sorted = document.querySelector(".sorted-numbers");

const repeatSort = document.querySelector(".repeat-button");
const repeatForm = document.querySelector("#repeat-form");
const titleSort = document.querySelector(".title-sort span");
const repeatSubmit = document.querySelector("#repeat-submit")

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newSort = {
    quantity: parseInt(quantityNumber.value),
    initial: parseInt(initialNumber.value),
    finalN: parseInt(finalNumber.value),
    check: repeatCheck,
  };

  showNumbers(newSort.quantity, newSort.initial, newSort.finalN, newSort.check);
});

function showNumbers(quant, init, fin, chk) {
  try {
    if (init > fin) {
      throw new Error(
        "O número inicial deve ser menor ou igual ao número final"
      );
    }

    if (chk.checked && quant > fin - init + 1) {
      throw new Error(
        `Não é possível sortear ${quant} números diferentes entre ${init} e ${fin} `
      );
    }

    main.style.display = "none";
    show.style.display = "initial";

    if (chk.checked) {
      let numbers = [];
      numbers = sortCheck(init, fin);
      for (let j = 0; j < quant; j++) {
        setTimeout(() => {
          const newNumber = document.createElement("span");
          newNumber.append(numbers[j]);
          const newDiv = document.createElement("div");
          newDiv.classList.add("number");
          newDiv.append(newNumber);
          sorted.append(newDiv);
        }, 2500 * j);
      }
      setTimeout(() => {
        repeatSort.style.opacity = "1";
        repeatSubmit.removeAttribute("disabled")
      }, 2500 * quant);
    } else {
      let numbers = [];
      numbers = sortNum(quant, init, fin);
      for (let j = 0; j < quant; j++) {
        setTimeout(() => {
          const newNumber = document.createElement("span");
          newNumber.append(numbers[j]);
          const newDiv = document.createElement("div");
          newDiv.classList.add("number");
          newDiv.append(newNumber);
          sorted.append(newDiv);
        }, 2500 * j);
      }
      setTimeout(() => {
        repeatSort.style.opacity = "1";
        repeatSubmit.removeAttribute("disabled")
      }, 2500 * quant);
    }
  } catch (error) {
    alert("Não foi possível sortear os números");
    console.log(error);
  }
}

function sortCheck(init, fin) {
  let numbers = [];
  for (let i = init; i <= fin; i++) {
    numbers.push(i);
  }
  console.log(numbers);
  numbers = numbers.sort(() => Math.random() - 0.5);
  console.log(numbers);
  return numbers;
}

function sortNum(quant, init, fin) {
  let numbersSort = [];
  let i = 0;
  while (i < quant) {
    let num = Math.floor(Math.random() * (fin - init + 1)) + init;
    numbersSort.push(num);
    i++;
  }
  console.log(numbersSort);
  return numbersSort;
}

let cont = 1;
repeatForm.addEventListener("click", (event) => {
  event.preventDefault();
  repeatSort.style.opacity = "0";
  repeatSubmit.disabled = true
  cont = cont + 1;
  titleSort.textContent = `${cont}º Resultado`;

  sorted.innerHTML = "";

  const newSort = {
    quantity: parseInt(quantityNumber.value),
    initial: parseInt(initialNumber.value),
    finalN: parseInt(finalNumber.value),
    check: repeatCheck,
  };

  showNumbers(newSort.quantity, newSort.initial, newSort.finalN, newSort.check);
});
