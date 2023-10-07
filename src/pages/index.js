//

//CSS
import "./index.css";

//Javascript

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validatorConfig, formNames } from "../utils/constants.js";
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
const formValidators = {};

//Grabs all form names
const { profileFormName, avatarFormName, addCardFormName } = formNames;

//Enables validation for each form
//Adds validators to formValidators object
//Enables validation for each form
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validatorConfig);

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
const avatarPopup = new PopupWithForm("#avatar-modal", handleAvatarModalSubmit);
const picturePopup = new PopupWithImage("#picture-modal");
const deleteCardPopup = new PopupConfirm(
  "#card-delete-modal",
  handlePopupButtonClick
);

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
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
//Default Popup Submit Function
function handleSubmit(request, popupInstance) {
  popupInstance.renderLoading(true);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(catchFetchError)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

//Adds specifics to the popup submit function based on the popup
//Profile Popup Submit Handler
function handleProfileEditSubmit(e, { name, description }) {
  e.preventDefault();
  function makeRequest() {
    return api.updateUser(name, description).then(() => {
      userInfo.setUserInfo(name, description);
    });
  }
  handleSubmit(makeRequest, profilePopup);
}
//Add Card Popup Submit Handler
function handleAddCardModalSubmit(e, cardData) {
  e.preventDefault();
  function makeRequest() {
    return api.createCard(cardData.name, cardData.link).then((result) => {
      cardData._id = result._id;
      cardSection.addItem(createNewCardEl(cardData));
    });
  }
  handleSubmit(makeRequest, addCardPopup);
}
//Avatar Popup Submit Handler
function handleAvatarModalSubmit(e, { link }) {
  e.preventDefault();
  function makeRequest() {
    return api.updateAvatar(link).then(() => {
      userInfo.setAvatar(link);
    });
  }
  handleSubmit(makeRequest, avatarPopup);
}

function handleCardClick(cardObject) {
  picturePopup.open(cardObject.link, cardObject.name);
}

function handleDeleteBtnClick(calledObj) {
  deleteCardPopup.open(calledObj);
}

function handlePopupButtonClick(calledObj) {
  api
    .deleteCard(calledObj.id)
    .then(() => {
      calledObj.handleDelete();
      deleteCardPopup.close();
    })
    .catch(catchFetchError);
}

function handleLikeBtnClick(calledObj) {
  if (!calledObj.isLiked()) {
    api
      .likeCard(calledObj.id)
      .then(() => {
        calledObj.setLikeBtnState();
      })
      .catch(catchFetchError);
  } else {
    api
      .dislikeCard(calledObj.id)
      .then(() => {
        calledObj.setLikeBtnState();
      })
      .catch(catchFetchError);
  }
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
  console.error(err);
}

/*******************
 * EVENT LISTENERS *
 *******************/
//Open Modals
profileEditBtn.addEventListener("click", () => {
  fillProfileForm();
  formValidators[profileFormName].setButtonState();
  formValidators[profileFormName].clearValidationErrors();
  profilePopup.open();
});
addCardBtn.addEventListener("click", () => {
  formValidators[addCardFormName].setButtonState();
  formValidators[addCardFormName].clearValidationErrors();
  addCardPopup.open();
});
profileAvatar.addEventListener("click", () => {
  formValidators[avatarFormName].setButtonState();
  formValidators[avatarFormName].clearValidationErrors();
  avatarPopup.open();
});

/***********************
 * ENABLES TRANSITIONS *
 ***********************/
document.querySelector("body").classList.remove("no-transition");
