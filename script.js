const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});
function toggleEdit(editMode) {
  document.getElementById('userName').readOnly = !editMode;
  document.getElementById('userEmail').readOnly = !editMode;
  document.getElementById('userPhone').readOnly = !editMode;
  document.getElementById('userAddress').readOnly = !editMode;

  document.getElementById('editButtons').classList.toggle('d-none', !editMode);
  document.getElementById('viewButton').classList.toggle('d-none', editMode);
}

function saveUserInfo() {
  // You can add logic here to save the updated user information, e.g., send it to the server
  toggleEdit(false);
  alert('Thông tin tài khoản đã được lưu!');
}