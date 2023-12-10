import { user } from "../index.js";

import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  // TODO: Реализовать страницу добавления поста - Done
  let imageUrl = "";

  const appHtml = `
  <div class="page-container">
  <div class="header-container">
    <div class="page-header">
      <h1 class="logo">instapro</h1>
      <button class="header-button add-or-login-button"></button>
      <button title="${user.name}" class="header-button logout-button">Выйти</button>
    </div>
  </div>
  <div class="form">
    <h3 class="form-title">Добавить пост</h3>
    <div class="form-inputs">
      <div class="upload-image-container">
        <div class="upload-image">
          <label class="file-upload-label secondary-button">
            <input type="file" class="file-upload-input" style="display:none">
            Выберите фото
          </label>
        </div>
      </div>
      <label>
        Опишите фотографию
        <textarea class="input textarea" rows="4" id="description"></textarea>
      </label>
      <button class="button" id="add-button">Добавить</button>
    </div>
  </div>
</div>
  `;

  appEl.innerHTML = appHtml;

  renderUploadImageComponent({
    element: document.querySelector(".upload-image-container"),
    onImageUrlChange(newImageUrl) {
      imageUrl = newImageUrl;
    },
  });

  document.getElementById("add-button").addEventListener("click", () => {
    const description = document.getElementById("description").value;
    onAddPostClick({
      description: description,
      imageUrl: imageUrl,
    });
  });
}
