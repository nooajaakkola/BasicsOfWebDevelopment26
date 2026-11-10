const lomake = document.getElementById("matkatoive-lomake");
const sahkoposti = document.getElementById("sahkoposti");
const sahkopostiVirhe = document.getElementById("sahkoposti-virhe");
const lahtopaiva = document.getElementById("lahtopaiva");
const tila = document.getElementById("lomake-tila");

const tanaan = new Date();
const kuukausi = String(tanaan.getMonth() + 1).padStart(2, "0");
const paiva = String(tanaan.getDate()).padStart(2, "0");
lahtopaiva.min = tanaan.getFullYear() + "-" + kuukausi + "-" + paiva;

function paivitaSahkopostinVirhe() {
  if (sahkoposti.validity.valid) {
    sahkopostiVirhe.hidden = true;
    sahkopostiVirhe.textContent = "";
    sahkoposti.classList.remove("kentta-virheellinen");
    sahkoposti.removeAttribute("aria-invalid");
    return;
  }

  if (sahkoposti.validity.valueMissing) {
    sahkopostiVirhe.textContent = "Kirjoita sähköpostiosoitteesi.";
  } else {
    sahkopostiVirhe.textContent = "Tarkista osoite. Sen pitää olla muodossa nimi@esimerkki.fi.";
  }

  sahkopostiVirhe.hidden = false;
  sahkoposti.classList.add("kentta-virheellinen");
  sahkoposti.setAttribute("aria-invalid", "true");
}

sahkoposti.addEventListener("input", paivitaSahkopostinVirhe);

lomake.addEventListener("submit", function (tapahtuma) {
  tapahtuma.preventDefault();
  tila.hidden = true;
  paivitaSahkopostinVirhe();

  if (!lomake.checkValidity()) {
    const ensimmainen = lomake.querySelector(":invalid");
    ensimmainen.focus();
    if (ensimmainen !== sahkoposti) {
      ensimmainen.reportValidity();
    }
    return;
  }

  tila.hidden = false;
  lomake.reset();
  sahkopostiVirhe.hidden = true;
  sahkoposti.classList.remove("kentta-virheellinen");
  sahkoposti.removeAttribute("aria-invalid");
});
