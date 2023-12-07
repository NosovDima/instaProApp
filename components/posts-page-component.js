import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent() {
  // TODO: реализовать рендер постов из api - almost done

  const appEl = document.getElementById("app");
  const allPosts = posts.map((post) => {
    return {
      userId: post.user.id,
      userImageUrl: post.user.imageUrl,
      userName: post.user.name,
      imageUrl: post.imageUrl,
      postId: post.id,
      isLiked: post.isLiked,
      usersLikes: post.likes,
      userDescription: post.user.description,
      // creatDate:
    };
  });

  const appHtml = allPosts
    .map((post, index) => {
      const userStorage = JSON.parse(window.localStorage.getItem("user"));
      const userStorageId = userStorage ? userStorage._id : null;

      return `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        <li class="post">
          <div class="post-header" data-user-id="${post.userId}">
              <img src="${post.userImageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.userName}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${
              post.postId
            }" data-index="${index}" class="like-button">
              <img src="${
                post.isLiked
                  ? "./assets/images/like-active.svg"
                  : "./assets/images/like-not-active.svg"
              }">
            </button>
            <p class="post-likes-text">
              Нравится: ${
                post.usersLikes.length > 0
                  ? `${post.usersLikes[post.usersLikes.length - 1].name} ${
                      post.usersLikes.length - 1 > 0
                        ? "и ещё " + (post.usersLikes.length - 1)
                        : ""
                    }`
                  : "0"
              }
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.userName}</span>
            ${post.userDescription}
          </p>
          <p class="post-date">
            ${post.creatDate} назад
          </p>
        </li>
      </ul>
    </div>`;
    })
    .join("");
  // console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  appEl.innerHTML = appHtml;

  // renderHeaderComponent({
  //   element: document.querySelector(".header-container"),
  // });

  // HERE!!!!!!!! COMMENT BACK

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  // subsidiary functions -->

}
