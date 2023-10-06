//

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Largo di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const validatorConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__item",
  submitButtonSelector: ".modal__button",
  errorMessageClass: "modal__error",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__item_type_error",
  errorMessageClassVisible: "modal__error_visible",
};

const formNames = {
  profileFormName: "profile-modal-form",
  addCardFormName: "card-add-modal-form",
  avatarFormName: "avatar-modal-form",
};

export { initialCards, validatorConfig, formNames };
