var stripe = Stripe(
  "pk_test_51IgxBSIEUHKLgaEXti69Z6CQEtC6qtvCpbkLfCRf0glNVSF7juLv21AGnSgO252J7wkzFsqgLvWAGEE28W5niSXp00Ktqb7orZ"
);
var checkoutButton = document.getElementById("checkout-button");
console.log("Is this working?");
checkoutButton.addEventListener("click", function () {
  fetch("/create-checkout-session", {
    method: "POST",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
      // If redirectToCheckout fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using error.message.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});
