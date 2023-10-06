//

//CSS
import "./index.css";

//Javascript

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validatorConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupConfirm from "../components/PopupConfirm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

/************
 * ELEMENTS *
 ************/
//Profile elements
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileAvatar = document.querySelector("#profile-avatar");
//card elements
const addCardBtn = document.querySelector("#add-card-button");

/******************
 * FORM VALIDATORS *
 ******************/
const profileModalFormValidator = new FormValidator(
  validatorConfig,
  document.forms["profile-modal-form"]
);
const cardModalFormValidator = new FormValidator(
  validatorConfig,
  document.forms["card-modal-form"]
);
const avatarModalFormValidator = new FormValidator(
  validatorConfig,
  document.forms["avatar-modal-form"]
);

profileModalFormValidator.enableValidation();
cardModalFormValidator.enableValidation();
avatarModalFormValidator.enableValidation();

/*******
 * API *
 *******/
const token = "c2b0fb8f-5e2c-45d3-9e40-bbe48905b446";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "content-type": "application/json",
  },
});

/************
 * SECTIONS *
 ************/
let cardSection;

api
  .getInitialCards()
  .then((result) => {
    cardSection = new Section(
      { items: result, renderer: createNewCardEl },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch(catchFetchError);

/**********
 * POPUPS *
 **********/
const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
const addCardPopup = new PopupWithForm(
  "#card-add-modal",
  handleAddCardModalSubmit
);
const avatarModal = new PopupWithForm("#avatar-modal", handleAvatarModalSubmit);
const picturePopup = new PopupWithImage("#picture-modal");
const deleteCardPopup = new PopupConfirm(
  "#card-delete-modal",
  handlePopupButtonClick
);

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
avatarModal.setEventListeners();
picturePopup.setEventListeners();
deleteCardPopup.setEventListeners();

/************
 * USERINFO *
 ************/

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-description",
  avatarSelector: "#profile-image",
});

api
  .getCurrentUser()
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setAvatar(result.avatar);
  })
  .catch(catchFetchError);

/******************
 * EVENT HANDLERS *
 ******************/
function handleProfileEditSubmit(e, { name, description }) {
  e.preventDefault();
  profilePopup.renderLoading(true);
  api
    .updateUser(name, description)
    .then(() => {
      userInfo.setUserInfo(name, description);
    })
    .catch(catchFetchError)
    .finally(() => {
      profilePopup.renderLoading(false);
      profilePopup.close();
    });
}

function handleAddCardModalSubmit(e, cardData) {
  e.preventDefault();
  addCardPopup.renderLoading(true);
  api
    .createCard(cardData.name, cardData.link)
    .then((result) => {
      cardData._id = result._id;
    })
    .then(() => {
      cardSection.addItem(createNewCardEl(cardData));
    })
    .catch(catchFetchError)
    .finally(() => {
      addCardPopup.renderLoading(false);
      addCardPopup.close();
    });
}

function handleAvatarModalSubmit(e, { link }) {
  e.preventDefault();
  avatarModal.renderLoading(true);
  api
    .updateAvatar(link)
    .then(() => {
      userInfo.setAvatar(link);
    })
    .catch(catchFetchError)
    .finally(() => {
      avatarModal.renderLoading(false);
      avatarModal.close();
    });
}

function handleCardClick(cardObject) {
  picturePopup.open(cardObject.link, cardObject.name);
}

function handleDeleteBtnClick(calledObj) {
  deleteCardPopup.open(calledObj);
}

function handlePopupButtonClick(calledObj) {
  calledObj.handleDelete();
  api.deleteCard(calledObj.id).catch(catchFetchError);
  deleteCardPopup.close();
}

function handleLikeBtnClick(calledObj) {
  if (!calledObj.isLiked()) {
    api.likeCard(calledObj.id).catch(catchFetchError);
  } else {
    api.dislikeCard(calledObj.id).catch(catchFetchError);
  }
  calledObj.setLikeBtnState();
}
/*************
 * FUNCTIONS *
 *************/

function createNewCardEl(cardData) {
  //Creates new card Object and then returns its element
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteBtnClick,
    handleLikeBtnClick
  );
  return card.getView();
}

function fillProfileForm() {
  profilePopup.setInputValues(userInfo.getUserInfo());
}

function catchFetchError(err) {
  console.log(err);
}

/*******************
 * EVENT LISTENERS *
 *******************/
//Open Modals
profileEditBtn.addEventListener("click", () => {
  fillProfileForm();
  profileModalFormValidator.setButtonState();
  profileModalFormValidator.clearValidationErrors();
  profilePopup.open();
});
addCardBtn.addEventListener("click", () => {
  cardModalFormValidator.setButtonState();
  cardModalFormValidator.clearValidationErrors();
  addCardPopup.open();
});
profileAvatar.addEventListener("click", () => {
  avatarModalFormValidator.setButtonState();
  avatarModalFormValidator.clearValidationErrors();
  avatarModal.open();
});

/***********************
 * ENABLES TRANSITIONS *
 ***********************/
document.querySelector("body").classList.remove("no-transition");
